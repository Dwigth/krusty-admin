import { IPrincipioModel } from "../../../interfaces/Database/models/principio";
import { Database } from "../../../db/Database";

export class PrincipioController implements IPrincipioModel {
    id_principio?: number;
    nombre: string;
    id_metodo: string;

    constructor() { }

    public async GetAll() {
        let query = `SELECT * FROM principio`;
        const resp = await Database.Instance.Query<IPrincipioModel[]>(query);
        return resp;
    }

    public async GetPrincipiosNames() {
        let query = `SELECT nombre FROM principio`;
        const resp = await Database.Instance.Query<string[]>(query);
        return resp;
    }
}