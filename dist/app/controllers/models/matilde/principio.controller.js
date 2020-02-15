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
var Database_1 = require("../../../db/Database");
var enviroment_1 = require("../../../../environments/enviroment");
var colors_1 = __importDefault(require("colors"));
var PrincipioController = /** @class */ (function () {
    function PrincipioController() {
    }
    PrincipioController.prototype.GetAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n        SELECT p.id_principio,p.nombre, m.nombre AS \"metodo\" FROM principio p\n        INNER JOIN metodo m\n        ON p.id_metodo = m.id_metodo\n        ";
                        return [4 /*yield*/, Database_1.Database.Instance.Query(query)];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, resp];
                }
            });
        });
    };
    PrincipioController.prototype.GetNames = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "SELECT id_principio,nombre FROM principio";
                        return [4 /*yield*/, Database_1.Database.Instance.Query(query)];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, resp];
                }
            });
        });
    };
    PrincipioController.prototype.Delete = function (previews) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!Array.isArray(previews)) return [3 /*break*/, 1];
                        return [3 /*break*/, 3];
                    case 1:
                        query = "DELETE FROM principio WHERE id_principio = " + previews.id_principio;
                        if (enviroment_1.environments.logging) {
                            console.log(colors_1.default.yellow(query));
                        }
                        return [4 /*yield*/, Database_1.Database.Instance.Query(query)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @todo Trabajar con arreglo de objetos
     * @param previews Objeto o arreglo de objetos
     */
    PrincipioController.prototype.Update = function (previews) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!Array.isArray(previews)) return [3 /*break*/, 1];
                        previews.map(function (data) {
                            var query = "UPDATE principio SET nombre = '" + data.nombre + "', id_metodo = " + data.id_metodo + "\n            WHERE id_principio = " + data.id_principio + ";";
                            if (enviroment_1.environments.logging) {
                                console.log(colors_1.default.yellow(query));
                            }
                        });
                        return [3 /*break*/, 3];
                    case 1:
                        query = "UPDATE principio SET nombre = '" + previews.nombre + "', id_metodo = " + previews.id_metodo + " \n            WHERE id_principio = " + previews.id_principio + ";";
                        if (enviroment_1.environments.logging) {
                            console.log(colors_1.default.yellow(query));
                        }
                        return [4 /*yield*/, Database_1.Database.Instance.Query(query)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PrincipioController.prototype.Create = function (previews) {
        return __awaiter(this, void 0, void 0, function () {
            var query, queryValues, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!Array.isArray(previews)) return [3 /*break*/, 1];
                        query = "INSERT INTO principio (nombre, id_metodo) VALUES";
                        queryValues = previews.map(function (pre) { return "('" + pre.nombre + "','" + pre.id_metodo + "')"; });
                        query += queryValues;
                        if (enviroment_1.environments.logging) {
                            console.log(colors_1.default.yellow(query));
                        }
                        return [3 /*break*/, 3];
                    case 1:
                        query = "INSERT INTO principio (nombre, id_metodo) VALUES ('" + previews.nombre + "','" + previews.id_metodo + "')";
                        if (enviroment_1.environments.logging) {
                            console.log(colors_1.default.yellow(query));
                        }
                        return [4 /*yield*/, Database_1.Database.Instance.Query(query)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return PrincipioController;
}());
exports.PrincipioController = PrincipioController;
