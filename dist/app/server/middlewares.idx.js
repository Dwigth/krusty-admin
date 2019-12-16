"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var request_ip_1 = __importDefault(require("request-ip"));
var compression_1 = __importDefault(require("compression"));
var express_session_1 = __importDefault(require("express-session"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var express_1 = require("express");
var enviroment_1 = require("../../environments/enviroment");
exports.MIDDLEWARES = [
    cors_1.default(),
    helmet_1.default(),
    express_1.json({ limit: '50mb' }),
    express_1.urlencoded({ limit: '50mb' }),
    request_ip_1.default.mw(),
    compression_1.default(),
    express_session_1.default({
        secret: enviroment_1.environments.Session.Secret,
        cookie: {
            maxAge: new Date(Date.now() + enviroment_1.environments.Session.expires).getMilliseconds(),
            expires: new Date(Date.now() + enviroment_1.environments.Session.expires),
        }
    }),
    cookie_parser_1.default(),
];
