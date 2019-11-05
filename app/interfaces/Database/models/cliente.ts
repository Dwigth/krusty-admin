export interface IClienteModel {
    ID_USUARIO: string;
    nombre: string;
    apellidos: string;
    correo: string;
    contrasena: string;
    createdAt: string | Date;
    updatedAt: string | Date;
}
export interface IClientWithLicence {
    ID_USUARIO: string;
    nombre: string;
    apellidos: string;
    correo: string;
    key: string;
    ID_LICENCIA: string;
    createdAt: string;
}