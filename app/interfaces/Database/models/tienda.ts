export interface ITiendaModel {
    //Propiedades
    nombre: string;
    id_tienda: number;
    direccion: string;
    // Metodos
    GetAll: Function;
    Update: Function;
    Create: Function;
}
export interface ITienda {
    //Propiedades
    nombre: string;
    id_tienda: number;
    direccion: string;
}