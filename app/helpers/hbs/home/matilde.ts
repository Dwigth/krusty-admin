import { IHelperModel } from "../../../interfaces/helpers/helper";
import hbs from 'hbs';

/**
 * =======================================================
 * 
 * - Arreglo de objetos que contienen helpers personalizados
 *   por modulo (carpeta).
 * - Variables globales
 * 
 * =======================================================
 */

export const MatildeHelperManager: IHelperModel[] = [
    /**
     * ==================================================
     * 
     * Este helper genera multiples <tr> para llenar una
     * tabla de llaves
     * 
     * ==================================================
     */
    {
        name: 'DataTableMaker',
        function: <T>(data: T[]) => {

            const actions = [{ name: 'Crear', id: '' }, { name: 'Actualizar', id: '' }, { name: 'Borrar', id: '' }];
            const objTitles = Object.getOwnPropertyNames(data[0]);

            let container = '<div class="card"><div class="table-responsive">';

            let buttonContainer = '<div>';

            actions.forEach(action => {
                buttonContainer += `<button class="btn btn-primary p-2 m-2">${action.name}</button>`;
            });
            buttonContainer += '</div>';

            container += buttonContainer;

            // Inicio de la tabla
            let table = '<table class="table card-table table-vcenter text-nowrap datatable dataTable no-footer clients-datatable">';
            let thead = `<thead>`;
            // Obtención de los títulos
            // Se agrega un espacio para el checkbox
            thead += '<th></th>';
            objTitles.forEach(title => {
                thead += `<th>${title}</th>`;
            });

            thead += '</thead>';
            // Inicio del body
            let tbody = '<tbody>';

            // Contenido del tbody
            let tr = '';
            for (let i = 0; i < data.length; i++) {
                // Implementación de un "Index Signature"
                // @todo saber porque
                const row = <{ [index: string]: any }>data[i];
                tr += '<tr>';
                // Se agrega checkbox para obtener el estado de la fila
                tr += `<td><input id="${i}" class="checkbox" type="checkbox"></td>`;
                for (let j = 0; j < objTitles.length; j++) {
                    const property = objTitles[j];
                    tr += `<td>${row[property]}</td>`;
                }
                tr += '</tr>';
            }
            tbody += tr;
            tbody += '</tbody>';

            // Se agrega a la tabla
            table += thead;
            table += tbody;
            table += '</table>';

            const script = `
            <script>
            require(['./admin-template/assets/plugins/datatables/datatables.min.js', 'jquery'], 
            function(datatable, $) {                
                var table = $('.datatable').DataTable();
                });
            </script>
            `;
            table += script;
            container += table;
            container += '</div></div>';
            return new hbs.handlebars.SafeString(container);
        }
    }
];