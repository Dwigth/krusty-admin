"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var routes_idx_1 = require("./auth/routes.idx");
var routes_idx_2 = require("./home/routes.idx");
exports.routes = [];
exports.routes = exports.routes.concat(routes_idx_1.AuthRoutes, routes_idx_2.HomeRoutes);
