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
        name: 'show_userdata',
        function: function () {
            var script = "\n      <script>\n      if(localStorage.getItem('user') != null){\n        const avatar = document.getElementById('avatar');\n        const nombre = document.getElementById('nombre');\n        const nivel = document.getElementById('nivel');\n\n        const usuario = JSON.parse(localStorage.getItem('user'));\n        avatar.style.backgroundImage = 'url('+usuario.img+')';\n        nombre.textContent = usuario.nombre;\n        nivel.textContent = usuario.usuario;\n      }\n      </script>\n      ";
            return new hbs_1.default.handlebars.SafeString(script);
        }
    }
];
