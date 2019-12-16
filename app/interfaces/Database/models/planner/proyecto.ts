import { ITareas, ILink } from "./tareas";

export interface IProyecto {
    // Tiene que ser el id de algún administrador
    id_creador: number;
    id?: number;
    fecha_inicio: string;
    fecha_termino: string;
    vista_actual: string;
    nombre: string;
    // Tareas
    tareas?: ITareas[];
    // Invitados
    invitados?: { id_admin: number, nombre: string, img: string }[];
    // Relaciones 
    links?: ILink[];
}