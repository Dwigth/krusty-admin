import { Request, Response } from "express";
import colors from "colors";
import { ICredentials } from "../../interfaces/controllers/auth/credentials";
import { AuthController } from "../../controllers/auth/auth.controller";
import { MailController } from "../../controllers/general/mail.controller";

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
/**
 * [GET]
 * Este middleware envía al usuario a la pagina para enviar correo
 * @param req 
 * @param res 
 */
export async function ForgotPassword(req: Request, res: Response) {
    res.render('forgot-password', { title: 'Recuperar contraseña' });
}
/**
 * [POST]
 * Este middleware envia el correo
 * @param req 
 * @param res 
 */
export async function ForgotPasswordProcess(req: Request, res: Response) {
    let options = {
        receiver: req.body.email
    }
    let nmi = new MailController();
    console.log(options);

    let authCtl = new AuthController();
    // // Proceso de creación de tickets
    let token = await authCtl.forgotPassword(options.receiver);
    // // Enviar correo
    // let info = await nmi.SendResetPasswordEmail(token, options.receiver);
    res.render('forgot-password', {
        msg: '¡Listo! Se te ha enviado un correo a tu dirección.'
    });
}

/**
 * [GET]
 * Renderiza la pagina para reestablecer la cotraseña, tambien verifica que 
 * no haya expirado el link
 * @param req 
 * @param res 
 */
export async function RestorePasswordPage(req: Request, res: Response) {
    console.log(req.params.token);
    //Obtener token para obtener foto de usuario
    res.render('new-password', { userImg: '' });
}

/**
 * [POST]
 * Reestablece la contraseña
 * @param req 
 * @param res 
 */
export async function RestorePassword(req: Request, res: Response) { }