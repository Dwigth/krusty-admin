"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var matilde_mw_1 = require("../../middlewares/home/matilde.mw");
var keys_admin_mw_1 = require("../../middlewares/home/keys-admin.mw");
exports.MatildeRouter = express_1.default.Router();
exports.MatildeRouter.get('/matilde-clients', matilde_mw_1.MatildeClients);
exports.MatildeRouter.get('/matilde-keys', keys_admin_mw_1.ShowKeys);
