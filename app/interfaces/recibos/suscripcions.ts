export interface Suscripcion{
    id: number;
    id_empresa?: number;
    nombre_servicio: string;
    fecha_inicio: string;
    fecha_vencimiento: string;
    pagado: number;
    tipo: number;
    metodo_pago: string;
    recurrencia: string;
    
}