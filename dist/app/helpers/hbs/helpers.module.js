"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var hbs_1 = __importDefault(require("hbs"));
var login_1 = require("./auth/login");
var enviroment_1 = require("../../../environments/enviroment");
var admin_keys_1 = require("./home/admin-keys");
var menu_1 = require("./home/menu");
var general_1 = require("./home/general");
var HelpersModule = /** @class */ (function () {
    function HelpersModule() {
        this.Modules = [];
        this.Modules = this.Modules.concat(login_1.LoginHelperManager, admin_keys_1.AdminnHelperManager, menu_1.MenuHelperManager, general_1.GeneralHelperManager);
        for (var i = 0; i < this.Modules.length; i++) {
            var module_1 = this.Modules[i];
            hbs_1.default.registerHelper(module_1.name, module_1.function);
        }
        if (enviroment_1.environments.logging) {
            console.log('Helpers cargados');
        }
    }
    return HelpersModule;
}());
exports.HelpersModule = HelpersModule;
