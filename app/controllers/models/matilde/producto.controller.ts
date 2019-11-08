import { IProductoModel, IProducto } from "../../../interfaces/Database/models/producto";
import { IProductoImagen } from "../../../interfaces/Database/models/interno/imagen_producto";
import { ITiendaModel } from "../../../interfaces/Database/models/tienda";
import { Database } from "../../../db/Database";
import { environments } from "../../../../environments/enviroment";
import colors from 'colors';

export class ProductoController implements IProductoModel {
    id_metodo: number;
    id_principio: number;
    id_producto: number;
    id_tienda: number;
    imagenProducto: IProductoImagen;
    imagen: string;
    nombre: string;
    precio: number;
    presentacion: string;
    tienda: ITiendaModel;

    constructor() { }

    public async GetAll() {
        let query = `
        SELECT p.id_producto, p.nombre,p.precio, p.presentacion,
        m.nombre AS "Metodo",
        pr.nombre AS "Principio",
        t.nombre AS "Tienda"
        FROM producto p 
        INNER JOIN metodo m
        ON p.id_metodo = m.id_metodo
        INNER JOIN principio pr
        ON p.id_principio = pr.id_principio
        INNER JOIN tienda t
        ON p.id_tienda = t.id_tienda
        `;
        const resp = await Database.Instance.Query<IProducto[]>(query);
        return resp;
    }

    public async GetNames() {
        let query = `SELECT id_producto,nombre FROM producto`;
        const resp = await Database.Instance.Query<string[]>(query);
        return resp;
    }

    public async Create(previews: Array<IProducto> | IProducto) {
        if (Array.isArray(previews)) {
            let query = `INSERT INTO producto (nombre, direccion) VALUES`;
            let queryValues = previews.map(pre => `(${pre.nombre},${pre})`);
            query += queryValues;
            if (environments.logging) {
                console.log(colors.yellow(query));
            }
        }
        else {
            let query = `INSERT INTO producto 
            (id_producto, imagen, nombre, precio, presentacion, id_metodo, id_principio, id_tienda) 
            VALUES ( NULL, NULL, '${previews.nombre}','${previews.precio}','${previews.presentacion}','${previews.id_metodo}','${previews.id_principio}','${previews.id_tienda}')`;
            if (environments.logging) {
                console.log(colors.yellow(query));
            }
            return await Database.Instance.Query(query);
        }
    }

    public async Delete(previews: Array<IProducto> | IProducto) {
        if (Array.isArray(previews)) { }
        else {
            let query = `DELETE FROM producto WHERE id_producto = ${previews.id_producto}`
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
    public async Update(previews: Array<IProducto> | IProducto) {
        if (Array.isArray(previews)) {
            previews.map(data => {
                let query = `UPDATE producto SET nombre=[value-3],precio=[value-4],presentacion=[value-5],id_metodo=[value-6],id_principio=[value-7],id_tienda=[value-8] WHERE 1`;
                if (environments.logging) {
                    console.log('>>>', colors.yellow(query));
                }
            });
        } else {
            let query = `UPDATE producto SET 
            nombre='${previews.nombre}',
            precio='${previews.precio}',
            presentacion='${previews.presentacion}',
            id_metodo='${previews.id_metodo}',
            id_principio='${previews.id_principio}',
            id_tienda='${previews.id_tienda}' WHERE id_producto = ${previews.id_producto}`;
            if (environments.logging) {
                console.log(colors.yellow(query));
            }
            return await Database.Instance.Query(query);
        }
    }

}