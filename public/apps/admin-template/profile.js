/**
 * @requires session.js
 * @requires modal.js
 */
class Profile {
    constructor() {
        const session = new Session();
        this.profile = session.Get();
        this.canvas;
        this.HandleDropdown();
        if (location.pathname.includes('/profile')) {
            this.Update();
            this.canvas = document.createElement('canvas');
            this.UploadImage();
        }
    }
    /**
     * Esta función depende de la estructura del dropdown del usuario
     */
    HandleDropdown() {
        const dropdown = document.getElementById('user-dropdown');
        // Obtenemos el primer elemento de la lista de dropdown
        const profileAnchor = dropdown.firstChild.nextSibling;
        profileAnchor.href = `/profile/${this.profile.token}/${this.profile.usuario}`;

        // El planificador está en el hijo #4 -> índice 3
        const plannerAnchor = dropdown.children.item(3);
        plannerAnchor.href = `/planner/${this.profile.id_admin}`;
    }
    /**
     * Actualiza la información del usuario.
     */
    Update() {
        const updateBtn = document.getElementById('updateBtn');
        const Updateform = document.getElementById('updateForm');

        updateBtn.addEventListener('click', async (evt) => {

            evt.preventDefault();

            // Obtener inputs, textareas, etc.
            const inputs = Array.from(Updateform.getElementsByTagName('input'));
            const txta = Array.from(Updateform.getElementsByTagName('textarea'));

            const inputable = [].concat(inputs, txta)

            const data = {};

            inputable.map(value => data[value.name] = value.value);
            const profileModal = new Modal();

            await profileModal.Confirm({
                message: '¿Estás seguro que deseas actualizar tu información?',
                callback: async () => {
                    fetch('/profile/update', {
                        headers: {
                            'Content-Type': 'application/json',
                            'token': this.profile.token
                        },
                        body: JSON.stringify(data),
                        method: 'PUT'
                    }).then(async response => {
                        this.profile.img = data.img;
                        this.profile.email = data.email;
                        this.profile.nombre = data.usuario;
                        session.Update(this.profile);
                        setTimeout(async () => {
                            const msg = await response.json();
                            const modalAlert = new Modal({ html: `<span>${msg.msg}</span>` });
                            modalAlert.InsertHTML();
                            modalAlert.Open();
                        }, 1000);
                    }).catch(e => console.error);
                }
            });
        });

    }

    /**
     * Proceso para obtener imagen desde el navegador del cliente,
     * subirla al backend y retornar la dirección de la imagen.
     */
    UploadImage() {
        // Obtenemos los datos con Base64
        const profile64 = this.GetBase64('profile-img', 'updated_img');
        const cover64 = this.GetBase64('cover-img', 'update_portada_img');
        // Preparamos los datos para subir al backend

        // Obtenermos una respuesta y la retornamos
    }
    /**
     * 
     * @returns Imagen en Base64
     * @param ID de elemento InputFile
     * @param ID de elemento target
     */
    GetBase64(id, target) {
        const inputFile = document.getElementById(id);
        inputFile.addEventListener('change', async (evt) => {
            document.getElementById(target).value = await this.HandleFileSelect(evt);
        }, false);
    }
    /**
     * 
     * @param {*} canvas 
     * @param {*} image 
     */
    RedrawImg(canvas, image) {
        // Get Canvas2DContext
        var ctx = canvas.getContext("2d");
        // Your code here
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
    /**
     * 
     * @param {*} evt 
     */
    async HandleFileSelect(evt) {
        // var canvasWidth = 200;
        // var canvasHeight = 200;

        // const canvas = document.querySelector('canvas');
        // this.canvas.width = canvasWidth; this.canvas.height = canvasHeight;

        var file = evt.target.files[0];

        var reader = new FileReader();

        const GetBase64 = new Promise((resolve, reject) => {
            reader.addEventListener('load', function (fileObject) {
                var data = fileObject.target.result;

                // Create an image object
                var image = new Image();
                image.onload = function () {
                    window.imageSrc = this;
                    // profile.RedrawImg(profile.canvas, this);
                }
                // Set image data to background image.
                resolve(data);
                image.src = data;
                // console.log(fileObject.target.result);
            });
        });

        reader.readAsDataURL(file)
        return await GetBase64;
        // const modal = new Modal();
        // modal.Append(this.canvas);
        // modal.Open();
    }
}
const profile = new Profile();
