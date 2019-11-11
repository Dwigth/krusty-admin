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
var cliente_controller_1 = require("../../controllers/models/matilde/cliente.controller");
var tienda_controller_1 = require("../../controllers/models/matilde/tienda.controller");
var principio_controller_1 = require("../../controllers/models/matilde/principio.controller");
var producto_controller_1 = require("../../controllers/models/matilde/producto.controller");
var metodo_controller_1 = require("../../controllers/models/matilde/metodo.controller");
var enviroment_1 = require("../../../environments/enviroment");
var keys_controller_1 = require("../../controllers/models/matilde/keys.controller");
function MatildeClients(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var ct, resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ct = new cliente_controller_1.ClienteController();
                    return [4 /*yield*/, ct.GetClientsWithLicences()];
                case 1:
                    resp = _a.sent();
                    res.render('matilde-clients', { clients: resp });
                    return [2 /*return*/];
            }
        });
    });
}
exports.MatildeClients = MatildeClients;
function MatildeCatalogs(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var tiendactl, princioctl, productoctl, metodoctl, tiendas, metodos, principios, productos;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tiendactl = new tienda_controller_1.TiendaController();
                    princioctl = new principio_controller_1.PrincipioController();
                    productoctl = new producto_controller_1.ProductoController();
                    metodoctl = new metodo_controller_1.MetodoController();
                    return [4 /*yield*/, tiendactl.GetAll()];
                case 1:
                    tiendas = _a.sent();
                    return [4 /*yield*/, metodoctl.GetAll()];
                case 2:
                    metodos = _a.sent();
                    return [4 /*yield*/, princioctl.GetAll()];
                case 3:
                    principios = _a.sent();
                    return [4 /*yield*/, productoctl.GetAll()];
                case 4:
                    productos = _a.sent();
                    res.render('matilde-catalogs', {
                        tiendas: tiendas,
                        metodos: metodos,
                        principios: principios,
                        productos: productos,
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.MatildeCatalogs = MatildeCatalogs;
function MatildeCatalogsNames(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var tiendactl, princioctl, productoctl, metodoctl, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    tiendactl = new tienda_controller_1.TiendaController();
                    princioctl = new principio_controller_1.PrincipioController();
                    productoctl = new producto_controller_1.ProductoController();
                    metodoctl = new metodo_controller_1.MetodoController();
                    _b = (_a = res).json;
                    _c = {};
                    return [4 /*yield*/, tiendactl.GetNames()];
                case 1:
                    _c.tiendas = _d.sent();
                    return [4 /*yield*/, princioctl.GetNames()];
                case 2:
                    _c.principios = _d.sent();
                    return [4 /*yield*/, productoctl.GetNames()];
                case 3:
                    _c.productos = _d.sent();
                    return [4 /*yield*/, metodoctl.GetNames()];
                case 4:
                    _b.apply(_a, [(_c.metodos = _d.sent(),
                            _c)]);
                    return [2 /*return*/];
            }
        });
    });
}
exports.MatildeCatalogsNames = MatildeCatalogsNames;
/**
 * ====================================================
 *
 * Se debe obtener el nombre de usuario y el token
 * actual para poder proceder
 *
 * ====================================================
 */
function MatildeCatalogsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var action, table, data, tiendactl, metodoctl, princioctl, productoctl;
        return __generator(this, function (_a) {
            action = req.params.action;
            table = req.params.table;
            data = req.body;
            if (enviroment_1.environments.logging) {
                console.log(data);
            }
            switch (table) {
                case 'tienda':
                    tiendactl = new tienda_controller_1.TiendaController();
                    switch (action) {
                        case 'read':
                            tiendactl.GetAll().then(function (data) { return res.json(data); }).catch(function (e) { return res.json(e); });
                            break;
                        case 'create':
                            tiendactl.Create(data).then(function (resp) {
                                res.json({ msg: 'Crear un item de tienda' });
                            }).catch(function (e) {
                                res.json({ msg: 'Crear un item de tienda' });
                            });
                            break;
                        case 'update':
                            tiendactl.Update(data).then(function (resp) {
                                res.json({ msg: 'Actualizar un item de tienda' });
                            }).catch(function (e) {
                                res.json({ msg: 'Actualizar un item de tienda' });
                            });
                            break;
                        case 'delete':
                            tiendactl.Delete(data).then(function (resp) {
                                res.json({ msg: 'Eliminar un item de tienda' });
                            }).catch(function (e) {
                                res.json({ msg: 'Error al eliminar un item de tienda' });
                            });
                            break;
                        default:
                            res.json({ msg: 'Debe especificar una acción item de tienda' });
                            break;
                    }
                    break;
                case 'metodo':
                    metodoctl = new metodo_controller_1.MetodoController();
                    switch (action) {
                        case 'read':
                            metodoctl.GetAll().then(function (data) { return res.json(data); }).catch(function (e) { return res.json(e); });
                            break;
                        case 'create':
                            metodoctl.Create(data).then(function (resp) {
                                res.json({ msg: 'Crear un item de tienda' });
                            }).catch(function (e) {
                                res.json({ msg: 'Crear un item de tienda' });
                            });
                            break;
                        case 'update':
                            metodoctl.Update(data).then(function (resp) {
                                res.json({ msg: 'Actualizar un item de metodo' });
                            }).catch(function (e) {
                                res.json({ msg: 'Actualizar un item de metodo' });
                            });
                            break;
                        case 'delete':
                            metodoctl.Delete(data).then(function (resp) {
                                res.json({ msg: 'Eliminar un item de metodo' });
                            }).catch(function (e) {
                                res.json({ msg: 'Error al eliminar un item de metodo' });
                            });
                            break;
                        default:
                            res.json({ msg: 'Debe especificar una acción item de metodos' });
                            break;
                    }
                    break;
                case 'principio':
                    princioctl = new principio_controller_1.PrincipioController();
                    switch (action) {
                        case 'read':
                            princioctl.GetAll().then(function (data) { return res.json(data); }).catch(function (e) { return res.json(e); });
                            break;
                        case 'create':
                            princioctl.Create(data).then(function (resp) {
                                res.json({ msg: 'Crear un item de tienda' });
                            }).catch(function (e) {
                                res.json({ msg: 'Crear un item de tienda' });
                            });
                            break;
                        case 'update':
                            princioctl.Update(data).then(function (resp) {
                                res.json({ msg: 'Actualizar un item de principio' });
                            }).catch(function (e) {
                                res.json({ msg: 'Actualizar un item de principio' });
                            });
                            break;
                        case 'delete':
                            princioctl.Delete(data).then(function (resp) {
                                res.json({ msg: 'Eliminar un item de principio' });
                            }).catch(function (e) {
                                res.json({ msg: 'Error al eliminar un item de principio' });
                            });
                            break;
                        default:
                            res.json({ msg: 'Debe especificar una acción item de principios' });
                            break;
                    }
                    break;
                case 'producto':
                    productoctl = new producto_controller_1.ProductoController();
                    switch (action) {
                        case 'read':
                            productoctl.GetAll().then(function (data) { return res.json(data); }).catch(function (e) { return res.json(e); });
                            break;
                        case 'create':
                            productoctl.Create(data).then(function (resp) {
                                res.json({ msg: 'Crear un item de producto' });
                            }).catch(function (e) {
                                res.json({ msg: 'Crear un item de producto' });
                            });
                            break;
                        case 'update':
                            productoctl.Update(data).then(function (resp) {
                                res.json({ msg: 'Actualizar un item de producto' });
                            }).catch(function (e) {
                                res.json({ msg: 'Actualizar un item de producto' });
                            });
                            break;
                        case 'delete':
                            productoctl.Delete(data).then(function (resp) {
                                res.json({ msg: 'Eliminar un item de producto' });
                            }).catch(function (e) {
                                res.json({ msg: 'Error al eliminar un item de producto' });
                            });
                            break;
                        default:
                            res.json({ msg: 'Debe especificar una acción item de productos' });
                            break;
                    }
                    break;
                default:
                    res.json({ msg: 'Su consulta está mal formada' });
                    break;
            }
            return [2 /*return*/];
        });
    });
}
exports.MatildeCatalogsHandler = MatildeCatalogsHandler;
function MatildeCode(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var keyctl, keys, selected, selectedObj;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    keyctl = new keys_controller_1.KeysController();
                    return [4 /*yield*/, keyctl.GetKeys()];
                case 1:
                    keys = _a.sent();
                    selected = req.params.selected;
                    selectedObj = keys.find(function (k) { return k.nombre == selected; });
                    res.render('matilde-codes', {
                        options: {
                            keys: selectedObj,
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.MatildeCode = MatildeCode;
