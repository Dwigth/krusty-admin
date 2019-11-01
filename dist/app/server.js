"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Database_1 = require("./db/Database");
/**
 * =====================
 *
 * Variable globales
 *
 * =====================
 */
var Server = /** @class */ (function () {
    function Server() {
        var DB = new Database_1.Database();
    }
    return Server;
}());
var myServer = new Server();
