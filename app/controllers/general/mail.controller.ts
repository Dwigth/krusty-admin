import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { environments } from '../../../environments/enviroment';

export class MailController {
    private NodemailerTransporter: nodemailer.Transporter;

    constructor() {
        let options: SMTPTransport.Options = environments.mailConfig.nodemailer;
        this.NodemailerTransporter = nodemailer.createTransport(options);
    }

    /**
     * 
     */
    public async SendResetPasswordEmail(token: string, userMail: string) {
        let html = '';

        html += `
            <div>
                <img src="${environments.mailConfig.FORGOT_PASSWORD_URL}/admin-template/krusty-lab/images/logo-krusty.svg">
            </div>
            <div>
                Por favor haga click al siguiente <a href="${environments.mailConfig.FORGOT_PASSWORD_URL}/new-password/${token}">link</a> para reestaurar tu contraseña. <br>
                <small>Si usted no ha solicitado este proceso por favor ignore este correo.</small>
            </div>
        `;

        // send mail with defined transport object
        let info = await this.NodemailerTransporter.sendMail({
            from: `"[TSCBiT] Recuperación de contraseña" <${environments.mailConfig.nodemailer.auth.user}>`, // sender address
            to: userMail, // list of receivers
            subject: 'Proceso de recuperación de contraseñas', // Subject line
            text: 'Hello world? TEST', // plain text body
            html: html // html body
        });

        console.log('Message sent: %s', info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
}