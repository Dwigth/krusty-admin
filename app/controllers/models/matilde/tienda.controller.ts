import { ITiendaModel, ITienda } from "../../../interfaces/Database/models/tienda";
import { Database } from "../../../db/Database";
import { environments } from "../../../../environments/enviroment";
import colors from 'colors';

export class TiendaController implements ITiendaModel {
    nombre: string;
    id_tienda: number;
    direccion: string;

    constructor() { }

    public async GetAll() {
        let query = `SELECT * FROM tienda`;
        const resp = await Database.Instance.Query<ITiendaModel[]>(query);
        return resp;
    }

    public async GetNames() {
        let query = `SELECT id_tienda,nombre FROM tienda`;
        const resp = await Database.Instance.Query<string[]>(query);
        return resp;
    }

    public async Delete(previews: Array<ITiendaModel> | ITiendaModel) {
        if (Array.isArray(previews)) { }
        else {
            let query = `DELETE FROM tienda WHERE id_tienda = ${previews.id_tienda}`
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
    public async Update(previews: Array<ITiendaModel> | ITiendaModel) {
        if (Array.isArray(previews)) {
            previews.map(data => {
                let query = `UPDATE tienda SET nombre = '${data.nombre}', direccion = '${data.direccion}' 
            WHERE id_tienda = ${data.id_tienda};`;
                if (environments.logging) {
                    console.log('>>>', colors.yellow(query));
                }
            });
        } else {
            let query = `UPDATE tienda SET nombre = '${previews.nombre}', direccion = '${previews.direccion}' 
            WHERE id_tienda = ${previews.id_tienda};`
            if (environments.logging) {
                console.log(colors.yellow(query));
            }
            return await Database.Instance.Query(query);
        }
    }

    public async Create(previews: Array<ITienda> | ITienda) {
        if (Array.isArray(previews)) {
            let query = `INSERT INTO tienda (nombre, direccion) VALUES`;
            let queryValues = previews.map(pre => `(${pre.nombre},${pre.direccion})`);
            query += queryValues;
            if (environments.logging) {
                console.log(colors.yellow(query));
            }
        }
        else {
            let query = `INSERT INTO tienda (nombre, direccion) VALUES ('${previews.nombre}','${previews.direccion}')`;
            if (environments.logging) {
                console.log(colors.yellow(query));
            }
            return await Database.Instance.Query(query);
        }

    }

    public toString(): string {
        return this.id_tienda + this.nombre + this.direccion;
    }
}