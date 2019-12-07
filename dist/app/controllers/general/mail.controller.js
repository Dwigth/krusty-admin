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
var nodemailer_1 = __importDefault(require("nodemailer"));
var enviroment_1 = require("../../../environments/enviroment");
var MailController = /** @class */ (function () {
    function MailController() {
        var options = enviroment_1.environments.mailConfig.nodemailer;
        this.NodemailerTransporter = nodemailer_1.default.createTransport(options);
    }
    /**
     *
     */
    MailController.prototype.SendResetPasswordEmail = function (token, userMail) {
        return __awaiter(this, void 0, void 0, function () {
            var html, info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        html = '';
                        html += "\n            <div>\n                <img src=\"" + enviroment_1.environments.mailConfig.FORGOT_PASSWORD_URL + "/admin-template/krusty-lab/images/logo-krusty.svg\">\n            </div>\n            <div>\n                Por favor haga click al siguiente <a href=\"" + enviroment_1.environments.mailConfig.FORGOT_PASSWORD_URL + "/new-password/" + token + "\">link</a> para reestaurar tu contrase\u00F1a. <br>\n                <small>Si usted no ha solicitado este proceso por favor ignore este correo.</small>\n            </div>\n        ";
                        return [4 /*yield*/, this.NodemailerTransporter.sendMail({
                                from: "\"[TSCBiT] Recuperaci\u00F3n de contrase\u00F1a\" <" + enviroment_1.environments.mailConfig.nodemailer.auth.user + ">",
                                to: userMail,
                                subject: 'Proceso de recuperación de contraseñas',
                                text: 'Hello world? TEST',
                                html: html // html body
                            })];
                    case 1:
                        info = _a.sent();
                        console.log('Message sent: %s', info.messageId);
                        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                        // Preview only available when sending through an Ethereal account
                        console.log('Preview URL: %s', nodemailer_1.default.getTestMessageUrl(info));
                        return [2 /*return*/];
                }
            });
        });
    };
    return MailController;
}());
exports.MailController = MailController;
