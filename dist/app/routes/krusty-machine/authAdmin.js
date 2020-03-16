"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Database_1 = require("../../db/Database");
var bcryptjs_1 = require("bcryptjs");
var crypto_1 = __importDefault(require("crypto"));
var router = express_1.Router();
/**
 * @description Elimina una maquina de krustymachine
 */
router.post('/loginAdmin', function (req, res) {
    var hash = crypto_1.default.createHash('sha256');
    var saltRounds = 15;
    var body = req.body;
    var consulta = "SELECT * FROM admin WHERE nombre = '" + body.nombre + "'";
    Database_1.Database.Instance.ejecutarConsulta(consulta, false, null, function (err, datos) {
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
            var user_1 = datos[0];
            //Si todo sale bien, checamos que la contraseña sea correcta
            bcryptjs_1.compare(body.contrasena, user_1.contrasena).then(function (valid) {
                if (valid) {
                    //Si todo sale bien, actualizamos el token:
                    var TokenUpdated = hash.update(Date.now().toString()).digest('hex');
                    user_1.token = TokenUpdated;
                    var updatequery = "UPDATE admin SET token = '" + TokenUpdated + "' WHERE admin.id_admin = " + user_1.id_admin + ";";
                    Database_1.Database.Instance.ejecutarConsulta(updatequery, false, null, function (errUpdate, datosUpdate) {
                        if (errUpdate) {
                            //Error al actualizar el toekn
                            var response = {
                                error: true,
                                msg: "Algo salio mal al actualizar el token.",
                                data: errUpdate
                            };
                            return res.json(response);
                        }
                        else {
                            delete user_1.contrasena;
                            //Todo salio biwen
                            var response = {
                                error: false,
                                msg: "Login correcto",
                                data: user_1
                            };
                            return res.json(response);
                        }
                    });
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
                console.log("error al comparar hash", errorValid);
                //Algo salio mal al validar el hash de la contraseña
                var response = {
                    error: true,
                    msg: "Hubo un error en el valid del login.",
                    data: errorValid
                };
                return res.json(response);
            });
        }
    });
});
exports.LoginAdminRouter = router;
