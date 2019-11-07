import { IPrincipioModel } from "../../../interfaces/Database/models/principio";
import { Database } from "../../../db/Database";

export class PrincipioController implements IPrincipioModel {
    id_principio?: number;
    nombre: string;
    id_metodo: string;

    constructor() { }

    public async GetAll() {
        let query = `
        SELECT p.id_principio,p.nombre, m.nombre AS "metodo" FROM principio p
        INNER JOIN metodo m
        ON p.id_metodo = m.id_metodo
        `;
        const resp = await Database.Instance.Query<IPrincipioModel[]>(query);
        return resp;
    }

    public async GetNames() {
        let query = `SELECT id_principio,nombre FROM principio`;
        const resp = await Database.Instance.Query<string[]>(query);
        return resp;
    }
}