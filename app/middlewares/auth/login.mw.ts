import { Request, Response } from "express";
import colors from "colors";
import { ICredentials } from "../../interfaces/controllers/auth/credentials";
import { AuthController } from "../../controllers/auth/auth.controller";

export async function Login(req: Request, res: Response) {
    let credentials: ICredentials = req.body;
    const authctl = new AuthController(credentials);
    let login = await authctl.login();
    if (login.valid) {

        delete login.user.contrasena;
        // Render redireccionamiento
        res.render('redireccion', { user: JSON.stringify(login.user) })
        // Redireccionar a home
        // res.redirect('home');
    } else {
        res.render('login', {
            title: 'Login',
            error: !login.valid
        })
    }
}

export async function Redirect(req: Request, res: Response) {

}