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
Object.defineProperty(exports, "__esModule", { value: true });
var admin_controller_1 = require("../../controllers/models/admin.controller");
var admin_profile_controller_1 = require("../../controllers/models/admin_profile.controller");
/**
 * [GET]
 * @todo Pendiente documentación
 */
function AdminUserProfile(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var username, token, adminCtl, adminUser, adminProfileObj, adminProfileCtl, AdminProfileData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = req.params.username;
                    token = req.params.token;
                    adminCtl = new admin_controller_1.AdminController();
                    return [4 /*yield*/, adminCtl.SearchAdminByParam('usuario', username).then(function (resp) { return resp[0]; })];
                case 1:
                    adminUser = _a.sent();
                    adminUser.guest = false;
                    if (token !== adminUser.token) {
                        adminUser.guest = true;
                        console.log('Solo carga la vista');
                    }
                    delete adminUser.contrasena;
                    adminProfileObj = { id_admin: adminUser.id_admin };
                    adminProfileCtl = new admin_profile_controller_1.AdminProfileController(adminProfileObj);
                    return [4 /*yield*/, adminProfileCtl.GetByAdminId()];
                case 2:
                    AdminProfileData = _a.sent();
                    adminUser.data = AdminProfileData;
                    res.render('profile', { adminUser: adminUser });
                    return [2 /*return*/];
            }
        });
    });
}
exports.AdminUserProfile = AdminUserProfile;
/**
 * [PUT]
 * @description Actualiza los datos del perfil de administrador
 * @param req
 * @param res
 */
function AdminUpdateProfile(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var incomingData, adminCtl, adminProfileCtl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    incomingData = req.body;
                    console.log(incomingData);
                    adminCtl = new admin_controller_1.AdminController();
                    adminCtl.id_admin = incomingData.id_admin;
                    adminCtl.email = incomingData.email;
                    adminCtl.nombre = incomingData.usuario;
                    return [4 /*yield*/, adminCtl.UpdateAdminName()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, adminCtl.UpdateAdminEmail()];
                case 2:
                    _a.sent();
                    adminProfileCtl = new admin_profile_controller_1.AdminProfileController(incomingData);
                    return [4 /*yield*/, adminProfileCtl.Update()];
                case 3:
                    _a.sent();
                    res.json({ msg: 'Su perfil ha sido actualizado' });
                    return [2 /*return*/];
            }
        });
    });
}
exports.AdminUpdateProfile = AdminUpdateProfile;
