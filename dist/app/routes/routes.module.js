"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var routes_idx_1 = require("./routes.idx");
var server_1 = require("../server/server");
/**
 * =============================================
 *
 * Clase de rutas en este caso se hace uso de la
 * variable global "WEB_SERVER" para inicializar
 * los routers.
 *
 * =============================================
 */
var Routes = /** @class */ (function () {
    function Routes() {
        server_1.WEB_SERVER.use(routes_idx_1.routes);
    }
    return Routes;
}());
exports.Routes = Routes;
