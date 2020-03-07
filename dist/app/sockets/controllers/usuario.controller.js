"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UsuarioController = /** @class */ (function () {
    function UsuarioController() {
        this.usuariosSocket = [];
    }
    UsuarioController.prototype.conectarUsuario = function (usuario) {
        //Buscamos el indice del usuario en la lista
        var indice = this.usuariosSocket.findIndex(function (item) { return item.nombre_usuario === usuario.nombre_usuario; });
        //Si el indice no existe, creamos el objeto dentro del array
        if (indice >= 0) {
            this.usuariosSocket[indice].conectado = true;
            this.usuariosSocket[indice].id_socket = usuario.id_socket;
        }
        else {
            usuario.conectado = true;
            this.usuariosSocket.push(usuario); //Si el indice ya existe, actualizamos el id de socket
        }
        console.log("usuario concectado:", usuario.nombre_usuario);
    };
    UsuarioController.prototype.desconectarUsuario = function (id_socket) {
        var usuario;
        //Buscamos el id de socket que se desconecto
        this.usuariosSocket.forEach(function (item) {
            if (item.id_socket === id_socket) {
                item.conectado = false; //Cambiamos la propiedad de socket a false
                usuario = item;
            }
        });
        if (usuario) {
            console.log("usuario desconectado:", usuario.nombre_usuario);
        }
    };
    UsuarioController.prototype.asignarConectados = function (servers) {
        var _this = this;
        servers.forEach(function (server) {
            _this.usuariosSocket.forEach(function (socketServer) {
                if (socketServer.nombre_usuario === server.nombreServer) {
                    if (socketServer.conectado) {
                        server.activo = 1;
                    }
                    else {
                        server.activo = 0;
                    }
                }
            });
        });
        return servers;
    };
    return UsuarioController;
}());
exports.UsuarioController = UsuarioController;
