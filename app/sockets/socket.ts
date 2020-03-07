import { UsuarioSocket } from "./models/usuario.model";
import { UsuarioController } from './controllers/usuario.controller';
import socket from "socket.io";

export const usuarioController = new UsuarioController();

export class SocketClass{
  
  constructor(
    public socket: socket.Server
  ){
    this.initSocket();
  }

  private initSocket(){
    console.log("init socket");
    
    // Usuario conectado
    this.socket.on("connection", (client: any) => {
      console.log("conection", client);
      
      client.on("usuariosConectar", (usuario: UsuarioSocket) => {
        //Asignar el id al usuario
        usuario.id_socket = client.id;
        usuarioController.conectarUsuario(usuario);
        //Cuanto alguien se conecta, emitimos los usuarios
        this.socket.emit("usuarios", usuarioController.usuariosSocket);

      });


      //SE ACTIVA CUANDO ALGUIEN SE DESCONECTA, LO BORRAMOS DEL CHAT
      client.on("disconnect", () => {
        usuarioController.desconectarUsuario(client.id);
        //Cuando alguien de desconecta, emitimos el evento
        this.socket.emit("usuarios", usuarioController.usuariosSocket);
      });

    });

  }


}
