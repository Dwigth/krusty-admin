import { UsuarioSocket } from '../models/usuario.model';
import { Database } from '../../db/Database';
//Modelo de servidores
import { ServerModel } from '../../interfaces/krusty_machine/server.model';

export class UsuarioController {
    usuariosSocket: Array<UsuarioSocket> = [];

    constructor(){

    }

    public conectarUsuario(usuario: UsuarioSocket){
        //Buscamos el indice del usuario en la lista
        let indice = this.usuariosSocket.findIndex(item => item.nombre_usuario === usuario.nombre_usuario);
        
        //Si el indice no existe, creamos el objeto dentro del array
        if(indice >= 0){
            this.usuariosSocket[indice].conectado = true;
            this.usuariosSocket[indice].id_socket = usuario.id_socket;

        }else{
            usuario.conectado = true;
            this.usuariosSocket.push(usuario); //Si el indice ya existe, actualizamos el id de socket
        }

        console.log("usuario concectado:", usuario.nombre_usuario);
        
    }

    public desconectarUsuario(id_socket: string){
        let usuario: UsuarioSocket;
        //Buscamos el id de socket que se desconecto
        this.usuariosSocket.forEach(item => {
            if(item.id_socket === id_socket){
                item.conectado = false; //Cambiamos la propiedad de socket a false
                usuario = item;
            }
        });

        if(usuario){
            console.log("usuario desconectado:", usuario.nombre_usuario);
        }
        
    }

    public asignarConectados(servers: ServerModel[]): Array<ServerModel>{
    
        servers.forEach((server: ServerModel) => {
            this.usuariosSocket.forEach(socketServer => {
                if(socketServer.nombre_usuario === server.nombreServer){
                    
                    if(socketServer.conectado){
                        server.activo = 1;                        
                    }else{
                        server.activo = 0;
                    }
                }
            });
        });


        return servers;
    }
}