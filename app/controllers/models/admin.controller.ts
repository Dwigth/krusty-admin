import { IAdminModel } from "../../interfaces/Database/models/admin";
import { Database } from "../../db/Database";

export class AdminController extends Database implements IAdminModel {
    id_admin: number;
    usuario: string;
    contrasena: string;
    token: string;
    activo: number;

    constructor() {
        super();
    }
    /**
     * 
     * @param id_admin 
     */
    async SearchAdminById(id_admin: number) {
        let query = `SELECT * FROM admin WHERE id_admin = ${id_admin}`;
        let resultado = await this.Query<IAdminModel>(query);
        return resultado;
    }
    /**
     * 
     * @param usuario 
     */
    async SearchAdminByParam(param: string, value: string) {
        let query = `SELECT * FROM admin WHERE ${param} LIKE '%${value}%'`;
        let resultado = await Database.Instance.Query<IAdminModel[]>(query);
        return resultado;
    }

}