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
        this.DB.query(sql).then(console.log).catch(console.log);
    };
    /**
     * Genera una consulta de inserción para un dato dado.
     * @returns Promise
     * @param data Dato a insertar
     */
    DAO.prototype.Insert = function (data) {
        var keys = Object.keys(data);
        var sql = "INSERT INTO " + this.tablename + " (" + keys + ") VALUES (" + this.SanitizeData(data, 'insert') + ")";
        console.log(sql);
        return this.DB.query(sql);
    };
    /**
     *
     * @param data Objeto a actualizar
     * @param where Sentencia WHERE ej. "WHERE id = 2" { property:'id',value:2 }
     */
    DAO.prototype.Update = function (data, where) {
        if (where == undefined) {
            console.error(colors_1.default.red('Se requiere la sentencia WHERE para seguir'));
            return;
        }
        var sql = "UPDATE " + this.tablename + " SET " + this.SanitizeData(data, 'update') + "  " + where + ";";
        return this.DB.query(sql);
    };
    /**
     * El batch update es un metodo especial y especifico para crear una consulta por cada uno de los elementos agregados
     * es posible especificar una sentencia global WHERE o una por cada uno de los elementos.
     * @param data Objetos a actualizar
     * @param where Objeto con dos propiedades: `global` boolean que nos permite saber si el primer elemento del arreglo de valores where
     * se aplicará para todas las consultas. `Values` arreglo de valores sentencias where.
     */
    DAO.prototype.BatchUpdate = function (data, where) {
        var _this = this;
        var sql = '';
        data.map(function (d, i) {
            var _a, _b, _c;
            var sentence;
            if ((_a = where) === null || _a === void 0 ? void 0 : _a.global) {
                sentence = (_b = where) === null || _b === void 0 ? void 0 : _b.values[0];
            }
            else {
                sentence = (_c = where) === null || _c === void 0 ? void 0 : _c.values[i];
            }
            sql += "UPDATE " + _this.tablename + " SET " + _this.SanitizeData(d, 'update') + " " + sentence + ";";
        });
        this.DB.query(sql);
        return sql;
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
        var _a, _b, _c;
        var keysString = (((_a = options) === null || _a === void 0 ? void 0 : _a.where.Properties) != undefined) ? (_c = (_b = options) === null || _b === void 0 ? void 0 : _b.where.Properties) === null || _c === void 0 ? void 0 : _c.join(',') : '*';
        var sql = "SELECT " + keysString + " FROM " + this.tablename + " ";
        if (options) {
            sql += this.Whereify(options.where);
        }
        sql += ' LIMIT 1';
        console.log(sql);
        return this.DB.query(sql).then(function (r) { return r.rows[0]; });
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
        var keys_count = (options.keys) ? options.keys.length : 0;
        var append_count = (options.append) ? options.append.length : 0;
        if (options) {
            var sql = 'SELECT ';
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
            return this.DB.query(sql).then(function (r) { return r.rows; });
        }
        else {
            var sql = "SELECT * FROM " + this.tablename;
            return this.DB.query(sql).then(function (r) { return r.rows; });
        }
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
