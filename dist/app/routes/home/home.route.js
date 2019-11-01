"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
exports.HomeRouter = express_1.default.Router();
exports.HomeRouter.get('/login', function (req, res) {
    res.render('login', {
        title: 'Inicio de sesión'
    });
});
