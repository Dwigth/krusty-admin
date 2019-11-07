/**
 * Este script se encargará de manejar todos los eventos CRUD de las
 * DataTables.
 * Cada una de las datatable tienen checkboxes que obtendran la posición
 * de los elementos seleccionados.
 */

require(
    [
        './admin-template/assets/plugins/datatables/datatables.min.js',
        'jquery'
    ],
    function (datatable, $) {
        //Obtener las tablas 
        var instances = document.getElementsByClassName('datatable');
        var length = instances.length;

        for (let i = 0; i < length; i++) {
            const dt = instances[i];

            // Instancia DataTable
            var table = $('#' + dt.id).DataTable();
            // ID del elemento donde estará guardado los datos JSON en un STRING
            var JSONData = JSON.parse(document.getElementById(dt.id + '-data').textContent);
            // Opciones globales para la creación del modal
            var options = {
                id: dt.id,
                html: CreateForm(JSONData),
                data: JSONData
            }

            //Boton de creación
            var createBtn = document.getElementsByClassName('card-dt')[i].getElementsByClassName('create')[0];
            createBtn.addEventListener('click', (function (optionsCopy) {
                return function () {
                    var modal = new Modal(optionsCopy);
                    modal.InsertHTML();
                    modal.Open();
                }
            })(options));
        }

        /**
         * Devuelve un string que contiene un form con inputs de tipo texto 
         * por default
         * @returns string
         * @param {Array<{}>} data
         * @param {Function} action 
         */
        function CreateForm(data) {
            const objTitles = Object.getOwnPropertyNames(data[0]);
            let form = '<form>';
            for (let i = 0; i < objTitles.length; i++) {
                const title = objTitles[i];
                form += `
                <div class="form-group">
                    <label class="form-label">${title}</label>
                    <input name="${title}" type="text" class="form-control">
                </div>
                `;
            }
            form += '</form>';
            return form;
        }
    });