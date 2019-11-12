"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_timezone_1 = __importDefault(require("moment-timezone"));
moment_timezone_1.default.tz("America/Mexico_City");
moment_timezone_1.default.locale('es');
var Model = /** @class */ (function () {
    function Model() {
        this.moment = moment_timezone_1.default();
    }
    Model.prototype.CallMoment = function (params) {
        if (params) {
            return moment_timezone_1.default(params);
        }
        else {
            return moment_timezone_1.default();
        }
    };
    return Model;
}());
exports.Model = Model;
