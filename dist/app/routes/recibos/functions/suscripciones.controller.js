"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//DB MYSQL
var Database_1 = require("../../../db/Database");
var SuscripcionesController = /** @class */ (function () {
    function SuscripcionesController() {
    }
    SuscripcionesController.obtenerSucripcion = function (id_empresa) {
        return new Promise(function (resolve, reject) {
            var consulta = "\n                SELECT * FROM suscripciones WHERE id_empresa = " + id_empresa + "\n            ";
            console.log("consulta", consulta);
            Database_1.Database.Instance.ejecutarConsulta(consulta, false, null, function (err, datos) {
                if (err) {
                    if (err == 'El registro no existe') {
                        return resolve([]);
                    }
                    else {
                        console.log("error", err);
                        return reject(err);
                    }
                }
                else {
                    // console.log(datos);
                    return resolve(datos);
                }
            }).catch(function (error) {
                //Algo salio mal
                console.log(error);
                return reject(error);
            });
        });
    };
    return SuscripcionesController;
}());
exports.SuscripcionesController = SuscripcionesController;
