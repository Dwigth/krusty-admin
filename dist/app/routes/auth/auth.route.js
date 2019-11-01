"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var login_mw_1 = require("../../middlewares/auth/login.mw");
exports.AuthRouter = express_1.Router();
exports.AuthRouter.get('/login');
exports.AuthRouter.post('/login', login_mw_1.Login);
