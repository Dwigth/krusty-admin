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
var keys_controller_1 = require("../../controllers/models/matilde/keys.controller");
var fs_1 = require("fs");
function CodePDFGenerator(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var keyctl, keys, label64, image, y, x, spacebtw, html;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    keyctl = new keys_controller_1.KeysController();
                    return [4 /*yield*/, keyctl.GetKeys()];
                case 1:
                    keys = _a.sent();
                    label64 = fs_1.readFileSync('public/images/matilde/labelv2_base64.txt', 'utf-8');
                    image = '/images/matilde/label.png';
                    y = 49.13;
                    x = 170.07;
                    spacebtw = 20;
                    html = "\n    <html>\n        <head></head>\n        <body>\n            <div style=\"width:100%;display: flex;flex-direction: row;flex-wrap: wrap;\">\n        ";
                    // Aqui obtendremos el target a mostrar
                    keys[1].llaves.map(function (key, i) {
                        var keyElement = "\n        <div style=\"position:relative;width:25%;\">\n        <img style=\"width:" + x + "px;height:" + y + "px;margin-right:" + spacebtw + "px;margin-bottom:3.5px\" src=\"" + label64 + "\" />\n        <small style=\"color:white;font-size:1rem;position:absolute;left:70px;bottom:20px;\">" + key + "</small>\n        </div>";
                        html += keyElement;
                    });
                    html += "</div>\n        </body>\n    </html";
                    // console.log(html);
                    res.pdfFromHTML({
                        filename: "Test.pdf",
                        htmlContent: html,
                        options: {
                            "border": {
                                "top": "0cm",
                                "right": "0cm",
                                "bottom": "0cm",
                                "left": "0cm"
                            },
                            "format": "Letter",
                            "orientation": "portrait",
                        }
                        /* Más documentación en https://www.npmjs.com/package/html-pdf
                        * y en https://www.npmjs.com/package/express-pdf
                        **/
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.CodePDFGenerator = CodePDFGenerator;
