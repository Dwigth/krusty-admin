import { ICredentials } from "./credentials";

export interface IAuthController {
    login: Function;
    register: Function;
    forgotPassword: Function;
    changePassword: Function;
}