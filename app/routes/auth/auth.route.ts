import { Router, Request, Response } from "express";
import { Login, Redirect, ForgotPassword, ForgotPasswordProcess, RestorePassword, RestorePasswordPage } from "../../middlewares/auth/auth.mw";

export const AuthRouter = Router();

AuthRouter.get('/login', (req: Request, res: Response) => {
    res.render('login', {
        title: 'Inicio de sesión'
    });
});
AuthRouter.post('/login', Login);
AuthRouter.get('/forgot-password', ForgotPassword);
AuthRouter.post('/forgot-password', ForgotPasswordProcess);
AuthRouter.get('/new-password/:token', RestorePasswordPage);
AuthRouter.post('/new-password/', RestorePassword);
AuthRouter.get('/redirect', Redirect)