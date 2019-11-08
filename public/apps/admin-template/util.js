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