"use strict";
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
var express_1 = require("express");
//DB MYSQL
var Database_1 = require("../../db/Database");
//Moment
var moment_1 = __importDefault(require("moment"));
//Controllers
var enviroment_1 = require("../../../environments/enviroment");
var suscripciones_controller_1 = require("./functions/suscripciones.controller");
var router = express_1.Router();
/////////////////////////////////////////EMPRESAS CRUD/////////////////////////////////////////////////
/**
 * @description Ingresar una empresa nueva
 */
router.post('/ingresarEmpresa', function (req, res) {
    var body = req.body;
    var token = req.header("Authorization");
    console.log("Token", token);
    console.log("body", body);
    var fecha_inicio = moment_1.default().locale('es').format('YYYY-MM-DD HH:mm');
    var consulta = "\n        INSERT INTO empresas (id,nombreEmpresa,usuario,password,\n          fecha_registro,token) \n        VALUES (NULL,'" + body.nombreEmpresa + "','" + body.usuario + "','" + body.password + "','" + fecha_inicio + "', \n        '');\n  ";
    console.log("consulta", consulta);
    Database_1.Database.Instance.ejecutarConsulta(consulta, enviroment_1.environments.requiereToken, token, function (err, data) {
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
            var response = {
                error: false,
                msg: "Empresas insertada en la bd con exito.",
                data: data
            };
            return res.json(response);
        }
    }).catch(function (error) {
        //Algo salio mal
        var response = {
            error: true,
            msg: "Hubo un error al ejecutar la consulta",
            data: error
        };
        return res.json(response);
    });
});
/**
 * @description Buscar todas las empresas
 */
router.get('/obtenerEmpresas', function (req, res) {
    var token = req.header("Authorization");
    console.log("Token", token);
    var consulta = "\n        SELECT * FROM empresas\n  ";
    console.log("consulta", consulta);
    Database_1.Database.Instance.ejecutarConsulta(consulta, enviroment_1.environments.requiereToken, token, function (err, datos) { return __awaiter(void 0, void 0, void 0, function () {
        var response, empresas, promesas, data, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!err) return [3 /*break*/, 1];
                    response = {
                        error: true,
                        msg: "Algo salio mal en la consulta.",
                        data: err
                    };
                    return [2 /*return*/, res.json(response)];
                case 1:
                    console.log(datos);
                    empresas = datos;
                    promesas = empresas.map(function (empresa) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                _a = empresa;
                                                return [4 /*yield*/, suscripciones_controller_1.SuscripcionesController.obtenerSucripcion(empresa.id)];
                                            case 1:
                                                _a.suscripciones = _b.sent();
                                                resolve(empresa);
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(promesas)];
                case 2:
                    data = _a.sent();
                    response = {
                        error: false,
                        msg: "Empresas encontradas con exito.",
                        data: data
                    };
                    return [2 /*return*/, res.json(response)];
            }
        });
    }); }).catch(function (error) {
        //Algo salio mal
        var response = {
            error: true,
            msg: "Hubo un error al ejecutar la consulta",
            data: error
        };
        return res.json(response);
    });
});
/**
 * @description Elimina una empresa
 */
router.post('/eliminarEmpresa', function (req, res) {
    var body = req.body;
    var token = req.header("Authorization");
    console.log("Token", token);
    console.log("body", body);
    var consulta = "\n    DELETE FROM empresas WHERE id = " + body.id_empresa + ";\n  ";
    console.log("consulta", consulta);
    Database_1.Database.Instance.ejecutarConsulta(consulta, enviroment_1.environments.requiereToken, token, function (err, data) {
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
            var response = {
                error: false,
                msg: "Empresas eliminada de la bd con exito.",
                data: data
            };
            return res.json(response);
        }
    }).catch(function (error) {
        //Algo salio mal
        var response = {
            error: true,
            msg: "Hubo un error al ejecutar la consulta",
            data: error
        };
        return res.json(response);
    });
});
/**
 * @description Editar una empresa
 */
