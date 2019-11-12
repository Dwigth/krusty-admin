"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_controller_1 = require("../../controllers/auth/auth.controller");
var mail_controller_1 = require("../../controllers/general/mail.controller");
var admin_controller_1 = require("../../controllers/models/admin.controller");
var recuperacion_controller_1 = require("../../controllers/models/recuperacion.controller");
var moment_1 = __importDefault(require("moment"));
function Login(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var credentials, authctl, login;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    credentials = req.body;
                    authctl = new auth_controller_1.AuthController(credentials);
                    return [4 /*yield*/, authctl.login()];
                case 1:
                    login = _a.sent();
                    if (login.valid) {
                        delete login.user.contrasena;
                        // Render redireccionamiento
                        res.render('redireccion', { user: JSON.stringify(login.user) });
                        // Redireccionar a home
                        // res.redirect('home');
                    }
                    else {
                        res.render('login', {
                            title: 'Login',
                            error: !login.valid
                        });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.Login = Login;
function Redirect(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
exports.Redirect = Redirect;
/**
 * [GET]
 * Este middleware envía al usuario a la pagina para enviar correo
 * @param req
 * @param res
 */
function ForgotPassword(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.render('forgot-password', { title: 'Recuperar contraseña' });
            return [2 /*return*/];
        });
    });
}
exports.ForgotPassword = ForgotPassword;
/**
 * [POST]
 * Este middleware envia el correo
 * @param req
 * @param res
 */
function ForgotPasswordProcess(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var options, nmi, authCtl, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = {
                        receiver: req.body.email
                    };
                    nmi = new mail_controller_1.MailController();
                    authCtl = new auth_controller_1.AuthController();
                    return [4 /*yield*/, authCtl.forgotPassword(options.receiver)];
                case 1:
                    token = _a.sent();
                    // // Enviar correo
                    // let info = await nmi.SendResetPasswordEmail(token, options.receiver);
                    res.render('forgot-password', {
                        title: 'Recuperar contraseña',
                        msg: '¡Listo! Se te ha enviado un correo a tu dirección.'
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.ForgotPasswordProcess = ForgotPasswordProcess;
/**
 * [GET]
 * Renderiza la pagina para reestablecer la cotraseña, tambien verifica que
 * no haya expirado el link
 * @param req
 * @param res
 */
function RestorePasswordPage(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var token, adminCtl, recuperacionCtl, recuperacionTicket, timestamp, limite, peticion, canPass, adminRecup, adminUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = req.params.token;
                    adminCtl = new admin_controller_1.AdminController();
                    recuperacionCtl = new recuperacion_controller_1.RecuperacionController();
                    return [4 /*yield*/, recuperacionCtl.SearchRecuperacionByParam('token_acceso', token).then(function (resp) { return resp[0]; })];
                case 1:
                    recuperacionTicket = _a.sent();
                    timestamp = moment_1.default().format('YYYY-MM-DD HH:mm:ss');
                    limite = moment_1.default(recuperacionTicket.fecha_limite).utc().format('YYYY-MM-DD HH:mm:ss');
                    peticion = moment_1.default(recuperacionTicket.fecha_peticion).utc().format('YYYY-MM-DD HH:mm:ss');
                    canPass = moment_1.default(timestamp).isBetween(peticion, limite);
                    console.log(timestamp.red, peticion.green, limite.yellow, canPass);
                    if (recuperacionTicket == undefined) {
                        res.render('403', { title: 'Tiempo agotado' });
                        return [2 /*return*/];
                    }
                    if (recuperacionTicket.activo == 0) {
                        res.render('403', { title: 'Tiempo agotado' });
                        return [2 /*return*/];
                    }
                    if (!canPass) {
                        res.render('403', { title: 'Tiempo agotado' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, recuperacionCtl.SearchAdminRelation(recuperacionTicket.id)];
                case 2:
                    adminRecup = _a.sent();
                    return [4 /*yield*/, adminCtl.SearchAdminById(adminRecup.id_admin).then(function (resp) { return resp[0]; })];
                case 3:
                    adminUser = _a.sent();
                    //Obtener token para obtener foto de usuario
                    res.render('new-password', { user: adminUser, title: 'Reestablezca su contraseña', token: token });
                    return [2 /*return*/];
            }
        });
    });
}
exports.RestorePasswordPage = RestorePasswordPage;
/**
 * [POST]
 * Reestablece la contraseña
 * @param req
 * @param res
 */
function RestorePassword(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var token, password, nombre, recuperacionCtl, authCtl, recuperacionTicket, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = req.body.token;
                    password = req.body.password;
                    nombre = req.body.nombre;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    recuperacionCtl = new recuperacion_controller_1.RecuperacionController();
                    authCtl = new auth_controller_1.AuthController({ username: nombre, password: password });
                    return [4 /*yield*/, authCtl.changePassword()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, recuperacionCtl.SearchRecuperacionByParam('token_acceso', token).then(function (resp) { return resp[0]; })];
                case 3:
                    recuperacionTicket = _a.sent();
                    return [4 /*yield*/, recuperacionCtl.DeactivateTicketRecuperacion(recuperacionTicket.id)];
                case 4:
                    _a.sent();
                    res.render('success-password');
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _a.sent();
                    res.render('403');
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.RestorePassword = RestorePassword;
