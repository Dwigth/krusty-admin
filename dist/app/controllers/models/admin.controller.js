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
Object.defineProperty(exports, "__esModule", { value: true });
var Database_1 = require("../../db/Database");
var AdminController = /** @class */ (function () {
    function AdminController() {
    }
    Object.defineProperty(AdminController.prototype, "Instance", {
        set: function (ins) {
            this.Admin = ins;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdminController.prototype, "ProfileInstance", {
        set: function (pins) {
            this.Profile = pins;
        },
        enumerable: true,
        configurable: true
    });
    AdminController.prototype.Update = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "UPDATE admin SET ? WHERE id_admin = " + this.Admin.id_admin;
                        return [4 /*yield*/, Database_1.Database.Instance.Query(sql, this.Admin)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AdminController.prototype.GetAdmins = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, resultado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "SELECT A.id_admin, A.usuario, A.img, A.nombre FROM admin A WHERE A.id_admin != " + this.id_admin + " AND A.activo = 1";
                        return [4 /*yield*/, Database_1.Database.Instance.Query(query)];
                    case 1:
                        resultado = _a.sent();
                        return [2 /*return*/, resultado];
                }
            });
        });
    };
    /**
     *
     * @param id_admin
     */
    AdminController.prototype.SearchAdminById = function (id_admin) {
        return __awaiter(this, void 0, void 0, function () {
            var query, resultado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "SELECT id_admin,usuario,img,nombre FROM admin WHERE id_admin = " + id_admin;
                        return [4 /*yield*/, Database_1.Database.Instance.Query(query)];
                    case 1:
                        resultado = _a.sent();
                        return [2 /*return*/, resultado];
                }
            });
        });
    };
    /**
     * @todo extender uso
     * @param usuario
     */
    AdminController.prototype.SearchAdminByParam = function (param, value) {
        return __awaiter(this, void 0, void 0, function () {
            var query, resultado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "SELECT * FROM admin WHERE " + param + " = '" + value + "'";
                        return [4 /*yield*/, Database_1.Database.Instance.Query(query)];
                    case 1:
                        resultado = _a.sent();
                        return [2 /*return*/, resultado];
                }
            });
        });
    };
    AdminController.prototype.UpdateAdminPassword = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, resultado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "UPDATE admin SET contrasena = '" + this.contrasena + "' WHERE admin.nombre = '" + this.nombre + "'";
                        return [4 /*yield*/, Database_1.Database.Instance.Query(query)];
                    case 1:
                        resultado = _a.sent();
                        return [2 /*return*/, resultado];
                }
            });
        });
    };
    AdminController.prototype.UpdateToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, resultado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "UPDATE admin SET token = '" + this.token + "' WHERE admin.id_admin = '" + this.id_admin + "'";
                        return [4 /*yield*/, Database_1.Database.Instance.Query(query)];
                    case 1:
                        resultado = _a.sent();
                        return [2 /*return*/, resultado];
                }
            });
        });
    };
    AdminController.prototype.UpdateAdminName = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, resultado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "UPDATE admin SET nombre = '" + this.nombre + "' WHERE admin.id_admin = '" + this.id_admin + "'";
                        return [4 /*yield*/, Database_1.Database.Instance.Query(query)];
                    case 1:
                        resultado = _a.sent();
                        return [2 /*return*/, resultado];
                }
            });
        });
    };
    AdminController.prototype.UpdateAdminEmail = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, resultado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "UPDATE admin SET email = '" + this.email + "' WHERE admin.id_admin = '" + this.id_admin + "'";
                        return [4 /*yield*/, Database_1.Database.Instance.Query(query)];
                    case 1:
                        resultado = _a.sent();
                        return [2 /*return*/, resultado];
                }
            });
        });
    };
    AdminController.prototype.UpdateAdminImg = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, resultado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "UPDATE admin SET img = '" + this.img + "' WHERE admin.id_admin = '" + this.id_admin + "'";
                        return [4 /*yield*/, Database_1.Database.Instance.Query(query)];
                    case 1:
                        resultado = _a.sent();
                        return [2 /*return*/, resultado];
                }
            });
        });
    };
    AdminController.prototype.DisableAdmin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "UPDATE admin SET activo = 0 WHERE id_admin = " + this.Admin.id_admin;
                        return [4 /*yield*/, Database_1.Database.Instance.Query(sql)];
                    case 1:
                        query = _a.sent();
                        return [2 /*return*/, query];
                }
            });
        });
    };
    AdminController.prototype.CreateAdmin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, query, sql2, query2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "INSERT INTO admin SET ?";
                        return [4 /*yield*/, Database_1.Database.Instance.Query(sql, this.Admin)];
                    case 1:
                        query = _a.sent();
                        sql2 = "INSERT INTO admin_profile SET ?";
                        this.Profile.id_admin = query.insertId;
                        return [4 /*yield*/, Database_1.Database.Instance.Query(sql2, this.Profile)];
                    case 2:
                        query2 = _a.sent();
                        return [2 /*return*/, [query, query2]];
                }
            });
        });
    };
    return AdminController;
}());
exports.AdminController = AdminController;
