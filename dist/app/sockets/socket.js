"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var usuario_controller_1 = require("./controllers/usuario.controller");
exports.usuarioController = new usuario_controller_1.UsuarioController();
var SocketClass = /** @class */ (function () {
    function SocketClass(socket) {
        this.socket = socket;
        this.initSocket();
    }
    SocketClass.prototype.initSocket = function () {
        var _this = this;
        console.log("init socket");
        // Usuario conectado
        this.socket.on("connection", function (client) {
            console.log("conection", client);
            client.on("usuariosConectar", function (usuario) {
                //Asignar el id al usuario
                usuario.id_socket = client.id;
                exports.usuarioController.conectarUsuario(usuario);
                //Cuanto alguien se conecta, emitimos los usuarios
                _this.socket.emit("usuarios", exports.usuarioController.usuariosSocket);
            });
            //SE ACTIVA CUANDO ALGUIEN SE DESCONECTA, LO BORRAMOS DEL CHAT
            client.on("disconnect", function () {
                exports.usuarioController.desconectarUsuario(client.id);
                //Cuando alguien de desconecta, emitimos el evento
                _this.socket.emit("usuarios", exports.usuarioController.usuariosSocket);
            });
        });
    };
    return SocketClass;
}());
exports.SocketClass = SocketClass;
