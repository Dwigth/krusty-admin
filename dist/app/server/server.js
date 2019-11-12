"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var https_1 = __importDefault(require("https"));
var colors_1 = __importDefault(require("colors"));
var hbs_1 = __importDefault(require("hbs"));
var Database_1 = require("../db/Database");
var express_1 = __importDefault(require("express"));
var middlewares_idx_1 = require("../server/middlewares.idx");
var enviroment_1 = require("../../environments/enviroment");
var fs_1 = require("fs");
var routes_module_1 = require("../routes/routes.module");
var helpers_module_1 = require("../helpers/hbs/helpers.module");
var moment = __importStar(require("moment-timezone"));
require("moment/locale/es-us");
exports.ROOTDIRNAME = __dirname.slice(0, __dirname.indexOf('dist'));
var Server = /** @class */ (function () {
    function Server() {
        var DB = new Database_1.Database();
        this.WebService();
    }
    /**
     * =============================================
     *
     * Inicializa el servidor Express
     *
     * =============================================
     */
    Server.prototype.WebService = function () {
        exports.WEB_SERVER = express_1.default();
        this.LoadMiddlewares();
        this.LoadStaticFiles();
        this.LoadTemplateEngine();
        this.LoadRoutes();
        this.SecurityConfig();
        this.LoadTimeUtilities();
        // Siempre a lo ultimo de la jerarquía
        this.InitializeServer();
    };
    /**
     * =============================================
     *
     * Inicializa los servidores HTTP o HTTPS
     *
     * =============================================
     */
    Server.prototype.InitializeServer = function () {
        try {
            var SERVER = void 0;
            if (enviroment_1.environments.enableSSL) {
                SERVER = https_1.default.createServer({
                    key: fs_1.readFileSync(enviroment_1.environments.SSLConfig.key),
                    cert: fs_1.readFileSync(enviroment_1.environments.SSLConfig.cert)
                }, exports.WEB_SERVER);
            }
            else {
                SERVER = http_1.default.createServer(exports.WEB_SERVER);
            }
            SERVER.listen(enviroment_1.environments.PORT, function () {
                if (enviroment_1.environments.logging) {
                    console.log(colors_1.default
                        .green('Servicio corriendo desde el puerto: ' + enviroment_1.environments.PORT.toString()));
                }
            });
        }
        catch (e) {
            console.log(colors_1.default.red(e));
        }
    };
    /**
     * =============================================
     *
     * Carga todos los complementos o middlewares de
     * una lista
     *
     * =============================================
     */
    Server.prototype.LoadMiddlewares = function () {
        exports.WEB_SERVER.use(middlewares_idx_1.MIDDLEWARES);
    };
    /**
     * =============================================
     *
     * Permite que el programador defina el motor de
     * renderizado que prefiera
     *
     * =============================================
     */
    Server.prototype.LoadTemplateEngine = function () {
        exports.WEB_SERVER.set('view engine', 'hbs');
        hbs_1.default.registerPartials(exports.ROOTDIRNAME + 'views/partials');
        var HelpMod = new helpers_module_1.HelpersModule();
        if (enviroment_1.environments.logging) {
            console.log(colors_1.default.america('Parciales de HBS =>'), exports.ROOTDIRNAME + 'views/partials');
        }
    };
    /**
     * =============================================
     *
     * Carga archivos estáticos
     *
     * =============================================
     */
    Server.prototype.LoadStaticFiles = function () {
        exports.WEB_SERVER.use(express_1.default.static(exports.ROOTDIRNAME + 'public/'));
    };
    /**
     * =============================================
     *
     * Carga todas las rutas de express
     *
     * =============================================
     */
    Server.prototype.LoadRoutes = function () {
        var routes = new routes_module_1.Routes();
    };
    Server.prototype.SecurityConfig = function () {
        exports.WEB_SERVER.disable('x-powered-by');
    };
    /**
     * =============================================
     *
     * Carga utilerias y establece configuraciones
     * para usar momentjs
     *
     * =============================================
     */
    Server.prototype.LoadTimeUtilities = function () {
        moment.tz("America/Mexico_City");
        moment.locale('es');
    };
    return Server;
}());
exports.Server = Server;
