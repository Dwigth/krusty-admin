/**
 * @requires modal.js
 */
class Settings {
    constructor() {
        this.Tabs = Array.from(document.getElementsByClassName('list-group-item'));
        this.HashTabs = {};
        this.Tabs.map(tab => {
            this.HashTabs[tab.id] = { active: tab.classList.contains('active') };
            this.HashTabs[tab.id]["content"] = `${tab.dataset.ref}-content`;
        });
        this.SelectTab();
        this.DisableUser();
        this.CreateUser();
    }

    /**
     * Tabs que cambian el contenido del cuerpo de la carta
     */
    SelectTab() {
        this.Tabs.forEach(tab => {
            // Limpiar a todas las tabs 
            tab.classList.remove('active');
            document.getElementById(this.HashTabs[tab.id].content).style.display = 'none';
            tab.addEventListener('click', (evt) => {
                if (this.HashTabs[tab.id].active == false) {
                    tab.classList.add('active');
                    document.getElementById(this.HashTabs[tab.id].content).style.display = 'block';
                    this.HashTabs[tab.id].active = true;
                    this.Tabs.forEach(temp => {
                        if (temp.id !== tab.id) {
                            this.HashTabs[temp.id].active = false;
                            temp.classList.remove('active');
                            document.getElementById(this.HashTabs[temp.id].content).style.display = 'none';
                        }
                    })
                }
            });
        });
        this.Tabs[0].classList.add('active');
        document.getElementById(this.HashTabs[this.Tabs[0].id].content).style.display = 'block';
    }

    /**
     * 
     */
    DisableUser() {
        const usersBtns = Array.from(document.getElementsByClassName('disable-user-btn'));
        if (usersBtns.length == 0) {
            console.warn('No hay administradores o no tienes permiso para ver este módulo.');
            return;
        }
        usersBtns.forEach(btn => {
            btn.addEventListener('click', (evt) => {
                const id = btn.dataset.idadmin;
                const modal = new Modal({ html: '' })
                // modal.InsertHTML();
                modal.Confirm({
                    message: '¿Estás seguro que deseas eliminar a este usuario?',
                    callback: async () => {
                        await HTTP({
                            url: '/disable-user',
                            token: profile.profile.token,
                            data: { id_admin: id },
                            method: 'POST',
                            success: async (data) => {
                                const resp = await data.json();
                                const modal = new Modal({ html: resp.msg });
                                modal.InsertHTML();
                                modal.Open();
                                setTimeout(() => {
                                    location.reload();
                                }, 1000);
                            },
                            failed: async (data) => {
                                const resp = await data.json();
                                console.error(resp);
                            }
                        });
                    }
                });

            })
        })
    }

    CreateUser() {
        const CreateBtn = document.getElementsByClassName('create-user')[0];
        CreateBtn.addEventListener('click', () => {

            const FormHTML = `
            <form method="POST" action="/admins/create" class="form-group" id="create-user-form">
                <input class="form-control mb-3" type="text" name="nombre" placeholder="Nombre">
                <input class="form-control mb-3" type="email" name="email" placeholder="Correo electrónico">
                <select class="form-control mb-3" name="usuario">
                    <option value="administrador">Administrador</option>
                    <option value="administrador">Super Administrador</option>
                </select>
                <button type="submit" class="btn btn-primary btn-block">Crear</button>
            </form>
            `;
            const modal = new Modal({ html: FormHTML });
            modal.InsertHTML();
            modal.Open();
        });
    }
}

const settings = new Settings();