import { IAuthController } from "../../interfaces/controllers/auth/auth";
import { ICredentials } from "../../interfaces/controllers/auth/credentials";
import { AdminController } from "../models/admin.controller";
import { compare } from 'bcrypt';
import { RecuperacionContra } from "../../interfaces/Database/models/recuperacion_contra";
import { hash } from "bcrypt";
import { RecuperacionController } from "../models/recuperacion.controller";

export class AuthController implements IAuthController {

    private credentials: ICredentials;

    constructor(credentials?: ICredentials) {
        this.credentials = credentials;
    }

    SetCredential(credential: ICredentials) {
        this.credentials = credential;
    }

    async login() {
        const adminctl = new AdminController();
        return await adminctl.SearchAdminByParam('usuario', this.credentials.username)
            .then(async admins => {
                let admin = admins[0];
                let valid = await compare(this.credentials.password, admin.contrasena);
                return { valid: valid, user: admin };
            })
            .catch(e => e)
    }

    register() { }

    changePassword() {

    }

    /**
     * Proceso el cual consiste en crear un ticket de procesamiento para cambio de contraseña
     * estableciendo los puntos de partida para hacer la accion de restauración y su limite de tiempo.
     * @returns {string} token
     */
    async forgotPassword(email: string): Promise<string> {
        const adminCtl = new AdminController();
        let adminUser = await adminCtl.SearchAdminByParam('email', email);

        const initialDate = new Date();
        const limiteDate = new Date(
            initialDate.getFullYear(),
            initialDate.getMonth(),
            initialDate.getDate(),
            initialDate.getHours(),
            initialDate.getMinutes(),
            initialDate.getSeconds() + 300
        );
        let recuperacion: RecuperacionContra = {
            activo: 1,
            fecha_peticion: initialDate.toISOString(),
            fecha_limite: limiteDate.toISOString(),
            token_acceso: await hash(Date.now().toString(), 10),
        };
        console.log(recuperacion);

        const recupctl = new RecuperacionController();
        recupctl.SetAdminTicket(recuperacion);
        let ticketRecuperacion = await recupctl.CreateAdminTicket();
        // recupctl.CreateAdminRelation({ id_admin: adminUser[0].id_admin, id_recuperacion: ticketRecuperacion.id });
        return ticketRecuperacion.token_acceso;
    }

}