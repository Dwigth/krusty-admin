/**
 * Este archivo tendrá funciones multiusos
 */

/**
 * 
 * @param {*} form element
 */
function GetHTMLFormData(form) {
    let inputs = form.getElementsByTagName('input');
    let select = form.getElementsByTagName('select');
    inputs = Array.from(inputs);
    select = Array.from(select);
    let formElements = [].concat(inputs, select);
    let data = {};
    formElements.map((inputData) => {
        data[inputData.name] = inputData.value;
    });
    return data;
}

/**
 * 
 * @param {*} options { type:'link' | 'script', url: '' }
 */
function AppendToHEAD(options) {
    var head = document.getElementsByTagName('HEAD')[0];
    var elem = document.createElement(options.type);
    if (options.type == 'link') {
        elem.rel = 'stylesheet';
        elem.type = 'text/css';
        elem.href = options.url;
    } else if (options.type == 'script') {
        elem.src = options.url;
    }
    head.appendChild(elem);
    return elem;
}

/**
 * 
 * @param {*} options 
 *              -url: string
 *              -token: string
 *              -data: object
 *              -method: string
 *              -success: function
 *              -failed: function
 * 
 */
async function HTTP(options) {
    await fetch(`${location.protocol}//${location.host}${options.url}`, {
        headers: {
            'Content-Type': 'application/json',
            'token': options.token
        },
        body: JSON.stringify(options.data),
        method: options.method
    }).then(options.success).catch(options.failed);
}

function Capitalize(texto) {
    let palabras = texto.split(' ');
    palabras.forEach((palabra, i) => {
        palabras[i] = palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
    });
    return palabras.join(' ');
}

/**
 * 
 * @param {*} admin Objeto de tipo <id_admin,img,nombre> 
 * @param {Function} Callback
 */
function CreateAvatarTag(admin, Callback, option) {
    const AvatarTag = document.createElement('span');
    const Avatar = document.createElement('span');

    AvatarTag.classList.add('tag', 'm-2');

    Avatar.classList.add('tag-avatar', 'avatar');
    Avatar.style.backgroundImage = `url(${admin.img})`;
    AvatarTag.appendChild(Avatar);
    AvatarTag.dataset.content = admin.nombre;
    AvatarTag.dataset.idadmin = admin.id_admin;
    if (option.idust) {
        AvatarTag.dataset.idust = option.idust;
    }

    AvatarTag.addEventListener('click', (evt) => {
        AvatarTag.style.display = 'none';
        Callback(AvatarTag);
    });

    return AvatarTag;
}