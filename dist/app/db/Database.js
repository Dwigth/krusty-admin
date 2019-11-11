"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        try {
            this.Pool = mysql_1.default.createPool(enviroment_1.environments.database);
        }
        catch (e) {
            console.error(colors_1.default.red(e));
        }
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
    /**
     * ====================================================
     *
     * Ejecuta una consulta y retorna una promesa del tipo
     * especificado.
     *
     * ====================================================
     * @param query
     */
    Database.prototype.Query = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.Pool.query(query, function (error, results, fields) {
                            if (error)
                                reject(error);
                            resolve(results);
                            // console.log('The solution is: ', results[0]);
                        });
                    })];
            });
        });
    };
    Database.prototype.Queryable = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var queryPromise, queryResult, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryPromise = new Promise(function (resolve, reject) {
                            var queryResult = _this.Pool.query(query, function (error, results, fields) {
                                if (error)
                                    reject(error);
                                console.log(fields);
                                resolve({ results: results, fields: fields });
                                // console.log('The solution is: ', results[0]);
                            });
                        });
                        return [4 /*yield*/, queryPromise];
                    case 1:
                        queryResult = _a.sent();
                        result = {
                            DataValues: queryResult.results,
                            QueryValues: queryResult.fields
                        };
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Database.instance = null;
    return Database;
}());
exports.Database = Database;
