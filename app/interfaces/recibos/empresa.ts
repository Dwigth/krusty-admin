import { Suscripcion } from "./suscripcions";


export interface Empresa{
    id?: number;
    nombreEmpresa?: string;
    usuario?: string;
    password?: string;
    fecha_registro?: string;
    token?: string;
    suscripciones?: Array<Suscripcion>
}