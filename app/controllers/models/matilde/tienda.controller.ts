import { ITiendaModel } from "../../../interfaces/Database/models/tienda";
import { Database } from "../../../db/Database";

export class TiendaController implements ITiendaModel {

    private nombre: string;
    private id_tienda: number;
    private direccion: string;

    constructor() { }

    public async GetAll() {
        let query = `SELECT * FROM tienda`;
        const resp = await Database.Instance.Query<ITiendaModel[]>(query);
        return resp;
    }

    public async Update(previews: Array<ITiendaModel>) {

    }

    public async Create(previews: Array<ITiendaModel>) {

    }
}