import { IAdminModel, IAdmin } from "../../interfaces/Database/models/admin";
import { Database } from "../../db/Database";
import { Query } from "mysql";
import { OkPacket } from "../../interfaces/Database/IDatabase";

export class AdminController implements IAdminModel {

    Admin: IAdmin;

    id_admin: number;
    usuario: string;
    contrasena: string;
    token: string;
    activo: number;
    img: string;
    nombre: string;
    email: string;

    constructor() { }

    set Instance(ins: IAdmin) {
        this.Admin = ins;
    }

    public async Update() {
        let sql = `UPDATE admin SET ? WHERE id_admin = ${this.Admin.id_admin}`;
        return await Database.Instance.Query<OkPacket>(sql, this.Admin);
    }

    public async GetAdmins() {
        let query = `SELECT A.id_admin, A.img, A.nombre FROM admin A`;
        let resultado = await Database.Instance.Query<IAdmin[]>(query);
        resultado = resultado.filter(r => r.id_admin != this.id_admin);
        return resultado;
    }

    /**
     * 
     * @param id_admin 
     */
    public async SearchAdminById(id_admin: number) {
        let query = `SELECT * FROM admin WHERE id_admin = ${id_admin}`;
        let resultado = await Database.Instance.Query<IAdmin[]>(query);
        return resultado;
    }
    /**
     * @todo extender uso
     * @param usuario 
     */
    public async SearchAdminByParam(param: string, value: string) {
        let query = `SELECT * FROM admin WHERE ${param} = '${value}'`;
        let resultado = await Database.Instance.Query<IAdmin[]>(query);
        return resultado;
    }

    public async UpdateAdminPassword() {
        let query = `UPDATE admin SET contrasena = '${this.contrasena}' WHERE admin.nombre = '${this.nombre}'`;
        let resultado = await Database.Instance.Query<Query>(query);
        return resultado;
    }
    public async UpdateToken() {
        let query = `UPDATE admin SET token = '${this.token}' WHERE admin.id_admin = '${this.id_admin}'`;
        let resultado = await Database.Instance.Query<Query>(query);
        return resultado;
    }
    public async UpdateAdminName() {
        let query = `UPDATE admin SET nombre = '${this.nombre}' WHERE admin.id_admin = '${this.id_admin}'`;
        let resultado = await Database.Instance.Query<Query>(query);
        return resultado;
    }
    public async UpdateAdminEmail() {
        let query = `UPDATE admin SET email = '${this.email}' WHERE admin.id_admin = '${this.id_admin}'`;
        let resultado = await Database.Instance.Query<Query>(query);
        return resultado;
    }
    public async UpdateAdminImg() {
        let query = `UPDATE admin SET img = '${this.img}' WHERE admin.id_admin = '${this.id_admin}'`;
        let resultado = await Database.Instance.Query<Query>(query);
        return resultado;
    }
}