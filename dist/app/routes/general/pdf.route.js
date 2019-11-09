"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_pdf_controller_1 = require("../../controllers/general/express-pdf.controller");
var pdf_mw_1 = require("../../middlewares/general/pdf.mw");
exports.PDFRouter = express_1.Router();
exports.PDFRouter.get('/pdf', express_pdf_controller_1.EXPRESSPDF.PDF, pdf_mw_1.CodePDFGenerator);
