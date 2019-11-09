import fs from 'fs';
import path from 'path';
import clean from 'var-clean';
import pdf from 'html-pdf';
import { Request } from 'express';

export class EXPRESSPDF {

    static notFound(res: any) {
        res.sendStatus(404);
        res.end();
    }
    static internalError(res: any) {
        res.sendStatus(500);
        res.end();
    }
    static setHeader(res: any, filename: string) {
        res.header('Content-Type', 'application/pdf');
        res.header('Content-Disposition', 'inline; filename="' + filename + '"');
        res.header('Content-Transfer-Encoding', 'binary');
    }
    static sendHTMLPDF(res: any, filename: string, content: any, options: any) {
        return new Promise(function (resolve, reject) {
            EXPRESSPDF.setHeader(res, filename);
            pdf.create(content, options).toStream(function (err, stream) {
                if (err) {
                    reject(err);
                } else {
                    stream.pipe(res);
                    stream.on('end', function () {
                        res.end();
                        resolve();
                    })
                }
            });
        });
    }

    static _pdf(filename: string) {
        let _this = <any>this;
        return new Promise(function (resolve, reject) {
            fs.stat(filename, function (err, stat) {
                if (err) {
                    EXPRESSPDF.notFound(_this);
                    return reject(filename + ' does not exists');
                }
                EXPRESSPDF.setHeader(_this, path.basename(filename));
                var stream = fs.createReadStream(filename);
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

    static _pdfFromHTML(opt: any) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            opt = opt || {};
            opt.filename = clean.clean.cleanOnlyString(opt.filename) || "file.pdf";
            opt.html = clean.clean.cleanOnlyString(opt.html);
            opt.htmlContent = clean.clean.cleanOnlyString(opt.htmlContent);
            opt.options = opt.options || {};

            if (opt.html !== undefined) {
                fs.readFile(opt.html, 'utf-8', function (err, data) {
                    if (err) {
                        EXPRESSPDF.notFound(_this);
                        return reject(opt.html + ' does not exists');
                    }
                    EXPRESSPDF.sendHTMLPDF(_this, opt.filename, data, opt.options)
                        .then(resolve, reject);
                });
            } else if (opt.htmlContent !== undefined) {
                EXPRESSPDF.sendHTMLPDF(_this, opt.filename, opt.htmlContent, opt.options)
                    .then(resolve, reject);
            } else {
                EXPRESSPDF.internalError(_this);
                reject('html and htmlContent not set');
            }
        });
    };

    static PDF(req: Request, res: any, next: Function) {
        res.pdf = EXPRESSPDF._pdf;
        res.pdfFromHTML = EXPRESSPDF._pdfFromHTML;
        next();
    }
}