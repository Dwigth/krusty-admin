"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var var_clean_1 = __importDefault(require("var-clean"));
var html_pdf_1 = __importDefault(require("html-pdf"));
var EXPRESSPDF = /** @class */ (function () {
    function EXPRESSPDF() {
    }
    EXPRESSPDF.notFound = function (res) {
        res.sendStatus(404);
        res.end();
    };
    EXPRESSPDF.internalError = function (res) {
        res.sendStatus(500);
        res.end();
    };
    EXPRESSPDF.setHeader = function (res, filename) {
        res.header('Content-Type', 'application/pdf');
        res.header('Content-Disposition', 'inline; filename="' + filename + '"');
        res.header('Content-Transfer-Encoding', 'binary');
    };
    EXPRESSPDF.sendHTMLPDF = function (res, filename, content, options) {
        return new Promise(function (resolve, reject) {
            EXPRESSPDF.setHeader(res, filename);
            html_pdf_1.default.create(content, options).toStream(function (err, stream) {
                if (err) {
                    reject(err);
                }
                else {
                    stream.pipe(res);
                    stream.on('end', function () {
                        res.end();
                        resolve();
                    });
                }
            });
        });
    };
    EXPRESSPDF._pdf = function (filename) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            fs_1.default.stat(filename, function (err, stat) {
                if (err) {
                    EXPRESSPDF.notFound(_this);
                    return reject(filename + ' does not exists');
                }
                EXPRESSPDF.setHeader(_this, path_1.default.basename(filename));
                var stream = fs_1.default.createReadStream(filename);
                stream.pipe(_this);
                stream.on('end', function () {
                    _this.end();
                    resolve();
                });
                stream.on('error', function (error) {
                    reject(error);
                });
            });
        });
    };
    ;
    EXPRESSPDF._pdfFromHTML = function (opt) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            opt = opt || {};
            opt.filename = var_clean_1.default.clean.cleanOnlyString(opt.filename) || "file.pdf";
            opt.html = var_clean_1.default.clean.cleanOnlyString(opt.html);
            opt.htmlContent = var_clean_1.default.clean.cleanOnlyString(opt.htmlContent);
            opt.options = opt.options || {};
            if (opt.html !== undefined) {
                fs_1.default.readFile(opt.html, 'utf-8', function (err, data) {
                    if (err) {
                        EXPRESSPDF.notFound(_this);
                        return reject(opt.html + ' does not exists');
                    }
                    EXPRESSPDF.sendHTMLPDF(_this, opt.filename, data, opt.options)
                        .then(resolve, reject);
                });
            }
            else if (opt.htmlContent !== undefined) {
                EXPRESSPDF.sendHTMLPDF(_this, opt.filename, opt.htmlContent, opt.options)
                    .then(resolve, reject);
            }
            else {
                EXPRESSPDF.internalError(_this);
                reject('html and htmlContent not set');
            }
        });
    };
    ;
    EXPRESSPDF.PDF = function (req, res, next) {
        res.pdf = EXPRESSPDF._pdf;
        res.pdfFromHTML = EXPRESSPDF._pdfFromHTML;
        next();
    };
    return EXPRESSPDF;
}());
exports.EXPRESSPDF = EXPRESSPDF;
