import express, { Request, Response } from 'express';

declare namespace e {
    function notfound(res: Response): void;
    function internalError(res: Response): void;
    function setHeader(res: Response, filename: string): void;
    function sendHTMLPDF(res: Response, filename: string, content: any, options: any): void;
    function _pdf(filename: string): Promise<any>;
    function _pdfFromHTML(opt: any): Promise<any>;
    export function PDF(req: Request, Res: Response, next: Function): void;
}

declare function e(): express.RequestHandler;
export = e;