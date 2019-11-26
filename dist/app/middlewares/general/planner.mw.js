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
var planner_controller_1 = require("../../controllers/general/planner.controller");
var lodash_1 = require("lodash");
function CreateProject(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var IncomingPlanner, plannerctl, project;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    IncomingPlanner = req.body.proyecto;
                    plannerctl = new planner_controller_1.PlannerController(IncomingPlanner);
                    console.log('Project => ', plannerctl.GetProject());
                    return [4 /*yield*/, plannerctl.Create()];
                case 1:
                    project = _a.sent();
                    console.log(project);
                    res.json({ msg: 'ok' });
                    return [2 /*return*/];
            }
        });
    });
}
exports.CreateProject = CreateProject;
function CreateTask(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var IncomingTask, plannerctl, tasks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    IncomingTask = req.body.tareas;
                    console.log(IncomingTask);
                    plannerctl = new planner_controller_1.PlannerController();
                    plannerctl.SetTask(IncomingTask);
                    return [4 /*yield*/, plannerctl.CreateTask()];
                case 1:
                    tasks = _a.sent();
                    if (Array.isArray(tasks)) {
                        tasks = lodash_1.flattenDeep(tasks);
                    }
                    res.json({ msg: 'ok', tasks: tasks });
                    return [2 /*return*/];
            }
        });
    });
}
exports.CreateTask = CreateTask;
function UpdateTask(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var IncomingTask, plannerctl, tasks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    IncomingTask = req.body.tareas;
                    plannerctl = new planner_controller_1.PlannerController();
                    plannerctl.SetTask(IncomingTask);
                    return [4 /*yield*/, plannerctl.UpdateTask()];
                case 1:
                    tasks = _a.sent();
                    if (Array.isArray(tasks)) {
                        tasks = lodash_1.flattenDeep(tasks);
                    }
                    res.json({ msg: 'ok', tasks: tasks });
                    return [2 /*return*/];
            }
        });
    });
}
exports.UpdateTask = UpdateTask;
function Planner(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id_admin, plannerctl, projects;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id_admin = +req.params.admin;
                    plannerctl = new planner_controller_1.PlannerController();
                    plannerctl.SetCurrentUser(id_admin);
                    return [4 /*yield*/, plannerctl.GetProjectsByUser()];
                case 1:
                    projects = _a.sent();
                    res.render('planner', { projects: projects });
                    return [2 /*return*/];
            }
        });
    });
}
exports.Planner = Planner;
function GetProjects(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id_admin, plannerctl, projects;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id_admin = +req.params.admin;
                    plannerctl = new planner_controller_1.PlannerController();
                    plannerctl.SetCurrentUser(id_admin);
                    return [4 /*yield*/, plannerctl.GetProjectsByUser()];
                case 1:
                    projects = _a.sent();
                    res.json(projects);
                    return [2 /*return*/];
            }
        });
    });
}
exports.GetProjects = GetProjects;
function InviteToProject(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id_proyecto, guests, project, plannerctl, result;
        return __generator(this, function (_a) {
            id_proyecto = +req.body.id_proyecto;
            guests = req.body.invitados;
            project = { id: id_proyecto };
            plannerctl = new planner_controller_1.PlannerController();
            plannerctl.SetProject(project);
            plannerctl.SetGuests(guests);
            result = plannerctl.InviteToProject();
            res.json({ msg: 'ok' });
            return [2 /*return*/];
        });
    });
}
exports.InviteToProject = InviteToProject;
