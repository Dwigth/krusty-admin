import { IAuthController } from "../../interfaces/controllers/auth/auth";
import { ICredentials } from "../../interfaces/controllers/auth/credentials";
import { AdminController } from "../models/admin.controller";
import { compare } from 'bcrypt';

export class AuthController implements IAuthController {

    private credentials: ICredentials;

    constructor(credentials: ICredentials) {
        this.credentials = credentials;
    }

    async login() {
        const adminctl = new AdminController();
        return await adminctl.SearchAdminByUsername(this.credentials.username)
            .then(async admins => {
                let admin = admins[0];
                let valid = await compare(this.credentials.password, admin.contrasena);
                return valid;
            })
            .catch(e => e)
    }

    register() { }
    changePassword() { }
    forgotPassword() { }

}