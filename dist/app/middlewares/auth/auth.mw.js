"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var util_1 = require("util");
var AuthCtl = new auth_controller_1.AuthController();
var AdminCtl = new admin_controller_1.AdminController();
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
                        res.cookie('id_admin', login.user.id_admin);
                        delete login.user.contrasena;
                        if (login.user.usuario == 'super_administrador') {
                            console.log('<==============>');
                            res.cookie('isAdmin', true);
                        }
                        else {
                            res.cookie('isAdmin', false);
                        }
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
        var options, nmi, authCtl, token, info;
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
                    if (!util_1.isString(token)) return [3 /*break*/, 3];
                    return [4 /*yield*/, nmi.SendResetPasswordEmail(token, options.receiver)];
                case 2:
                    info = _a.sent();
                    res.render('forgot-password', {
                        title: 'Recuperar contraseña',
                        msg: '¡Listo! Se te ha enviado un correo a tu dirección.'
                    });
                    return [3 /*break*/, 4];
                case 3:
                    res.render('forgot-password', {
                        title: 'Recuperar contraseña',
                        msg: 'Esta dirección de correo electrónico no se encuentra registrada.'
                    });
                    _a.label = 4;
                case 4: return [2 /*return*/];
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
/**
 * @requires id_admin
 * @param req
 * @param res
 */
function GetAdministrators(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var token, id_admin, adminCtl, Admins;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = req.body.token;
                    id_admin = req.body.id_admin;
                    adminCtl = new admin_controller_1.AdminController();
                    adminCtl.id_admin = +id_admin;
                    return [4 /*yield*/, adminCtl.GetAdmins()];
                case 1:
                    Admins = _a.sent();
                    res.json({ Admins: Admins });
                    return [2 /*return*/];
            }
        });
    });
}
exports.GetAdministrators = GetAdministrators;
function changePasswordPage(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.render('change-password');
            return [2 /*return*/];
        });
    });
}
exports.changePasswordPage = changePasswordPage;
function changePassword(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var passwords, credentials, authctl, adminctl, admin, msg, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    passwords = req.body;
                    credentials = { password: passwords["previous-password"] };
                    authctl = new auth_controller_1.AuthController(credentials);
                    adminctl = new admin_controller_1.AdminController();
                    return [4 /*yield*/, adminctl.SearchAdminByParam('token', passwords.token).then(function (r) { return r[0]; })];
                case 1:
                    admin = _a.sent();
                    msg = 'Exito al cambiar la contraseña';
                    response = 'success';
                    return [4 /*yield*/, authctl.ValidatePassword(admin.contrasena)];
                case 2:
                    if (!_a.sent()) return [3 /*break*/, 4];
                    authctl.SetCredential({ username: admin.nombre, password: passwords["new-password"] });
                    return [4 /*yield*/, authctl.changePassword()];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    msg = 'La contraseña previa no coincide';
                    response = 'danger';
                    _a.label = 5;
                case 5:
                    res.render('change-password', { msg: { text: msg, response: response } });
                    return [2 /*return*/];
            }
        });
    });
}
exports.changePassword = changePassword;
function DisableUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id_admin, user, action;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(req.body);
                    id_admin = req.body.id_admin;
                    return [4 /*yield*/, AdminCtl.SearchAdminById(id_admin).then(function (r) { return r[0]; })];
                case 1:
                    user = _a.sent();
                    if (user.usuario == 'super_administrador') {
                        res.json({ msg: 'No puedes borrar a este usuario.' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, AuthCtl.DisableUser(id_admin)];
                case 2:
                    action = _a.sent();
                    res.json({ msg: 'Se ha borrado al usuario.' });
                    return [2 /*return*/];
            }
        });
    });
}
exports.DisableUser = DisableUser;
function CreateUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var Admin, _a, profile, resps;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    Admin = req.body;
                    Admin.activo = 1;
                    _a = Admin;
                    return [4 /*yield*/, AuthCtl.DefaultPassword()];
                case 1:
                    _a.contrasena = _b.sent();
                    Admin.token = '';
                    Admin.img = '/admin-template/krusty-lab/images/matilde-logo.png';
                    profile = {
                        apellidos: '',
                        bio: '',
                        direccion: '',
                        fb_profile: '',
                        id_admin: 0,
                        nombre: '',
                        number: '',
                        portada_img: '',
                        twt_profile: ''
                    };
                    AdminCtl.Instance = Admin;
                    AdminCtl.ProfileInstance = profile;
                    return [4 /*yield*/, AdminCtl.CreateAdmin()];
                case 2:
                    resps = _b.sent();
                    console.log(resps);
                    res.redirect('back');
                    return [2 /*return*/];
            }
        });
    });
}
exports.CreateUser = CreateUser;
function GetAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var authctl, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    authctl = new auth_controller_1.AuthController();
                    _b = (_a = res).json;
                    return [4 /*yield*/, authctl.GetAdminByID(req.body.id)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
exports.GetAdmin = GetAdmin;
