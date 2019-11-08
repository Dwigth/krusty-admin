import { IPrincipioModel, IPrincipio } from "../../../interfaces/Database/models/principio";
import { Database } from "../../../db/Database";
import { environments } from "../../../../environments/enviroment";
import colors from 'colors';

export class PrincipioController implements IPrincipioModel {
    id_principio?: number;
    nombre: string;
    id_metodo: string;

    constructor() { }

    public async GetAll() {
        let query = `
        SELECT p.id_principio,p.nombre, m.nombre AS "metodo" FROM principio p
        INNER JOIN metodo m
        ON p.id_metodo = m.id_metodo
        `;
        const resp = await Database.Instance.Query<IPrincipio[]>(query);
        return resp;
    }

    public async GetNames() {
        let query = `SELECT id_principio,nombre FROM principio`;
        const resp = await Database.Instance.Query<string[]>(query);
        return resp;
    }

    public async Delete(previews: Array<IPrincipio> | IPrincipio) {
        if (Array.isArray(previews)) { }
        else {
            let query = `DELETE FROM principio WHERE id_principio = ${previews.id_principio}`
            if (environments.logging) {
                console.log(colors.yellow(query));
            }
            return await Database.Instance.Query(query);
        }
    }

    /**
     * @todo Trabajar con arreglo de objetos
     * @param previews Objeto o arreglo de objetos
     */
    public async Update(previews: Array<IPrincipio> | IPrincipio) {
        if (Array.isArray(previews)) {
            previews.map(data => {
                let query = `UPDATE principio SET nombre = '${data.nombre}', id_metodo = ${data.id_metodo}
            WHERE id_principio = ${data.id_principio};`;
                if (environments.logging) {
                    console.log(colors.yellow(query));
                }
            });
        } else {
            let query = `UPDATE principio SET nombre = '${previews.nombre}', id_metodo = ${previews.id_metodo} 
            WHERE id_principio = ${previews.id_principio};`
            if (environments.logging) {
                console.log(colors.yellow(query));
            }
            return await Database.Instance.Query(query);
        }
    }

    public async Create(previews: Array<IPrincipio> | IPrincipio) {
        if (Array.isArray(previews)) {
            let query = `INSERT INTO principio (nombre, id_metodo) VALUES`;
            let queryValues = previews.map(pre => `('${pre.nombre}','${pre.id_metodo}')`);
            query += queryValues;
            if (environments.logging) {
                console.log(colors.yellow(query));
            }
        }
        else {
            let query = `INSERT INTO principio (nombre, id_metodo) VALUES ('${previews.nombre}','${previews.id_metodo}')`;
            if (environments.logging) {
                console.log(colors.yellow(query));
            }
            return await Database.Instance.Query(query);
        }

    }
}