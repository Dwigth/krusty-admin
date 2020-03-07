import { Server } from "./server/server";
import { SocketClass } from "./sockets/socket";
import { environments } from "../environments/enviroment";
import colors from "colors";

const myServer = Server.init();

myServer.start(() => {
  if (environments.logging) {
    console.log(
      colors.green(
        "Servicio corriendo desde el puerto: " + environments.PORT.toString()
      )
    );
  }

  const socketServer = new SocketClass(myServer.io);
});
