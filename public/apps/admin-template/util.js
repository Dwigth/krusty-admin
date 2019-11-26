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