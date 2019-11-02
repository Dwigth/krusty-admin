"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var keys_admin_mw_1 = require("../../middlewares/home/keys-admin.mw");
exports.HomeRouter = express_1.default.Router();
exports.HomeRouter.get('/home', keys_admin_mw_1.ShowKeys);
exports.HomeRouter.post('/create-keys', keys_admin_mw_1.CreateKeys);
