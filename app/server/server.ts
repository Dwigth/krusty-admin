import http from 'http';
import https from 'https';
import colors from 'colors';
import hbs from 'hbs';

import { Database } from "../db/Database";
import express, { Application } from 'express';
import { MIDDLEWARES } from "../server/middlewares.idx";
import { environments } from "../../environments/enviroment";
import { readFileSync } from "fs";
import { Routes } from '../routes/routes.module'
import { HelpersModule } from '../helpers/hbs/helpers.module';

/**
 * =====================
 * 
 * Variables globales
 * 
 * =====================
 */

export let WEB_SERVER: Application;
export let ROOTDIRNAME = __dirname.slice(0, __dirname.indexOf('dist'));

export class Server {
    constructor() {

        const DB = new Database();
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
        // Siempre a lo ultimo de la jerarquía
        this.InitializeServer();
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
}
