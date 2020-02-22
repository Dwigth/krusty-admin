import { INotification } from "../interfaces/classes/notification";

export class Notification implements INotification {
    private id: number;
    private cve_usuario: number;
    private titulo: string;
    private subtitulo: string;
    private mensaje: string;
    private img: string;
    private visto: number;
    private url: string;
    private fecha_creacion: string;
    private fecha_visto: string;
    private fecha_inicio: string;
    private cve_elemento: number;
    private modulo: string;
    private tipo: string;

    constructor(
        cve_usuario: number,
        titulo: string,
        subtitulo: string,
        mensaje: string,
        img: string,
        visto: number,
        url: string,
        fecha_creacion: string,
        fecha_visto: string,
        fecha_inicio: string,
        cve_elemento: number,
        modulo: string,
        tipo: string,
        id?: number
    ) {
        this.id = id;
        this.cve_usuario = cve_usuario;
        this.titulo = titulo;
        this.subtitulo = subtitulo;
        this.mensaje = mensaje;
        this.img = img;
        this.visto = visto;
        this.url = url;
        this.fecha_creacion = fecha_creacion;
        this.fecha_visto = fecha_visto;
        this.fecha_inicio = fecha_inicio;
        this.cve_elemento = cve_elemento;
        this.modulo = modulo;
        this.tipo = tipo;
    }

    getId(): number { return this.id; }
    getCve_usuario(): number { return this.cve_usuario; }
    getTitulo(): string { return this.titulo; }
    getSubtitulo(): string { return this.subtitulo; }
    getMensaje(): string { return this.mensaje; }
    getImg(): string { return this.img; }
    getVisto(): number { return this.visto; }
    getUrl(): string { return this.url; }
    getFecha_creacion(): string { return this.fecha_creacion; }
    getFecha_visto(): string { return this.fecha_visto; }
    getFecha_inicio(): string { return this.fecha_inicio; }
    getCve_elemento(): number { return this.cve_elemento; }
    getModulo(): string { return this.modulo; }
    getTipo(): string { return this.tipo; }

    setId(data: number): void { this.id = data; }
    setCve_usuario(data: number): void { this.cve_usuario = data; }
    setTitulo(data: string): void { this.titulo = data; }
    setSubtitulo(data: string): void { this.subtitulo = data; }
    setMensaje(data: string): void { this.mensaje = data; }
    setImg(data: string): void { this.img = data; }
    setVisto(data: number): void { this.visto = data; }
    setUrl(data: string): void { this.url = data; }
    setFecha_creacion(data: string): void { this.fecha_creacion = data; }
    setFecha_visto(data: string): void { this.fecha_visto = data; }
    setFecha_inicio(data: string): void { this.fecha_inicio = data; }
    setCve_elemento(data: number): void { this.cve_elemento = data; }
    setModulo(data: string): void { this.modulo = data; }
    setTipo(data: string): void { this.tipo = data; }

}