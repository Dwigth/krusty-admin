import express, { Request, Response } from 'express';

export const HomeRouter = express.Router();

HomeRouter.get('/', (req: Request, res: Response) => {
    res.render('index')
});