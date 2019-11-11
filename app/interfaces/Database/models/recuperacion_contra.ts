export interface RecuperacionContra {
    id?: number;
    fecha_peticion: string;
    fecha_limite: string;
    token_acceso: string;
    activo: number;
}

export interface AdminRecuperacion {
    id_admin: number;
    id_recuperacion: number;
}

export interface RecuperacionModel {
    CreateAdminRelation: Function;
    CreateAdminTicket: Function;
    SetAdminTicket: Function;
}