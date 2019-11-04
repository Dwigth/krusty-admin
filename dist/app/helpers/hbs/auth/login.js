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
exports.LoginHelperManager = [
    {
        name: 'login_error',
        function: function (error) {
            console.log(error);
            if (error != undefined) {
                if (error) {
                    return new hbs_1.default.handlebars.SafeString("<div class=\"alert alert-danger\" role=\"alert\" >Revisa tus credenciales </div>");
                }
            }
        }
    },
    {
        name: 'manage_credentials',
        function: function (user) {
            var script = "<script>\n                if(localStorage.getItem('user') === null){\n                    if(" + user + " != undefined){\n                        localStorage.setItem('user',JSON.stringify(" + user + "));\n                        setTimeout(function(){\n                            location.href = '/home';\n                        },1000);\n                    } \n                }else{\n                    location.href = '/home';\n                }\n                </script>";
            return new hbs_1.default.handlebars.SafeString(script);
        }
    }
];
