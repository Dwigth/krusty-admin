import { AdminProfile } from "../../interfaces/Database/models/admin_profile";
import { Database } from "../../db/Database";
import { Query } from "mysql";

export class AdminProfileController {

    private instance: AdminProfile;

    constructor(inst?: AdminProfile) {
        this.instance = inst;
    }

    public Create() { }

    /**
     * Actualiza todos las propiedades de la tabla
     */
    public async Update() {
        let query = `UPDATE admin_profile SET 
        portada_img = '${this.instance.portada_img}',
        bio =  '${this.instance.bio}',
        fb_profile = '${this.instance.fb_profile}',
        twt_profile = '${this.instance.twt_profile}',
        number =  '${this.instance.number}',
        nombre =  '${this.instance.nombre}',
        apellidos =  '${this.instance.apellidos}',
        direccion =  '${this.instance.direccion}'
        WHERE id_admin = ${this.instance.id_admin}`;
        let resp = await Database.Instance.Query<Query>(query);
        return resp;
    }

    public async GetByAdminId() {
        let query = `SELECT * FROM admin_profile WHERE id_admin = ${this.instance.id_admin}`;
        let resp = await Database.Instance.Query<AdminProfile[]>(query).then(res => res[0]);
        return resp;
    }

    public SetAdminProfile(inst: AdminProfile) {
        this.instance = inst;
    }
}