/**
 * @requires modal.js 
 * @requires dt-custom-actions.js 
 * 
 * Funciones personalizada
 * VARIABLES GLOBALES
 */


/**
 * @todo Hacer la función para eliminar en backend
 * @param {*} tabla 
 * @param {*} index 
 */
function Delete(tabla, index) {
    console.log(tabla, index);
    const data = JSON.parse(document.getElementById(tabla + '-data').textContent)[index];
    let modal = new Modal();
    modal.Confirm('¿Estas seguro que deseas eliminar?').then(() => {
        fetch(`/matilde-catalogs/delete/${tabla}`, {
            method: 'POST',
            body: {}
        }).then((resp) => {
            console.log(resp)
        }).catch(console.log)
    }).catch((e) => {
        console.error(e);
    })
}

async function Update(tabla, index) {
    console.log('Actualizar', tabla, index);
    const data = JSON.parse(document.getElementById(tabla + '-data').textContent)[index];
    let Fields = Object.getOwnPropertyNames(data);
    //Obtener los datos
    const names = await fetch('/matilde-catalogs-names', { method: 'GET' }).then(resp => resp.json());
    //Hash-Table de datos
    let selectableFields = {
        "metodo": names.metodos,
        "principio": names.principios,
        "tienda": names.tiendas
    };
    let selectables = Object.getOwnPropertyNames(selectableFields);
    // Construcción del html
    // @todo Renderizar selects
    let html = '<form>';
    Fields.map(field => {

        html += `<div class="form-group">
                    <label class="form-label">${field}</label>
                    <input name="${field}" type="text" value="${data[field]}" class="form-control">
                </div>
                `;
    });
    html += '</form>'
    let options = {
        html: html
    };
    let modal = new Modal(options);
    modal.InsertHTML();
    modal.Open();

}

