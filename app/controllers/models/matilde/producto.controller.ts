import { IProductoModel } from "../../../interfaces/Database/models/producto";
import { IProductoImagen } from "../../../interfaces/Database/models/interno/imagen_producto";
import { ITiendaModel } from "../../../interfaces/Database/models/tienda";
import { Database } from "../../../db/Database";

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
        SELECT p.ID_PRODUCTO, p.nombre,p.precio, p.presentacion,
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
        const resp = await Database.Instance.Query<IProductoModel[]>(query);
        return resp;
    }

    public async CreateProduct() {

    }
}