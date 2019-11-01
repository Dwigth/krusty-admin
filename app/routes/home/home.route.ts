import express, { Request, Response } from 'express';

export const HomeRouter = express.Router();

HomeRouter.get('/login', (req: Request, res: Response) => {
    res.render('login', {
        title: 'Inicio de sesión'
    });
});