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
        elem.href = '/admin-template/assets/css/custom/modal.css';
    } else if (options.type == 'script') {
        elem.src = options.url;
    }
    head.appendChild(elem);
}