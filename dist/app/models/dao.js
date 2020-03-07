"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var colors_1 = __importDefault(require("colors"));
var server_1 = require("../server/server");
var querymodeler_1 = require("../classes/querymodeler");
var DAO = /** @class */ (function (_super) {
    __extends(DAO, _super);
    function DAO() {
        var _this = _super.call(this) || this;
        _this.DB = server_1.APPDB;
        return _this;
    }
    /**
     * @description Este metodo va agregando datos en forma de: `('','',...)`.
     *
     * Por cada uno de los elementos de un arreglo,
     * para así generar una sola consulta atomica.
     * @param data Arreglo de datos a insertar
     */
    DAO.prototype.BatchInsert = function (data) {
        // Obtenemos los valores que se van a insertar
        var keys = Object.keys(data[0]);
        // Curamos estos datos como string y les agregamos una coma a cada una
        var keysString = Object.keys(data[0]).join(',');
        // Creamos la consulta
        var sql = "INSERT INTO " + this.tablename + " ( " + keysString + " ) VALUES ";
        // Generamos los datos que se van a insertar
        var inserts = data.map(function (d) { return keys.map(function (k) { return d[k]; }); });
        // Curamos los datos para que puedan ser string
        var insertsStr = inserts.map(function (i) {
            var data = i.map(function (l) {
                if (l == '') {
                    return "''";
                }
                return (isNaN(+l) ? "'" + l + "'" : l);
            }).join(',');
            return "(" + data + ")";
        });
        // Se agregan los inserts a la consulta.
        sql += "" + insertsStr;
        // console.log(colors.green(sql));
        this.DB.Query(sql).then(console.log).catch(console.log);
    };
    /**
     * Genera una consulta de inserción para un dato dado.
     * @returns Promise
     * @param data Dato a insertar
     */
    DAO.prototype.Insert = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var keys, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keys = Object.keys(data);
                        sql = "INSERT INTO " + this.tablename + " (" + keys + ") VALUES (" + this.SanitizeData(data, 'insert') + ")";
                        console.log(sql);
                        return [4 /*yield*/, this.DB.Query(sql)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     *
     * @param data Objeto a actualizar
     * @param where Sentencia WHERE ej. "WHERE id = 2" { property:'id',value:2 }
     */
    DAO.prototype.Update = function (data, where) {
        return __awaiter(this, void 0, void 0, function () {
            var sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (where == undefined) {
                            console.error(colors_1.default.red('Se requiere la sentencia WHERE para seguir'));
                            return [2 /*return*/];
                        }
                        sql = "UPDATE " + this.tablename + " SET " + this.SanitizeData(data, 'update') + "  " + where + ";";
                        return [4 /*yield*/, this.DB.Query(sql)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * El batch update es un metodo especial y especifico para crear una consulta por cada uno de los elementos agregados
     * es posible especificar una sentencia global WHERE o una por cada uno de los elementos.
     * @param data Objetos a actualizar
     * @param where Objeto con dos propiedades: `global` boolean que nos permite saber si el primer elemento del arreglo de valores where
     * se aplicará para todas las consultas. `Values` arreglo de valores sentencias where.
     */
    DAO.prototype.BatchUpdate = function (data, where) {
        return __awaiter(this, void 0, void 0, function () {
            var sql;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = '';
                        data.map(function (d, i) {
                            var sentence;
                            if (where === null || where === void 0 ? void 0 : where.global) {
                                sentence = where === null || where === void 0 ? void 0 : where.values[0];
                            }
                            else {
                                sentence = where === null || where === void 0 ? void 0 : where.values[i];
                            }
                            sql += "UPDATE " + _this.tablename + " SET " + _this.SanitizeData(d, 'update') + " " + sentence + ";";
                        });
                        return [4 /*yield*/, this.DB.Query(sql)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, sql];
                }
            });
        });
    };
    /**
     * @todo No funciona
     */
    DAO.prototype.Delete = function () {
    };
    /**
     * Obtiene un elemento de la tabla asignada al controlador
     */
    DAO.prototype.Get = function (options) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var keysString, sql;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        keysString = ((options === null || options === void 0 ? void 0 : options.where.Properties) != undefined) ? (_a = options === null || options === void 0 ? void 0 : options.where.Properties) === null || _a === void 0 ? void 0 : _a.join(',') : '*';
                        sql = "SELECT " + keysString + " FROM " + this.tablename + " ";
                        if (options) {
                            sql += this.Whereify(options.where);
                        }
                        sql += ' LIMIT 1';
                        console.log(sql);
                        return [4 /*yield*/, this.DB.Query(sql).then(function (r) { return r[0]; })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    /**
     * @description Retorna un arreglo de datos (rows), la consulta básica es SELECT * FROM foo
     * > El objeto `options` tiene como responsabilidad manejar dos especificaciones del usuario.
     *  Dentro de options existe la propiedad `keys` que son las propiedades que se quieran mostrar.
     *  Tambien existe la propiedad `append` que sirve para agregar una o más sentencias SQL al final de
     *  la consulta SQL por defecto.
     * @example
     * options {
     *   keys:Array<string>  // Arreglo de propiedades a agregar,
     *   append:Array<string>// Arreglo de sentencias SQL a agregar al final de la consulta principal
     * }
     * =========================
     * Ejemplo:
     * options {
     *  keys:['nombre','apellidos'],
     *  append:['WHERE id_usuario_tipo = 2', 'ORDER BY fecha_nacimiento DESC']
     * }
     *
     * options {
     *  append:['WHERE id_usuario_tipo = 3']
     * }
     */
    DAO.prototype.GetAll = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var append_count, keys_count, sql, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!options) return [3 /*break*/, 2];
                        append_count = (options.append) ? options.append.length : 0;
                        keys_count = (options.keys) ? options.keys.length : 0;
                        sql = 'SELECT ';
                        if (keys_count > 0) {
                            // Obtenemos los valores que se van a insertar
                            if (keys_count > 1) {
                                sql += "" + options.keys.join(',');
                            }
                            else {
                                sql += "" + options.keys[0];
                            }
                        }
                        else {
                            sql += ' * ';
                        }
                        sql += " FROM " + this.tablename + " ";
                        if (append_count > 0) {
                            // if (append_count >= 1) {
                            sql += options.append.join(' ');
                            // }
                        }
                        console.log(colors_1.default.yellow(sql));
                        return [4 /*yield*/, this.DB.Query(sql).then(function (r) { return r; })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        sql = "SELECT * FROM " + this.tablename;
                        return [4 /*yield*/, this.DB.Query(sql).then(function (r) { return r; })];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retorna un string sanitizado a un formato especifico
     * > Si es insert lo devolverá de esta manera "'test','test',1"
     * @param data Objeto par-valor
     * @param mode Define el modo ya sea 'insert' o 'update'
     * @todo sanitizar update en arreglo
     */
    DAO.prototype.SanitizeData = function (data, mode) {
        if (Array.isArray(data)) {
            if (mode == 'insert') {
                var data2 = data.map(function (i) {
                    if (i == '') {
                        return "''";
                    }
                    return (isNaN(+i) ? "'" + i + "'" : i);
                }).join(',');
                console.log(data2);
                // return `(${data})`;
            }
            else {
            }
        }
        else {
            if (mode == 'insert') {
                // Me retorna un string con los valores sanitizados
                return Object.values(data).map(function (i) {
                    if (i == '') {
                        return "''";
                    }
                    return (isNaN(+i) ? "'" + i + "'" : i);
                }).join(',');
            }
            else {
                // Me retorna un string update sanitizado
                var keys = Object.keys(data);
                var values_1 = Object.values(data).map(function (i) {
                    if (i == '') {
                        return "''";
                    }
                    return (isNaN(+i) ? "'" + i + "'" : i);
                });
                return keys.map(function (k, i) { return k + " = " + values_1[i]; });
            }
        }
    };
    return DAO;
}(querymodeler_1.QueryModeler));
exports.DAO = DAO;
