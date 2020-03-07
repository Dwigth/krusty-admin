import http from 'http';
import https from 'https';
import colors from 'colors';
import hbs from 'hbs';
import io from 'socket.io';

import { Database } from "../db/Database";
import express, { Application } from 'express';
import { MIDDLEWARES } from "../server/middlewares.idx";
import { environments } from "../../environments/enviroment";
import { readFileSync, readFile } from "fs";
import { Routes } from '../routes/routes.module'
import { HelpersModule } from '../helpers/hbs/helpers.module';

import * as moment from 'moment-timezone';
import 'moment/locale/es-us';
import { NotificationController } from '../controllers/notification.controller';
import { SocketClass } from '../sockets/socket';


/**
 * =====================
 * 
 * Variables globales
 * 
 * =====================
 */

export let WEB_SERVER: Application;
export let ROOTDIRNAME = __dirname.slice(0, __dirname.indexOf('dist'));
export let APPDB: any;

export class Server {
    constructor() {

        const DB = new Database();
        APPDB = DB;
        this.WebService();

    }

    /**
     * =============================================
     * 
     * Inicializa el servidor Express
     * 
     * =============================================
     */
    WebService() {

        WEB_SERVER = express();
        this.LoadMiddlewares();
        this.LoadStaticFiles();
        this.LoadTemplateEngine();
        this.LoadRoutes();
        this.SecurityConfig();
        this.LoadTimeUtilities();
        // Siempre a lo ultimo de la jerarquía
        this.InitializeServer();
        this.InitializeSocketServer();
    }

    /**
     * =============================================
     * 
     * Inicializa los servidores HTTP o HTTPS 
     * 
     * =============================================
     */
    InitializeServer() {
        try {
            let SERVER;

            if (environments.enableSSL) {
                SERVER = https.createServer({
                    key: readFileSync(environments.SSLConfig.key),
                    cert: readFileSync(environments.SSLConfig.cert)
                }, WEB_SERVER);
            } else {
                SERVER = http.createServer(WEB_SERVER);
            }
            SERVER.listen(environments.PORT, () => {
                if (environments.logging) {
                    console.log(colors
                        .green('Servicio corriendo desde el puerto: ' + environments.PORT.toString())
                    );
                }
            });
        } catch (e) {
            console.log(colors.red(e));
        }
    }

    /**
     * =============================================
     * 
     * Carga todos los complementos o middlewares de
     * una lista
     * 
     * =============================================
     */
    LoadMiddlewares() {
        WEB_SERVER.use(MIDDLEWARES);
    }

    /**
     * =============================================
     * 
     * Permite que el programador defina el motor de 
     * renderizado que prefiera
     * 
     * =============================================
     */
    LoadTemplateEngine() {
        WEB_SERVER.set('view engine', 'hbs');
        hbs.registerPartials(ROOTDIRNAME + 'views/partials');
        const HelpMod = new HelpersModule();

        if (environments.logging) {
            console.log(colors.america('Parciales de HBS =>'), ROOTDIRNAME + 'views/partials');
        }
    }

    /**
     * =============================================
     * 
     * Carga archivos estáticos
     * 
     * =============================================
     */
    LoadStaticFiles() {
        WEB_SERVER.use(express.static(ROOTDIRNAME + 'public/'))
    }

    /**
     * =============================================
     * 
     * Carga todas las rutas de express
     * 
     * =============================================
     */
    LoadRoutes() {
        const routes = new Routes();
    }

    SecurityConfig() {
        WEB_SERVER.disable('x-powered-by');
    }

    /**
     * =============================================
     * 
     * Carga utilerias y establece configuraciones 
     * para usar momentjs
     * 
     * =============================================
     */
    LoadTimeUtilities() {
        moment.tz("America/Mexico_City");
        moment.locale('es-us');
    }

    /**
     * =============================================
     * 
     * Inicializa un servidor http para otra instancia de SOCKET.IO
     * Y monta el archivo cliente js de socket
     * 
     * =============================================
     */
    InitializeSocketServer() {
        let httpsocket = http.createServer(function (req, res) {
            readFile(ROOTDIRNAME + '/public/socket.js', function (err, data) {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    return res.end("404 Not Found");
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            });
        }).listen(environments.Socket.PORT);
        io(httpsocket).on('connection', function (socket) {
            const nctl = new NotificationController(socket);
            const socketCtrl = new SocketClass(socket);
        });
    }
}
