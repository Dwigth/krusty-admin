import { IMetodoModel } from "../../../interfaces/Database/models/metodo";
import { Database } from "../../../db/Database";

export class MetodoController implements IMetodoModel {
    id_metodo: number;
    nombre: string;

    constructor() { }

    public async GetAll() {
        let query = `SELECT * FROM metodo`;
        const resp = await Database.Instance.Query<IMetodoModel[]>(query);
        return resp;
    }

}