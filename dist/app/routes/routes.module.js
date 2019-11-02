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
        this.GetUserDataSession();
        this.RouteNotMatched();
    }
    /**
     * ==========================================
     *
     * Si alguna ruta no se encuentra, renderizame
     * la página de 404 not found
     *
     * ==========================================
     */
    Routes.prototype.RouteNotMatched = function () {
        server_1.WEB_SERVER.use('*', function (req, res) {
            res.status(404).render('404', { title: 404 });
        });
    };
    /**
     * ==========================================
     *
     * Obtiene la información de sesión del usuario
     * si no la obtiene lo redirige al Login
     *
     * ==========================================
     */
    Routes.prototype.GetUserDataSession = function () {
        server_1.WEB_SERVER.use('/home', function (req, res) {
            var userData = req.session.user;
            console.log('No hay datos de usuario redirigiendo');
            if (userData === undefined) {
                res.redirect('/login');
            }
        });
    };
    return Routes;
}());
exports.Routes = Routes;
