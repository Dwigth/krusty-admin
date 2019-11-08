/**
 * Este script se encargará de inicializar las DataTables
 * @see https://datatables.net/examples/ajax/null_data_source.html
 * @see https://stackoverflow.com/questions/25377637/datatables-cannot-read-property-mdata-of-undefined
 * @see https://stackoverflow.com/questions/27778389/how-to-manually-update-datatables-table-with-new-json-data
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
            // Tablas
            const dt = instances[i];
            // Datos escondidos en un elemento HTML
            const data = JSON.parse(document.getElementById(`${dt.id}-data`).textContent);
            // Titulos de las tablas
            const titles = Object.getOwnPropertyNames(data[0]);
            // Arreglo de columnas
            const columns = [];
            // Se agregan los titulos a las columnas
            titles.map(title => {
                columns.push({ data: title });
            })
            // Agregamos un ultimo elemento donde estarán nuestras opciones
            // Esto para evitar conflictos con DataTable
            columns.push({ data: '' });

            // Instancia DataTable con opciones personalizables
            var table = $('#' + dt.id).DataTable({
                columns: columns,
                columnDefs: [{
                    "targets": -1,
                    "data": null,
                    "defaultContent": `<div class="dropdown">
                                        <button class="btn btn-secondary btn-sm dropdown-toggle" data-toggle="dropdown">Acciones</button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" onclick="Update('${dt.id}',this)">Editar</a>
                                        <a class="dropdown-item" onclick="Delete('${dt.id}',this)">Eliminar</a>
                                    </div>
                                    </div>`
                }]
            });

        }
    });