router.post('/editarEmpresa', function (req, res) {
    var body = req.body;
    var token = req.header("Authorization");
    console.log("Token", token);
    console.log("body", body);
    var empresa = {
        id: body.id,
        nombreEmpresa: body.nombreEmpresa,
        usuario: body.usuario,
    };
    var consulta = "\n      UPDATE empresas SET nombreEmpresa = '" + empresa.nombreEmpresa + "', usuario = '" + empresa.usuario + "' WHERE id = " + empresa.id + ";\n  ";
    console.log("consulta", consulta);
    Database_1.Database.Instance.ejecutarConsulta(consulta, enviroment_1.environments.requiereToken, token, function (err, data) {
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
            var response = {
                error: false,
                msg: "Empresas editada en la bd con exito.",
                data: data
            };
            return res.json(response);
        }
    }).catch(function (error) {
        //Algo salio mal
        var response = {
            error: true,
            msg: "Hubo un error al ejecutar la consulta",
            data: error
        };
        return res.json(response);
    });
});
////////////////////////////////////////////SUSCRIPCIONES CRUD/////////////////////////////////////////////////
/**
 * @description Ingresar una empresa nueva
 */
router.post('/nuevaSuscripcion', function (req, res) {
    var body = req.body;
    var token = req.header("Authorization");
    console.log("Token", token);
    console.log("body", body);
    var consulta = "\n        INSERT INTO suscripciones (id,id_empresa,nombre_servicio,fecha_inicio,\n          fecha_vencimiento,pagado, tipo, metodo_pago, recurrencia) \n        VALUES (NULL, " + body.id_empresa + ",'" + body.nombre_servicio + "','" + body.fecha_inicio + "','" + body.fecha_vencimiento + "', \n        " + body.pagado + ", " + body.tipo + ", '" + body.metodo_pago + "', '" + body.recurrencia + "');\n  ";
    console.log("consulta", consulta);
    Database_1.Database.Instance.ejecutarConsulta(consulta, enviroment_1.environments.requiereToken, token, function (err, data) {
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
            var response = {
                error: false,
                msg: "Suscripcion insertada en la bd con exito.",
                data: data
            };
            return res.json(response);
        }
    }).catch(function (error) {
        //Algo salio mal
        var response = {
            error: true,
            msg: "Hubo un error al ejecutar la consulta",
            data: error
        };
        return res.json(response);
    });
});
/**
 * @description Elimina una sucripcion
 */
router.post('/eliminarSuscripcion', function (req, res) {
    var body = req.body;
    var token = req.header("Authorization");
    console.log("Token", token);
    console.log("body", body);
    var consulta = "\n        DELETE FROM suscripciones WHERE id = " + body.id_suscripcion + "\n  ";
    console.log("consulta", consulta);
    Database_1.Database.Instance.ejecutarConsulta(consulta, enviroment_1.environments.requiereToken, token, function (err, data) {
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
            var response = {
                error: false,
                msg: "Suscripcion eliminada en la bd con exito.",
                data: data
            };
            return res.json(response);
        }
    }).catch(function (error) {
        //Algo salio mal
        var response = {
            error: true,
            msg: "Hubo un error al ejecutar la consulta",
            data: error
        };
        return res.json(response);
    });
});
/**
 * @description Editar una sucripcion
 */
router.post('/editarSuscripcion', function (req, res) {
    var body = req.body;
    var token = req.header("Authorization");
    console.log("Token", token);
    console.log("body", body);
    var suscripcion = {
        id: body.id,
        nombre_servicio: body.nombre_servicio,
        fecha_inicio: body.fecha_inicio,
        fecha_vencimiento: body.fecha_vencimiento,
        pagado: body.pagado,
        tipo: body.tipo,
        metodo_pago: body.metodo_pago,
        recurrencia: body.recurrencia
    };
    var consulta = "\n      UPDATE suscripciones SET \n      nombre_servicio = '" + suscripcion.nombre_servicio + "', \n      fecha_inicio = '" + suscripcion.fecha_inicio + "',\n      fecha_vencimiento = '" + suscripcion.fecha_vencimiento + "',\n      pagado = " + suscripcion.pagado + ",\n      tipo = " + suscripcion.tipo + ",\n      metodo_pago = '" + suscripcion.metodo_pago + "',\n      recurrencia = '" + suscripcion.recurrencia + "'\n\n      WHERE id = " + suscripcion.id + ";\n  ";
    console.log("consulta", consulta);
    Database_1.Database.Instance.ejecutarConsulta(consulta, enviroment_1.environments.requiereToken, token, function (err, data) {
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
            var response = {
                error: false,
                msg: "Suscripcion editada en la bd con exito.",
                data: data
            };
            return res.json(response);
        }
    }).catch(function (error) {
        //Algo salio mal
        var response = {
            error: true,
            msg: "Hubo un error al ejecutar la consulta",
            data: error
        };
        return res.json(response);
    });
});
exports.RecibosRouter = router;
