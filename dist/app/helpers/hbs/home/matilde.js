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
     * Este helper genera multiples <tr> para llenar una
     * tabla de llaves
     *
     * ==================================================
     */
    {
        name: 'DataTableMaker',
        function: function (data) {
            var actions = [{ name: 'Crear', id: '' }, { name: 'Actualizar', id: '' }, { name: 'Borrar', id: '' }];
            var objTitles = Object.getOwnPropertyNames(data[0]);
            var container = '<div class="card"><div class="table-responsive">';
            var buttonContainer = '<div>';
            actions.forEach(function (action) {
                buttonContainer += "<button class=\"btn btn-primary p-2 m-2\">" + action.name + "</button>";
            });
            buttonContainer += '</div>';
            container += buttonContainer;
            // Inicio de la tabla
            var table = '<table class="table card-table table-vcenter text-nowrap datatable dataTable no-footer clients-datatable">';
            var thead = "<thead>";
            // Obtención de los títulos
            // Se agrega un espacio para el checkbox
            thead += '<th></th>';
            objTitles.forEach(function (title) {
                thead += "<th>" + title + "</th>";
            });
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
                tr += "<td><input id=\"" + i + "\" class=\"checkbox\" type=\"checkbox\"></td>";
                for (var j = 0; j < objTitles.length; j++) {
                    var property = objTitles[j];
                    tr += "<td>" + row[property] + "</td>";
                }
                tr += '</tr>';
            }
            tbody += tr;
            tbody += '</tbody>';
            // Se agrega a la tabla
            table += thead;
            table += tbody;
            table += '</table>';
            var script = "\n            <script>\n            require(['./admin-template/assets/plugins/datatables/datatables.min.js', 'jquery'], \n            function(datatable, $) {                \n                var table = $('.datatable').DataTable();\n                });\n            </script>\n            ";
            table += script;
            container += table;
            container += '</div></div>';
            return new hbs_1.default.handlebars.SafeString(container);
        }
    }
];
