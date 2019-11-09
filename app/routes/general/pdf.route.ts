import { Router, Request, Response } from "express";
import { EXPRESSPDF } from "../../controllers/general/express-pdf.controller";
import { CodePDFGenerator } from "../../middlewares/general/pdf.mw";

export const PDFRouter = Router();

PDFRouter.get('/pdf', EXPRESSPDF.PDF, CodePDFGenerator)
