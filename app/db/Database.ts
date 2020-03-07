import mysql, { Query } from "mysql";
import { environments } from "../../environments/enviroment";
import { IDatabase } from "../interfaces/Database/IDatabase";
import colors from 'colors';
import { QueryValues } from "../interfaces/Database/QueryValues";
import { UsuarioAdmin } from "../interfaces/krusty_machine/usuario.model";

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
        try {
            this.Pool = mysql.createPool(environments.database);
        } catch (e) {
            console.error(colors.red(e));
        }
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
    /**
     * ====================================================
     * 
     * Ejecuta una consulta y retorna una promesa del tipo 
     * especificado.
     * 
     * ====================================================
     * @param query 
     */
    public async Query<T>(query: string, replacements?: any): Promise<T> {
        return new Promise((resolve, reject) => {
            const QUERY = this.Pool.query(query, replacements, function (error, results, fields) {
                if (error) reject(error);
                if (environments.logging) {
                    console.log(QUERY.sql.yellow);
                }
                resolve(results);
            });
        });
    }

    public async Queryable<T>(query: string): Promise<QueryValues<T>> {
        let queryPromise = new Promise<{ results: any, fields: any }>((resolve, reject) => {
            const queryResult = this.Pool.query(query, function (error, results, fields) {
                if (error) reject(error);
                console.log(fields);
                resolve({ results, fields })
                // console.log('The solution is: ', results[0]);
            });
        });
        let queryResult = await queryPromise;
        const result: QueryValues<T> = {
            DataValues: <T>queryResult.results,
            QueryValues: queryResult.fields
        }
        return result;
    }

    //EJECUTA UNA CONSULTA
    public async ejecutarConsulta(query: string, requireToken: boolean, token: string, callback: Function) {

        let queryAdmin = `SELECT * FROM admin WHERE token = '${token}'`;
        let validacionUser: boolean = false;
        let promiseUser: Promise<UsuarioAdmin> = new Promise(
            (resolve, reject) => {
                this.Pool.query(
                    queryAdmin,
                    (err: any, results: UsuarioAdmin[], fields: any) => {
                        //SI ENCONTRAMOS UN ERROR DE SINTAXIS
                        if (err) {
                            //   console.log("Error al ejecutar consulta", err);
                            reject(err);
                        }
                        // console.log("query", queryAdmin);
                        // console.log("results", results);

                        //SI EL DATO BUSCADO NO EXISTE
                        if (results.length === 0) {
                            //   console.log("No se encontro el usuario");
                            reject("No se encontro el usuario");
                        }

                        resolve(results[0]);
                    }
                );
            }
        );

        if (requireToken) {
            await promiseUser.then(user => validacionUser = true).catch(e => validacionUser = false);
            // console.log("promise user", promiseUser);
        } else {
            validacionUser = true;
        }

        if (validacionUser) {
            this.Pool.query(query, (err: any, results: Object[], fields: any) => {
                //SI ENCONTRAMOS UN ERROR DE SINTAXIS
                if (err) {
                    // console.log("Error al ejecutar consulta", err);
                    return callback(err);
                }
                //SI EL DATO BUSCADO NO EXISTE
                if (results.length === 0) {
                    return callback("El registro no existe");
                } else {
                    //TODO SALIO BIEN
                    return callback(null, results);
                }
            });
        } else {
            return callback("Error al validar usuario");
        }


    }

}