import { IAuthController } from "../../interfaces/controllers/auth/auth";
import { ICredentials } from "../../interfaces/controllers/auth/credentials";
import { AdminController } from "../models/admin.controller";
import { compare, hash } from 'bcryptjs';
import { IRecuperacionContra } from "../../interfaces/Database/models/recuperacion_contra";
import { RecuperacionController } from "../models/recuperacion.controller";
import crypto from 'crypto';
import { IAdmin } from "../../interfaces/Database/models/admin";
export class AuthController implements IAuthController {

    private credentials: ICredentials;
    private hash = crypto.createHash('sha256');
    private saltRounds = 15;

    constructor(credentials?: ICredentials) {
        this.credentials = credentials;
    }

    SetCredential(credential: ICredentials) {
        this.credentials = credential;
    }
    /**
     * @description Obtiene los datos del usuario si al comparar su contraseña con el hash retorna un resultado válido.
     */
    async login() {
        const adminctl = new AdminController();
        return await adminctl.SearchAdminByParam('nombre', this.credentials.username)
            .then(async admins => {
                let admin = admins[0];
                let valid = await compare(this.credentials.password, admin.contrasena);

                if (valid) {
                    let TokenUpdated = this.hash.update(Date.now().toString()).digest('hex');
                    adminctl.token = TokenUpdated;
                    admin.token = TokenUpdated;
                    adminctl.id_admin = admin.id_admin;
                    await adminctl.UpdateToken();
                }

                return { valid: valid, user: admin };
            })
            .catch(e => e)
    }

    register() { }

    /**
     * Cambia el hash de la contraseña de administrador
     * @param id_admin 
     */
    public async changePassword() {
        //Esta será la nueva contraseña
        let newHash = await hash(this.credentials.password, this.saltRounds);
        let admCtl = new AdminController();
        admCtl.contrasena = newHash;
        admCtl.nombre = this.credentials.username;
        await admCtl.UpdateAdminPassword();
    }

    /**
     * Proceso el cual consiste en crear un ticket de procesamiento para cambio de contraseña
     * estableciendo los puntos de partida para hacer la accion de restauración y su limite de tiempo.
     * @returns {string} token
     */
    async forgotPassword(email: string): Promise<string | boolean> {
        const adminCtl = new AdminController();
        let adminUser = await adminCtl.SearchAdminByParam('email', email);

        if (adminUser.length !== 0) {

            const initialDate = new Date();
            const limiteDate = new Date(
                initialDate.getFullYear(),
                initialDate.getMonth(),
                initialDate.getDate(),
                initialDate.getHours(),
                initialDate.getMinutes(),
                initialDate.getSeconds() + 300
            );
            let recuperacion: IRecuperacionContra = {
                activo: 1,
                fecha_peticion: initialDate.toISOString(),
                fecha_limite: limiteDate.toISOString(),
                token_acceso: this.hash.update(Date.now().toString()).digest('hex')
            };
            const recupctl = new RecuperacionController();
            recupctl.SetAdminTicket(recuperacion);
            let ticketRecuperacion = await recupctl.CreateAdminTicket().catch();
            recupctl.CreateAdminRelation({ id_admin: adminUser[0].id_admin, id_recuperacion: ticketRecuperacion.id }).catch();
            return ticketRecuperacion.token_acceso;
        } else {
            return false;
        }
    }

    /**
     * 
     * @param password Hash de la contraseña del usuario
     */
    public async ValidatePassword(password: string): Promise<boolean> {
        return await compare(this.credentials.password, password);
    }

    /**
     * @description Cambia el estado del usuario a desactivado
     */
    public async DisableUser(id_admin: number) {
        const adminctl = new AdminController();
        adminctl.Instance = <IAdmin>{ id_admin: id_admin, activo: 0 };
        return await adminctl.DisableAdmin();
    }

    /**
     * Contraseña por default
     */
    public async DefaultPassword() {
        const phrase = '1234a';
        return await hash(phrase, this.saltRounds);
    }

    public async GetAdminByID(id: number) {
        const adminCtl = new AdminController();
        return await adminCtl.SearchAdminById(id);
    }

}