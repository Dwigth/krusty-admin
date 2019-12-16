"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_mw_1 = require("../../middlewares/auth/auth.mw");
exports.AuthRouter = express_1.Router();
exports.AuthRouter.get('/login', function (req, res) {
    res.render('login', {
        title: 'Inicio de sesión'
    });
});
exports.AuthRouter.post('/login', auth_mw_1.Login);
exports.AuthRouter.get('/forgot-password', auth_mw_1.ForgotPassword);
exports.AuthRouter.post('/forgot-password', auth_mw_1.ForgotPasswordProcess);
exports.AuthRouter.get('/new-password/:token', auth_mw_1.RestorePasswordPage);
exports.AuthRouter.post('/new-password/', auth_mw_1.RestorePassword);
exports.AuthRouter.get('/redirect', auth_mw_1.Redirect);
exports.AuthRouter.get('/change-password', auth_mw_1.changePasswordPage);
exports.AuthRouter.post('/change-password', auth_mw_1.changePassword);
exports.AuthRouter.post('/disable-user', auth_mw_1.DisableUser);
