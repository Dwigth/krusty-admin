"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var bcryptjs_1 = require("bcryptjs");
var Database_1 = require("../../db/Database");
//Moment
var moment_1 = __importDefault(require("moment"));
var socket_1 = require("../../sockets/socket");
var server_1 = require("../../server/server");
var router = express_1.Router();
/**
 * @description Reinicia maquina de krustymachine
 */
router.post('/reiniciarServidor', function (req, res) {
    var body = req.body;
    var token = req.header("Authorization");
    console.log("Token", token);
    console.log("body", body);
    var consulta = "SELECT * FROM admin WHERE nombre = '" + body.usuario + "'";
    console.log("consulta", consulta);
    Database_1.Database.Instance.ejecutarConsulta(consulta, true, token, function (err, datos) {
        //Error si no se encuentra el usuario
        if (err) {
            var response = {
                error: true,
                msg: "Algo salio mal en la consulta.",
                data: err
            };
            return res.json(response);
        }
        else {
            var user = datos[0];
            //Si todo sale bien, checamos que la contraseña sea correcta
            bcryptjs_1.compare(body.contrasena, user.contrasena).then(function (valid) {
                if (valid) {
                    //Si todo sale bien
                    var socketCtrl = new socket_1.SocketClass(server_1.socket_KrustyMachine);
                    socketCtrl.emitirReinicio(body.nombreServer);
                    var response = {
                        error: false,
                        msg: "Perfecto",
                        data: "Reiniciando " + body.nombreServer
                    };
                    return res.json(response);
                }
                else {
                    //La contraseña no coincide con el hash
                    var response = {
                        error: true,
                        msg: "Sus credenciales son incorrectas.",
                        data: valid
                    };
                    return res.json(response);
                }
            }).catch(function (errorValid) {
                // console.log("error al comparar hash", errorValid);
                //Algo salio mal al validar el hash de la contraseña
                var response = {
                    error: true,
                    msg: "Hubo un error al decifrar la contraseña",
                    data: errorValid
                };
                return res.json(response);
            });
        }
    });
});
/**
 * @description Apaga maquina de krustymachine
 */
router.post('/apagarServidor', function (req, res) {
    var body = req.body;
    var token = req.header("Authorization");
    // console.log("Token", token);
    var consulta = "SELECT * FROM admin WHERE nombre = '" + body.usuario + "'";
    Database_1.Database.Instance.ejecutarConsulta(consulta, true, token, function (err, datos) {
        //Error si no se encuentra el usuario
        if (err) {
            var response = {
                error: true,
                msg: "Algo salio mal en la consulta.",
                data: err
            };
            return res.json(response);
        }
        else {
            var user = datos[0];
            //Si todo sale bien, checamos que la contraseña sea correcta
            bcryptjs_1.compare(body.contrasena, user.contrasena).then(function (valid) {
                if (valid) {
                    //Si todo sale bien
                    var socketCtrl = new socket_1.SocketClass(server_1.socket_KrustyMachine);
                    socketCtrl.emitirApagado(body.nombreServer);
                    var response = {
                        error: false,
                        msg: "Perfecto",
                        data: "Apagando " + body.nombreServer
                    };
                    return res.json(response);
                }
                else {
                    //La contraseña no coincide con el hash
                    var response = {
                        error: true,
                        msg: "Sus credenciales son incorrectas.",
                        data: valid
                    };
                    return res.json(response);
                }
            }).catch(function (errorValid) {
                // console.log("error al comparar hash", errorValid);
                //Algo salio mal al validar el hash de la contraseña
                var response = {
                    error: true,
                    msg: "Hubo un error al decifrar la contraseña",
                    data: errorValid
                };
                return res.json(response);
            });
        }
    });
});
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
                msg: "Algo salio mal",
                data: err
            };
            return res.json(response);
        }
        else {
            var response = {
                error: false,
                msg: "Se obtuvieron los datos correctamente.",
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
                msg: "Algo salio mal",
                data: err
            };
            return res.json(response);
        }
        else {
            var response = {
                error: false,
                msg: "Se insertaron los datos correctamente.",
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
                msg: "Algo salio mal",
                data: err
            };
            return res.json(response);
        }
        else {
            var response = {
                error: false,
                msg: "Se modificaron los datos correctamente.",
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
                msg: "Algo salio mal",
                data: err
            };
            return res.json(response);
        }
        else {
            var response = {
                error: false,
                msg: "Se elimino el registro correctamente.",
                data: datos
            };
            return res.json(response);
        }
    });
});
exports.ServerRouter = router;
