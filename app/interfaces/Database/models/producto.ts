import { ITienda } from "./tienda";
import { IProductoImagen } from "./interno/imagen_producto";

export interface IProductoFirebaseModel {
    id_producto: number;
    nombre: string;
    precio: number;
    principio_activo: string;
    id_principio: number;
    id_tienda: number;
    id_metodo: number;
    imagen: string;
}
export interface IProductoModel {
    id_metodo: number,
    id_principio: number,
    id_producto: number,
    id_tienda: number,
    imagenProducto: IProductoImagen;
    imagen: string;
    nombre: string,
    precio: number,
    presentacion: string,
    tienda: ITienda;
}
export interface IProducto {
    id_metodo: number,
    id_principio: number,
    id_producto: number,
    id_tienda: number,
    imagenProducto: IProductoImagen;
    imagen: string;
    nombre: string,
    precio: number,
    presentacion: string,
    tienda: ITienda;
}