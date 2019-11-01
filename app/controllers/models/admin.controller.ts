import { IAdminModel } from "../../interfaces/Database/models/admin";
import { Database } from "../../db/Database";

export class AdminController implements IAdminModel {
    id_admin: number;
    usuario: string;
    contrasena: string;
    token: string;
    activo: number;

    constructor() { }
    /**
     * 
     * @param id_admin 
     */
    async SearchAdminById(id_admin: number) {
        let query = `SELECT * FROM admin WHERE id_admin = ${id_admin}`;
        let resultado = await Database.Instance.Query<IAdminModel>(query);
        return resultado;
    }
    /**
     * 
     * @param usuario 
     */
    async SearchAdminByUsername(usuario: string) {
        let query = `SELECT * FROM admin WHERE usuario LIKE '%${usuario}%'`;
        let resultado = await Database.Instance.Query<IAdminModel[]>(query);
        return resultado;
    }

}