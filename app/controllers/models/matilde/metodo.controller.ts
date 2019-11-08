import { IMetodoModel, IMetodo } from "../../../interfaces/Database/models/metodo";
import { Database } from "../../../db/Database";
import { environments } from "../../../../environments/enviroment";
import colors from 'colors';

export class MetodoController implements IMetodoModel {
    id_metodo: number;
    nombre: string;

    constructor() { }

    public async GetAll() {
        let query = `SELECT * FROM metodo`;
        const resp = await Database.Instance.Query<IMetodoModel[]>(query);
        return resp;
    }

    public async GetNames() {
        let query = `SELECT id_metodo,nombre FROM metodo`;
        const resp = await Database.Instance.Query<string[]>(query);
        return resp;
    }

    public async Delete(previews: Array<IMetodoModel> | IMetodoModel) {
        if (Array.isArray(previews)) { }
        else {
            let query = `DELETE FROM metodo WHERE id_metodo = ${previews.id_metodo}`
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
    public async Update(previews: Array<IMetodo> | IMetodo) {
        if (Array.isArray(previews)) {
            previews.map(data => {
                let query = `UPDATE metodo SET nombre = '${data.nombre}' 
            WHERE id_metodo = ${data.id_metodo};`;
                if (environments.logging) {
                    console.log(colors.yellow(query));
                }
            });
        } else {
            let query = `UPDATE metodo SET nombre = '${previews.nombre}' 
            WHERE id_metodo = ${previews.id_metodo};`
            if (environments.logging) {
                console.log(colors.yellow(query));
            }
            return await Database.Instance.Query(query);
        }
    }

    public async Create(previews: Array<IMetodo> | IMetodo) {
        if (Array.isArray(previews)) {
            let query = `INSERT INTO metodo (nombre) VALUES`;
            let queryValues = previews.map(pre => `(${pre.nombre}`);
            query += queryValues;
            if (environments.logging) {
                console.log(colors.yellow(query));
            }
        }
        else {
            let query = `INSERT INTO metodo (nombre) VALUES ('${previews.nombre}')`;
            if (environments.logging) {
                console.log(colors.yellow(query));
            }
            return await Database.Instance.Query(query);
        }

    }

}