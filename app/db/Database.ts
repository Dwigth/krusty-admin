import mysql from "mysql";
import { environments } from "../../environments/enviroment";
import { IDatabase } from "../interfaces/Database/IDatabase";
import colors from 'colors';

/**
 * ==============================================
 * 
 * ### Clase que se encargará de las conexiones a 
 * base de datos y operaciones relacionadas
 * 
 * ==============================================
 * 
 */
export class Database implements IDatabase {
    public Pool: mysql.Pool;

    private static instance: Database = null;

    /**
     * =====================================================
     * 
     * Obtenemos la configuración de ambientes para crear un 
     * pool de conexiones
     * 
     * =====================================================
     */
    constructor() {
        this.Pool = mysql.createPool(environments.database);
        if (environments.logging) {
            console.log(colors.yellow('Conectado a: '), colors.rainbow(environments.database.host))
        }
    }

    /**
     * ====================================================
     * 
     * Patrón SINGLETON para obtener la unica instancia de
     * la clase
     * @todo Mejorar la función
     * 
     * ====================================================
     */
    public static get Instance(): Database {
        if (this.instance == null) {
            this.instance = new this;
        }
        return this.instance;
    }

}