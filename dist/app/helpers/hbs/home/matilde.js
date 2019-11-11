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
    },
    {
        name: 'matilde-codes',
        function: function (options) {
            var y = 49.13; // 1.3cm
            var x = 170.07; // 4.5cm
            var spacebtw = 20;
            var image = '/images/matilde/label.png';
            var html = "\n    <html>\n        <head>\n        <style>\n         @media print {\n      * {\n        color: rgba(0, 0, 0, 0);\n        text-shadow: 0 0 0 #ccc;\n      }\n\n      @media print and (-webkit-min-device-pixel-ratio:0) {\n        * {\n          color: #ccc;\n          -webkit-print-color-adjust: exact;\n        }\n      }\n   }\n        </style>\n        </head>\n        <body>\n            <div style=\"width:100%;display: flex;flex-direction: row;flex-wrap: wrap;\">\n        ";
            // Aqui obtendremos el target a mostrar
            options.keys.llaves.map(function (key, i) {
                var keyElement = "\n        <div style=\"position:relative;width:25%;\">\n        <img style=\"width:" + x + "px;height:" + y + "px;margin-right:" + spacebtw + "px;margin-bottom:3.5px\" src=\"" + image + "\" />\n        <small style=\"color:white;font-size:1rem;position:absolute;left:70px;bottom:20px;\">" + key + "</small>\n        </div>";
                html += keyElement;
            });
            html += "</div>\n        </body>\n    </html";
            return new hbs_1.default.handlebars.SafeString(html);
        }
    }
];
