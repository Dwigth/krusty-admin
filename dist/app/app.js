"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server/server");
var socket_1 = require("./sockets/socket");
var enviroment_1 = require("../environments/enviroment");
var colors_1 = __importDefault(require("colors"));
var myServer = server_1.Server.init();
myServer.start(function () {
    if (enviroment_1.environments.logging) {
        console.log(colors_1.default.green("Servicio corriendo desde el puerto: " + enviroment_1.environments.PORT.toString()));
    }
    var socketServer = new socket_1.SocketClass(myServer.io).initSocket();
});
