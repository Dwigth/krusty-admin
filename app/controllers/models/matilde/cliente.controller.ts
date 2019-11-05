import { IClienteModel } from "../../../interfaces/Database/models/cliente";
import { Database } from "../../../db/Database";

export class ClienteController implements IClienteModel {
    ID_USUARIO: string;
    nombre: string;
    apellidos: string;
    correo: string;
    contrasena: string;
    createdAt: string | Date;
    updatedAt: string | Date;

    constructor() { }

    async GetClientsWithLicences() {
        const query = `SELECT C.ID_USUARIO, C.nombre, C.apellidos, C.correo, l.key, l.ID_LICENCIA, l.createdAt FROM cliente C
                        INNER JOIN licencia l ON c.ID_USUARIO = l.ID_USUARIO`;
        let resultado = await Database.Instance.Query<IClienteModel[]>(query);
        return resultado;
    }
}