"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var keys_admin_mw_1 = require("../../middlewares/home/keys-admin.mw");
var profile_mw_1 = require("../../middlewares/home/profile.mw");
exports.HomeRouter = express_1.default.Router();
exports.HomeRouter.get('/', function (req, res) {
    res.render('login', {
        title: 'Inicio de sesión'
    });
});
exports.HomeRouter.get('/home', keys_admin_mw_1.ShowKeys);
exports.HomeRouter.get('/profile/:token/:username', profile_mw_1.AdminUserProfile);
exports.HomeRouter.put('/profile/update', profile_mw_1.AdminUpdateProfile);
exports.HomeRouter.post('/create-keys', keys_admin_mw_1.CreateKeys);
