import { routes } from "./routes.idx";
import { WEB_SERVER } from "../server/server";
import { Request, Response } from "express";

/**
 * =============================================
 * 
 * Clase de rutas en este caso se hace uso de la
 * variable global "WEB_SERVER" para inicializar 
 * los routers.
 * 
 * =============================================
 */
export class Routes {
    constructor() {
        WEB_SERVER.use(routes);
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
    RouteNotMatched() {
        WEB_SERVER.use('*', (req: Request, res: Response) => {
            res.status(404).render('404', { title: 404 });
        });
    }
    /**
     * ==========================================
     * 
     * Obtiene la información de sesión del usuario
     * si no la obtiene lo redirige al Login
     * 
     * ==========================================
     */
    GetUserDataSession() {
        WEB_SERVER.use('/home', (req: Request, res: Response) => {
            const userData = req.session.user;
            console.log('No hay datos de usuario redirigiendo');
            if (userData === undefined) {
                res.redirect('/login');
            }
        });
    }
}