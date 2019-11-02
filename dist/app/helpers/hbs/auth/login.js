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
];
