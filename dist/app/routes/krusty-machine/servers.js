"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Database_1 = require("../../db/Database");
//Moment
var moment_1 = __importDefault(require("moment"));
var socket_1 = require("../../sockets/socket");
var router = express_1.Router();
/**
 * @description Obtiene todas las krustymachines dela base de datos
 */
router.get('/obtener_krusty_machines', function (req, res) {
    var token = req.header("Authorization");
    // console.log("Token", token);
    // Obtener sus datos de sesión
    var consulta = "\n        SELECT * FROM krusty_machine;\n    ";
    Database_1.Database.Instance.ejecutarConsulta(consulta, true, token, function (err, datos) {
        if (err) {
            var response = {
                error: true,
                mensaje: "Algo salio mal",
                data: err
            };
            return res.json(response);
        }
        else {
            var response = {
                error: false,
                mensaje: "Se obtuvieron los datos correctamente.",
                data: socket_1.usuarioController.asignarConectados(datos)
            };
            return res.json(response);
        }
    });
});
/**
 * @description Inserta una nueva maquina de krustymachine a la base de datos
 */
router.post('/insertar_krusty_machine', function (req, res) {
    var body = req.body;
    var fecha_acual = moment_1.default().locale('es').format('YYYY-MM-DD');
    var token = req.header("Authorization");
    // console.log("Token", token);
    var consulta = "\n        INSERT INTO krusty_machine (id_server,ultimaFechaActivo,activo,longitud,\n        latitud,nombreServer,velocidad_conexion,ip_server) \n        VALUES (NULL,'" + fecha_acual + "'," + body.activo + ",'" + body.longitud + "','" + body.latitud + "', \n        '" + body.nombreServer + "','" + body.velocidad_conexion + "','" + body.ip_server + "');\n    ";
    Database_1.Database.Instance.ejecutarConsulta(consulta, true, token, function (err, datos) {
        if (err) {
            var response = {
                error: true,
                mensaje: "Algo salio mal",
                data: err
            };
            return res.json(response);
        }
        else {
            var response = {
                error: false,
                mensaje: "Se insertaron los datos correctamente.",
                data: datos
            };
            return res.json(response);
        }
    });
});
/**
 * @description Edita una maquina de krustymachine
 */
router.post('/modificar_krusty_machine', function (req, res) {
    var body = req.body;
    var id_krustymachine = body.id_server;
    var fecha_acual = moment_1.default().locale('es').format('YYYY-MM-DD');
    var token = req.header("Authorization");
    // console.log("Token", token);
    var consulta = "\n        UPDATE krusty_machine SET \n        activo = " + body.activo + ",\n        ultimaFechaActivo = " + fecha_acual + ",\n        longitud = '" + body.longitud + "', \n        latitud = '" + body.latitud + "',\n        nombreServer = '" + body.nombreServer + "',\n        velocidad_conexion = '" + body.velocidad_conexion + "',\n        ip_server = '" + body.ip_server + "'\n        WHERE krusty_machine.id_server = " + id_krustymachine + ";\n    ";
    Database_1.Database.Instance.ejecutarConsulta(consulta, true, token, function (err, datos) {
        if (err) {
            var response = {
                error: true,
                mensaje: "Algo salio mal",
                data: err
            };
            return res.json(response);
        }
        else {
            var response = {
                error: false,
                mensaje: "Se modificaron los datos correctamente.",
                data: datos
            };
            return res.json(response);
        }
    });
});
/**
 * @description Elimina una maquina de krustymachine
 */
router.post('/eliminar_krusty_machine', function (req, res) {
    var body = req.body;
    var id_krustymachine = body.id_server;
    var token = req.header("Authorization");
    // console.log("Token", token);
    var consulta = "\n        DELETE FROM krusty_machine WHERE krusty_machine.id_server = " + id_krustymachine + "\n    ";
    Database_1.Database.Instance.ejecutarConsulta(consulta, true, token, function (err, datos) {
        if (err) {
            var response = {
                error: true,
                mensaje: "Algo salio mal",
                data: err
            };
            return res.json(response);
        }
        else {
            var response = {
                error: false,
                mensaje: "Se elimino el registro correctamente.",
                data: datos
            };
            return res.json(response);
        }
    });
});
exports.ServerRouter = router;
