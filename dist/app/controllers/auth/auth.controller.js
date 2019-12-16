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
var admin_controller_1 = require("../models/admin.controller");
var bcrypt_1 = require("bcrypt");
var recuperacion_controller_1 = require("../models/recuperacion.controller");
var crypto_1 = __importDefault(require("crypto"));
var AuthController = /** @class */ (function () {
    function AuthController(credentials) {
        this.hash = crypto_1.default.createHash('sha256');
        this.saltRounds = 15;
        this.credentials = credentials;
    }
    AuthController.prototype.SetCredential = function (credential) {
        this.credentials = credential;
    };
    /**
     * @description Obtiene los datos del usuario si al comparar su contraseña con el hash retorna un resultado válido.
     */
    AuthController.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var adminctl;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        adminctl = new admin_controller_1.AdminController();
                        return [4 /*yield*/, adminctl.SearchAdminByParam('nombre', this.credentials.username)
                                .then(function (admins) { return __awaiter(_this, void 0, void 0, function () {
                                var admin, valid, TokenUpdated;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            admin = admins[0];
                                            return [4 /*yield*/, bcrypt_1.compare(this.credentials.password, admin.contrasena)];
                                        case 1:
                                            valid = _a.sent();
                                            if (!valid) return [3 /*break*/, 3];
                                            TokenUpdated = this.hash.update(Date.now().toString()).digest('hex');
                                            adminctl.token = TokenUpdated;
                                            admin.token = TokenUpdated;
                                            adminctl.id_admin = admin.id_admin;
                                            return [4 /*yield*/, adminctl.UpdateToken()];
                                        case 2:
                                            _a.sent();
                                            _a.label = 3;
                                        case 3: return [2 /*return*/, { valid: valid, user: admin }];
                                    }
                                });
                            }); })
                                .catch(function (e) { return e; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthController.prototype.register = function () { };
    /**
     * Cambia el hash de la contraseña de administrador
     * @param id_admin
     */
    AuthController.prototype.changePassword = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newHash, admCtl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt_1.hash(this.credentials.password, this.saltRounds)];
                    case 1:
                        newHash = _a.sent();
                        admCtl = new admin_controller_1.AdminController();
                        admCtl.contrasena = newHash;
                        admCtl.nombre = this.credentials.username;
                        return [4 /*yield*/, admCtl.UpdateAdminPassword()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Proceso el cual consiste en crear un ticket de procesamiento para cambio de contraseña
     * estableciendo los puntos de partida para hacer la accion de restauración y su limite de tiempo.
     * @returns {string} token
     */
    AuthController.prototype.forgotPassword = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var adminCtl, adminUser, initialDate, limiteDate, recuperacion, recupctl, ticketRecuperacion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        adminCtl = new admin_controller_1.AdminController();
                        return [4 /*yield*/, adminCtl.SearchAdminByParam('email', email)];
                    case 1:
                        adminUser = _a.sent();
                        if (!(adminUser.length !== 0)) return [3 /*break*/, 3];
                        initialDate = new Date();
                        limiteDate = new Date(initialDate.getFullYear(), initialDate.getMonth(), initialDate.getDate(), initialDate.getHours(), initialDate.getMinutes(), initialDate.getSeconds() + 300);
                        recuperacion = {
                            activo: 1,
                            fecha_peticion: initialDate.toISOString(),
                            fecha_limite: limiteDate.toISOString(),
                            token_acceso: this.hash.update(Date.now().toString()).digest('hex')
                        };
                        recupctl = new recuperacion_controller_1.RecuperacionController();
                        recupctl.SetAdminTicket(recuperacion);
                        return [4 /*yield*/, recupctl.CreateAdminTicket().catch()];
                    case 2:
                        ticketRecuperacion = _a.sent();
                        recupctl.CreateAdminRelation({ id_admin: adminUser[0].id_admin, id_recuperacion: ticketRecuperacion.id }).catch();
                        return [2 /*return*/, ticketRecuperacion.token_acceso];
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     *
     * @param password Hash de la contraseña del usuario
     */
    AuthController.prototype.ValidatePassword = function (password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt_1.compare(this.credentials.password, password)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @description Cambia el estado del usuario a desactivado
     */
    AuthController.prototype.DisableUser = function (id_admin) {
        return __awaiter(this, void 0, void 0, function () {
            var adminctl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        adminctl = new admin_controller_1.AdminController();
                        adminctl.Instance = { id_admin: id_admin, activo: 0 };
                        return [4 /*yield*/, adminctl.DisableAdmin()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Contraseña por default
     */
    AuthController.prototype.DefaultPassword = function () {
        return __awaiter(this, void 0, void 0, function () {
            var phrase;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        phrase = '1234a';
                        return [4 /*yield*/, bcrypt_1.hash(phrase, this.saltRounds)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return AuthController;
}());
exports.AuthController = AuthController;
