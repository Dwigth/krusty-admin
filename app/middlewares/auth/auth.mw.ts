import { Request, Response } from "express";
import colors from "colors";
import { ICredentials } from "../../interfaces/controllers/auth/credentials";
import { AuthController } from "../../controllers/auth/auth.controller";
import { MailController } from "../../controllers/general/mail.controller";
import { AdminController } from "../../controllers/models/admin.controller";
import { RecuperacionController } from "../../controllers/models/recuperacion.controller";
import moment from "moment";


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
    let authCtl = new AuthController();
    // // Proceso de creación de tickets
    let token = await authCtl.forgotPassword(options.receiver);
    // // Enviar correo
    let info = await nmi.SendResetPasswordEmail(token, options.receiver);
    res.render('forgot-password', {
        title: 'Recuperar contraseña',
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
    const token = req.params.token;
    const adminCtl = new AdminController();

    const recuperacionCtl = new RecuperacionController();
    const recuperacionTicket = await recuperacionCtl.SearchRecuperacionByParam('token_acceso', token).then(resp => resp[0]);

    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const limite = moment(recuperacionTicket.fecha_limite).utc().format('YYYY-MM-DD HH:mm:ss');
    const peticion = moment(recuperacionTicket.fecha_peticion).utc().format('YYYY-MM-DD HH:mm:ss');


    let canPass = moment(timestamp).isBetween(peticion, limite);
    console.log(timestamp.red, peticion.green, limite.yellow, canPass);

    if (recuperacionTicket == undefined) {
        res.render('403', { title: 'Tiempo agotado' });
        return;
    }
    if (recuperacionTicket.activo == 0) {
        res.render('403', { title: 'Tiempo agotado' });
        return;
    }
    if (!canPass) {
        res.render('403', { title: 'Tiempo agotado' });
        return;
    }

    // Relacion de administradores y tickets de recuperacion
    const adminRecup = await recuperacionCtl.SearchAdminRelation(recuperacionTicket.id);

    // Obtener el usuario
    const adminUser = await adminCtl.SearchAdminById(adminRecup.id_admin).then(resp => resp[0]);

    //Obtener token para obtener foto de usuario
    res.render('new-password', { user: adminUser, title: 'Reestablezca su contraseña', token: token });
}

/**
 * [POST]
 * Reestablece la contraseña
 * @param req 
 * @param res 
 */
export async function RestorePassword(req: Request, res: Response) {
    const token = req.body.token;
    const password = req.body.password;
    const nombre = req.body.nombre;

    try {
        const recuperacionCtl = new RecuperacionController();
        const authCtl = new AuthController({ username: nombre, password: password });
        await authCtl.changePassword();
        const recuperacionTicket = await recuperacionCtl.SearchRecuperacionByParam('token_acceso', token).then(resp => resp[0]);
        await recuperacionCtl.DeactivateTicketRecuperacion(recuperacionTicket.id);
        res.render('success-password')
    } catch (e) {
        res.render('403');
    }
    // Reedirigirlo a una página de exito
    // res.redirect('change-passworld-successfully')
}