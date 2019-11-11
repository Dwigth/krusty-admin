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
exports.MatildeRouter.get('/matilde-catalogs', matilde_mw_1.MatildeCatalogs);
exports.MatildeRouter.post('/matilde-catalogs/:action/:table', matilde_mw_1.MatildeCatalogsHandler);
exports.MatildeRouter.get('/matilde-catalogs-names', matilde_mw_1.MatildeCatalogsNames);
exports.MatildeRouter.get('/matilde-codes/:selected', matilde_mw_1.MatildeCode);
