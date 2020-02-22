"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var hbs_1 = __importDefault(require("hbs"));
var lodash_1 = require("lodash");
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
    },
    {
        name: 'settings',
        function: function (admins) {
            admins.unshift({});
            var ChunkedAdmins = lodash_1.chunk(admins, 3);
            var finalHTML = '';
            ChunkedAdmins.forEach(function (cadmins, i) {
                finalHTML += '<div class="row row-cards row-deck">';
                cadmins.forEach(function (admin, j) {
                    if (j == 0 && i == 0) {
                        finalHTML += "\n            <div class=\"col-md-4\">\n                <div class=\"card create-user\">\n                    <a href=\"#\">\n                    <img class=\"card-img-top\"\n                            src=\"/admin-template/krusty-lab/images/add.png\"\n                            alt=\"Foto de perfil\"></a>\n                    <div class=\"card-body d-flex flex-column\">\n                        <h4>\n                            <a href=\"#\">Crear un nuevo usuario</a>\n                        </h4>\n                        <div class=\"ml-auto text-muted\"></div>\n\n                    </div>\n\n                </div>\n            </div>";
                    }
                    else {
                        admin.img = (admin.img == '') ? '/images/avatar.png' : admin.img;
                        finalHTML += "\n            <div class=\"col-md-4\">\n                <div class=\"card\">\n                    <a href=\"#\"><img class=\"card-img-top\"\n                            src=\"" + admin.img + "\"\n                            alt=\"Foto de perfil\"></a>\n                    <div class=\"card-body d-flex flex-column\">\n                        <h4>\n                            <a href=\"#\">" + admin.nombre + "</a>\n                        </h4>\n\n                        <div class=\"ml-auto text-muted\">";
                        if (admin.usuario == 'super_administrador') {
                            finalHTML += "<div class=\"tag tag-danger\">\n                                          S. Administrador\n                                          <span class=\"tag-addon\"><i class=\"fe fe-user\"></i></span>\n                                      </div>";
                        }
                        finalHTML += "<a href=\"#\" data-idadmin=\"" + admin.id_admin + "\" class=\"disable-user-btn icon d-none d-md-inline-block ml-3\"><i\n                                    class=\"fe fe-trash mr-1\"></i></a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            ";
                    }
                });
                finalHTML += '</div>';
            });
            return new hbs_1.default.handlebars.SafeString(finalHTML);
        }
    }
];
