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
exports.GeneralHelperManager = [
    /**
     * =============================================
     *
     * Este helper genera multiples TR para llenar una
     * tabla de llaves
     *
     * =============================================
     */
    {
        name: 'display_keys',
        function: function (keys) {
            var result = '';
            var length = keys.length;
            for (var i = 0; i < length; i++) {
                var K = keys[i];
                result += "\n                <tr>\n                    <th>\n                      <label class=\"custom-control custom-checkbox\">\n                        <input type=\"checkbox\" class=\"custom-control-input\" name=\"\" value=\"\">\n                        <div class=\"custom-control-label\"></div>\n                      </label>\n                    </th>\n                    <td>" + K.nombre + "</td>\n                    <td class=\"d-none d-sm-table-cell\">" + K.fecha + "</td>\n                    <td class=\"d-none d-md-table-cell\">" + K.cantidad + "</td>\n                    <td class=\"d-none d-md-table-cell\">\n                    <button class=\"btn btn-secondary hide\"> Mostrar </button>\n                    </td>\n                  </tr>\n                  ";
            }
            return new hbs_1.default.handlebars.SafeString(result);
        }
    },
    {
        name: 'show_userdata',
        function: function () {
            var script = "\n      <script>\n      if(localStorage.getItem('user') != null){\n        const avatar = document.getElementById('avatar');\n        const nombre = document.getElementById('nombre');\n        const nivel = document.getElementById('nivel');\n\n        const usuario = JSON.parse(localStorage.getItem('user'));\n        avatar.style.backgroundImage = 'url('+usuario.img+')';\n        nombre.textContent = usuario.nombre;\n        nivel.textContent = usuario.usuario;\n      }\n      </script>\n      ";
            return new hbs_1.default.handlebars.SafeString(script);
        }
    }
];
