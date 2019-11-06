/**
 * @requires modal.js 
 * @requires dt-custom-actions.js 
 * 
 * Funciones personalizada
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

function Update(tabla, index) {
    console.log('Actualizar', tabla, index);
    const data = JSON.parse(document.getElementById(tabla + '-data').textContent)[index];
    let modal = new Modal();
    modal.Open();
}

