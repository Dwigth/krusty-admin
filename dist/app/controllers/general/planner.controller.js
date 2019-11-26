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
var Database_1 = require("../../db/Database");
var moment_1 = __importDefault(require("moment"));
var PlannerController = /** @class */ (function () {
    function PlannerController(ins) {
        this.ProjectInstance = ins;
    }
    PlannerController.prototype.SetProyecto = function (ins) {
        this.ProjectInstance = ins;
    };
    PlannerController.prototype.SetTask = function (task) {
        this.TaskInstance = task;
    };
    PlannerController.prototype.SetCurrentUser = function (userid) {
        this.CurrentUser = userid;
    };
    PlannerController.prototype.GetProjectGuests = function (id_proyecto) {
        return __awaiter(this, void 0, void 0, function () {
            var sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT a.id_admin,a.nombre,a.img\n                FROM invitados_proyecto ip\n                INNER JOIN proyecto p\n                ON ip.id_proyecto = p.id\n                INNER JOIN admin a\n                ON ip.id_invitado = a.id_admin\n                WHERE p.id_creador = " + this.CurrentUser + " AND ip.id_proyecto = " + id_proyecto;
                        return [4 /*yield*/, Database_1.Database.Instance.Query(sql)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PlannerController.prototype.GetProjectsByUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, projects, ProjectsWithTasks;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT P.* FROM proyecto P WHERE P.id_creador = " + this.CurrentUser + ";";
                        return [4 /*yield*/, Database_1.Database.Instance.Query(sql)];
                    case 1:
                        projects = _a.sent();
                        return [4 /*yield*/, Promise.all(projects.map(function (p) { return __awaiter(_this, void 0, void 0, function () {
                                var _a, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            _a = p;
                                            return [4 /*yield*/, this.GetTasks(p.id).then(function (ts) { return ts.map(function (t) {
                                                    t.fecha_inicio = moment_1.default(t.fecha_inicio).format('YYYY-MM-DD');
                                                    t.fecha_termino = moment_1.default(t.fecha_termino).format('YYYY-MM-DD');
                                                    return t;
                                                }); })];
                                        case 1:
                                            _a.tareas = _c.sent();
                                            _b = p;
                                            return [4 /*yield*/, this.GetProjectGuests(p.id)];
                                        case 2:
                                            _b.invitados = _c.sent();
                                            return [2 /*return*/, p];
                                    }
                                });
                            }); }))];
                    case 2:
                        ProjectsWithTasks = _a.sent();
                        return [2 /*return*/, ProjectsWithTasks];
                }
            });
        });
    };
    PlannerController.prototype.Create = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "INSERT INTO proyecto(id_creador, id, fecha_inicio, fecha_termino, vista_actual,nombre) \n        VALUES(\n             '" + this.ProjectInstance.id_creador + "',\n             NULL,\n             '" + this.ProjectInstance.fecha_inicio + "',\n             '" + this.ProjectInstance.fecha_termino + "',\n             '" + this.ProjectInstance.vista_actual + "',\n             '" + this.ProjectInstance.nombre + "'\n            )";
                        return [4 /*yield*/, Database_1.Database.Instance.Query(sql)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PlannerController.prototype.Update = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "UPDATE proyecto SET\n        fecha_inicio = '" + this.ProjectInstance.fecha_inicio + "',\n        fecha_termino = '" + this.ProjectInstance.fecha_termino + "',\n        vista_actual = '" + this.ProjectInstance.vista_actual + "'\n        WHERE id = '" + this.ProjectInstance.id + "'";
                        return [4 /*yield*/, Database_1.Database.Instance.Query(sql)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PlannerController.prototype.GetProjects = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    PlannerController.prototype.Delete = function () { };
    PlannerController.prototype.GetTasks = function (IdProject) {
        return __awaiter(this, void 0, void 0, function () {
            var sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT * FROM TAREAS WHERE ID_PROYECTO = " + IdProject + " ORDER BY FECHA_INICIO ASC";
                        return [4 /*yield*/, Database_1.Database.Instance.Query(sql)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PlannerController.prototype.GetTask = function (idTask) {
        return __awaiter(this, void 0, void 0, function () {
            var sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT * FROM TAREAS WHERE ID = " + idTask;
                        return [4 /*yield*/, Database_1.Database.Instance.Query(sql)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PlannerController.prototype.CreateTask = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, taskPromises, res;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "INSERT INTO tareas(id_proyecto,nombre, descripcion, fecha_inicio, fecha_termino, progreso, dependencia)";
                        if (!Array.isArray(this.TaskInstance)) return [3 /*break*/, 2];
                        taskPromises = this.TaskInstance.map(function (task) { return __awaiter(_this, void 0, void 0, function () {
                            var instanceSql, DiaAgregado, res, Task;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        instanceSql = "INSERT INTO tareas SET ?";
                                        delete task['name'];
                                        delete task['start'];
                                        delete task['end'];
                                        delete task['progress'];
                                        delete task['custom_class'];
                                        DiaAgregado = moment_1.default(task.fecha_inicio).add(1, 'day');
                                        task.fecha_termino = DiaAgregado.format('YYYY-MM-DD');
                                        return [4 /*yield*/, Database_1.Database.Instance.Query(instanceSql, task)];
                                    case 1:
                                        res = _a.sent();
                                        return [4 /*yield*/, this.GetTask(res.insertId)];
                                    case 2:
                                        Task = _a.sent();
                                        return [2 /*return*/, Task];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(taskPromises)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        sql += "VALUES(\n            '" + this.TaskInstance.id_proyecto + "',\n            '" + this.TaskInstance.nombre + "', \n            '" + this.TaskInstance.descripcion + "', \n            '" + this.TaskInstance.fecha_inicio + "', \n            '" + this.TaskInstance.fecha_termino + "', \n            '" + this.TaskInstance.progreso + "', \n            '" + this.TaskInstance.dependencia + "'\n        )";
                        return [4 /*yield*/, Database_1.Database.Instance.Query(sql)];
                    case 3:
                        res = _a.sent();
                        return [4 /*yield*/, this.GetTask(res.insertId)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PlannerController.prototype.UpdateTask = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, taskPromises, res, Task;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "UPDATE tareas SET";
                        if (!Array.isArray(this.TaskInstance)) return [3 /*break*/, 2];
                        taskPromises = this.TaskInstance.map(function (task) { return __awaiter(_this, void 0, void 0, function () {
                            var instanceSql, res, Task;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        instanceSql = sql;
                                        instanceSql += "\n                    nombre = '" + task.nombre + "', \n                    descripcion = '" + task.descripcion + "', \n                    fecha_inicio = '" + task.fecha_inicio + "',\n                    fecha_termino = '" + task.fecha_termino + "', \n                    progreso = '" + task.progreso + "', \n                    dependencia = '" + task.dependencia + "',\n                    orden = '" + task.orden + "'\n                    WHERE id = '" + task.id + "'";
                                        return [4 /*yield*/, Database_1.Database.Instance.Query(instanceSql)];
                                    case 1:
                                        res = _a.sent();
                                        return [4 /*yield*/, this.GetTask(task.id)];
                                    case 2:
                                        Task = _a.sent();
                                        return [2 /*return*/, Task];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(taskPromises)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        sql += "nombre = '" + this.TaskInstance.nombre + "', \n            descripcion = '" + this.TaskInstance.descripcion + "', \n            fecha_inicio = '" + this.TaskInstance.fecha_inicio + "',\n            fecha_termino = '" + this.TaskInstance.fecha_termino + "', \n            progreso = '" + this.TaskInstance.progreso + "', \n            dependencia = '" + this.TaskInstance.dependencia + "'\n            WHERE id = '" + this.TaskInstance.id + "'";
                        return [4 /*yield*/, Database_1.Database.Instance.Query(sql)];
                    case 3:
                        res = _a.sent();
                        return [4 /*yield*/, this.GetTask(this.TaskInstance.id)];
                    case 4:
                        Task = _a.sent();
                        return [2 /*return*/, Task];
                }
            });
        });
    };
    return PlannerController;
}());
exports.PlannerController = PlannerController;
