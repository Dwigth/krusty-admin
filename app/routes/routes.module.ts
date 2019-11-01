import { routes } from "./routes.idx";
import { WEB_SERVER } from "../server/server";

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
    }
}