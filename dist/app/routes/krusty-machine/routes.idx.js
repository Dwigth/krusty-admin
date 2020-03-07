"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var servers_1 = require("./servers");
var authAdmin_1 = require("./authAdmin");
exports.ServerRoutes = [
    servers_1.ServerRouter,
    authAdmin_1.LoginAdminRouter
];
