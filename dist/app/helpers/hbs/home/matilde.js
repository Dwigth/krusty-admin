"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var hbs_1 = __importDefault(require("hbs"));
/**
 * =======================================================
 *
 * Arreglo de objetos que contienen helpers personalizados
 * por modulo (carpeta).
 *
 * =======================================================
 */
exports.MatildeHelperManager = [
    /**
     * =============================================
     *
     * Este helper genera multiples TR para llenar una
     * tabla de llaves
     *
     * =============================================
     */
    {
        name: 'MatildeClientsDT',
        function: function (clients) {
            var container = '<div class="card"><div class="table-responsive">';
            var table = '<table class="table card-table table-vcenter text-nowrap datatable dataTable no-footer clients-datatable">';
            var thead = "\n            <thead>\n                <th>ID_CLIENTE</th>\n                <th>Nombre</th>\n                <th>Apellidos</th>\n                <th>correo</th>\n                <th>key</th>\n                <th>Licencia</th>\n                <th>createdAt</th>\n            </thead>\n            ";
            var tbody = '<tbody>';
            var td = '';
            for (var i = 0; i < clients.length; i++) {
                var client = clients[i];
                td += "\n                <tr>\n                    <td>" + client.ID_USUARIO + "</td>\n                    <td>" + client.nombre + "</td>\n                    <td>" + client.apellidos + "</td>\n                    <td>" + client.correo + "</td>\n                    <td>" + client.key + "</td>\n                    <td>" + client.ID_LICENCIA + "</td>\n                    <td>" + client.createdAt + "</td>\n                </tr>\n                ";
            }
            tbody += td;
            tbody += '</tbody>';
            table += thead;
            table += tbody;
            table += '</table>';
            var script = "\n            <script>\n            require(['./admin-template/assets/plugins/datatables/datatables.min.js', 'jquery'], \n            function(datatable, $) {\n                $('.clients-datatable').DataTable();\n                });\n            </script>\n            ";
            table += script;
            container += table;
            container += '</div></div>';
            return new hbs_1.default.handlebars.SafeString(container);
        }
    }
];
