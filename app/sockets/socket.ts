import { UsuarioSocket } from "./models/usuario.model";
import { UsuarioController } from './controllers/usuario.controller';
import socket from "socket.io";

export const usuarioController = new UsuarioController();

export class SocketClass{

  public io: socket.Server;
  constructor(
    public socket: socket.Server
  ){
    this.io = socket;
  }

  public initSocket(){
    // console.log("init socket", io);
    
    // Usuario conectado
    this.io.on("connection", (client: any) => {
      // console.log("conection", client);
      
      client.on("usuariosConectar", (usuario: UsuarioSocket) => {
        //Asignar el id al usuario
        usuario.id_socket = client.id;
        usuarioController.conectarUsuario(usuario);
        //Cuanto alguien se conecta, emitimos los usuarios
        this.io.emit("usuarios", usuarioController.usuariosSocket);
      });


      //SE ACTIVA CUANDO ALGUIEN SE DESCONECTA, LO BORRAMOS DEL CHAT
      client.on("disconnect", () => {
        usuarioController.desconectarUsuario(client.id);
        //Cuando alguien de desconecta, emitimos el evento
        this.io.emit("usuarios", usuarioController.usuariosSocket);
      });

    });

  }


  public emitirReinicio(nombreServidor: string) {
    this.io.emit("reiniciar" + nombreServidor);
  }

  public emitirApagado(nombreServidor: string) {
    this.io.emit("apagar" + nombreServidor);
  }

}
