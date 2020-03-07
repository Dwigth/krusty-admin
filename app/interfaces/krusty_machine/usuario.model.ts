export interface UsuarioAdmin {
  id_admin: number;
  usuario: string;
  token: string;
  activo: number;
  nombre: string;
  img: string;
  email: string;
  contrasena?: string;
}
