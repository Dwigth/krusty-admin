"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var enviroment_1 = require("../../environments/enviroment");
var colors_1 = __importDefault(require("colors"));
/**
 * ==============================================
 *
 * ### Clase que se encargará de las conexiones a
 * base de datos y operaciones relacionadas
 *
 * ==============================================
 *
 */
var Database = /** @class */ (function () {
    /**
     * =====================================================
     *
     * Obtenemos la configuración de ambientes para crear un
     * pool de conexiones
     *
     * =====================================================
     */
    function Database() {
        this.Pool = mysql_1.default.createPool(enviroment_1.environments.database);
        if (enviroment_1.environments.logging) {
            console.log(colors_1.default.yellow('Conectado a: '), colors_1.default.rainbow(enviroment_1.environments.database.host));
        }
    }
    Object.defineProperty(Database, "Instance", {
        /**
         * ====================================================
         *
         * Patrón SINGLETON para obtener la unica instancia de
         * la clase
         * @todo Mejorar la función
         *
         * ====================================================
         */
        get: function () {
            if (this.instance == null) {
                this.instance = new this;
            }
            return this.instance;
        },
        enumerable: true,
        configurable: true
    });
    Database.instance = null;
    return Database;
}());
exports.Database = Database;
