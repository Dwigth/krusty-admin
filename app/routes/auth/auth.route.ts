import { Router, Request, Response } from "express";
import { Login, Redirect } from "../../middlewares/auth/login.mw";

export const AuthRouter = Router();

AuthRouter.get('/login', (req: Request, res: Response) => {
    res.render('login', {
        title: 'Inicio de sesión'
    });
});
AuthRouter.post('/login', Login);

AuthRouter.get('/redirect', Redirect)