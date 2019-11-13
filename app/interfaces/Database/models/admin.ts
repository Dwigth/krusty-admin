export interface IAdminModel {
    id_admin: number;
    usuario: string;
    contrasena: string;
    token: string;
    activo: number;
}
export interface IAdmin {
    [key: string]: any;
    id_admin: number;
    usuario: string;
    contrasena: string;
    token: string;
    activo: number;
    img: string;
    nombre: string;
}