export interface INotification {
    getId(): number;
    getCve_usuario(): number;
    getTitulo(): string;
    getSubtitulo(): string;
    getMensaje(): string;
    getImg(): string;
    getVisto(): number;
    getUrl(): string;
    getFecha_creacion(): string;
    getFecha_visto(): string;
    getFecha_inicio(): string;
    getCve_elemento(): number;
    getModulo(): string;
    getTipo(): string;

    setId(data: number): void;
    setCve_usuario(data: number): void;
    setTitulo(data: string): void;
    setSubtitulo(data: string): void;
    setMensaje(data: string): void;
    setImg(data: string): void;
    setVisto(data: number): void;
    setUrl(data: string): void;
    setFecha_creacion(data: string): void;
    setFecha_visto(data: string): void;
    setFecha_inicio(data: string): void;
    setCve_elemento(data: number): void;
    setModulo(data: string): void;
    setTipo(data: string): void;
}