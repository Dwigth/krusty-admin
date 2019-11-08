"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var hbs_1 = __importDefault(require("hbs"));
/**
 * =======================================================
 *
 * - Arreglo de objetos que contienen helpers personalizados
 *   por modulo (carpeta).
 * - Variables globales
 *
 * =======================================================
 */
exports.MatildeHelperManager = [
    /**
     * ==================================================
     *
     * Este helper genera tablas interactivas con el plugin DataTable.
     * Cada tabla se genera con 1 boton de agregar con una función Create(id) que toma como
     * parametro el id de la tabla, tambien un dropdown de acciones con opciones de editar y
     * eliminar, al igual que el boton agregar tienen un función asociada que toma como parametro
     * el id de la tabla y su posición en la tabla.
     * Esto está hecho de esta manera para que con un script personalizado puedas desarrollar la logica de
     * cada una de esas funciones dandote como referencia el id de la tabla y la posición en el arreglo de
     * datos.
     * @requires modal.js
     * @requires dt-custom-actions.js
     *
     * @return string
     * ==================================================
     */
    {
        name: 'DataTableMaker',
        function: function (data, id) {
            var objTitles = Object.getOwnPropertyNames(data[0]);
            var container = '<div class="card card-dt"><div class="table-responsive" >';
            var buttonContainer = "<div> <button onclick=\"Create('" + id + "')\" class=\"btn btn-secondary btn-sm p-2 m-2 create\">Agregar</button> </div>";
            //Aqui ira el JSON data escondido
            var JSONDataContainer = "<span id=\"" + id + "-data\" style=\"display:none\">" + JSON.stringify(data) + "</span>";
            container += buttonContainer;
            container += JSONDataContainer;
            // Inicio de la tabla
            var table = "<table id=\"" + id + "\" class=\"table card-table table-vcenter text-nowrap datatable dataTable no-footer clients-datatable\">";
            var thead = "<thead>";
            // Obtención de los títulos
            // Se agrega un espacio para el checkbox
            objTitles.forEach(function (title) {
                thead += "<th>" + title + "</th>";
            });
            thead += '<th></th>';
            thead += '</thead>';
            // Inicio del body
            var tbody = '<tbody>';
            // Contenido del tbody
            var tr = '';
            for (var i = 0; i < data.length; i++) {
                // Implementación de un "Index Signature"
                // @todo saber porque
                var row = data[i];
                tr += '<tr>';
                // Se agrega checkbox para obtener el estado de la fila
                // tr += `<td><input id="${i}" onclick="checkbox(this)" class="checkbox" type="checkbox"></td>`;
                for (var j = 0; j < objTitles.length; j++) {
                    var property = objTitles[j];
                    tr += "<td>" + row[property] + "</td>";
                }
                tr += "\n                <td class=\"text-right\">\n                <div class=\"dropdown\">\n                  <button class=\"btn btn-secondary btn-sm dropdown-toggle\" data-toggle=\"dropdown\">Acciones</button>\n                  <div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\">\n                    <a class=\"dropdown-item\" onclick=\"Update('" + id + "'," + i + ")\">Editar</a>\n                    <a class=\"dropdown-item\" onclick=\"Delete('" + id + "'," + i + ")\">Eliminar</a>\n                </div>\n                </div>\n              </td>";
                tr += '</tr>';
            }
            tbody += tr;
            tbody += '</tbody>';
            // Se agrega a la tabla
            table += thead;
            table += tbody;
            table += '</table>';
            container += table;
            container += '</div></div>';
            return new hbs_1.default.handlebars.SafeString(container);
        }
    }
];
