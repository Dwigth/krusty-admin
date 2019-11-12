import { RecuperacionModel, AdminRecuperacion, IRecuperacionContra } from "../../interfaces/Database/models/recuperacion_contra";
import { Database } from "../../db/Database";
import { environments } from "../../../environments/enviroment";
import { OkPacket } from "../../interfaces/Database/IDatabase";
import { Model } from "../../db/Model";
/**
 * Esta clase se encargará de generar tickets y relaciones entre el administrador y posiblemente en un futuro 
 * de usuarios externos
 */
export class RecuperacionController extends Model implements RecuperacionModel {

    private TicketRecuperacion: IRecuperacionContra;

    constructor() {
        super();
    }

    public async SearchRecuperacionByParam(param: string, value: string) {
        let query = `SELECT * FROM recuperacion_contra WHERE ${param} LIKE '%${value}%'`;
        let resultado = await Database.Instance.Query<IRecuperacionContra[]>(query);
        if (environments.logging) {
            console.log('Busqueda por parametro ===========>', resultado[0])
        }
        return resultado;
    }

    public async GetRecuperacionById(id: number) {
        let query = `SELECT * FROM recuperacion_contra WHERE id = ${id}`;
        let resp = await Database.Instance.Query<IRecuperacionContra[]>(query);
        if (environments.logging) {
            console.log('=================>', resp[0]);
        }
        return resp[0];
    }

    public async SearchAdminRelation(id_recuperacion: number) {
        let query = `SELECT * FROM admin_recuperacion WHERE id_recuperacion = ${id_recuperacion} `;
        let resp = await Database.Instance.Query<AdminRecuperacion[]>(query);
        if (environments.logging) {
            console.log('==============', resp[0]);
        }
        return resp[0];
    }

    public async CreateAdminRelation(relation: AdminRecuperacion) {
        let query = `INSERT INTO admin_recuperacion 
        (id_recuperacion, id_admin) VALUES ('${relation.id_recuperacion}','${relation.id_admin}')`;
        let resp = await Database.Instance.Query<AdminRecuperacion>(query);
        if (environments.logging) {
            console.log(resp);
        }
        return resp;
    }

    public async CreateAdminTicket() {
        this.TicketRecuperacion.fecha_peticion = this.moment.format('YYYY-MM-DD HH:mm:ss');
        this.TicketRecuperacion.fecha_limite = this.moment.add(5, 'minutes').format('YYYY-MM-DD HH:mm:ss');

        console.log('Antes de insertar', this.TicketRecuperacion);


        let query = `INSERT INTO recuperacion_contra (id, fecha_peticion, fecha_limite, token_acceso, activo) VALUES (
            NULL, 
            '${this.TicketRecuperacion.fecha_peticion}', 
            '${this.TicketRecuperacion.fecha_limite}', 
            '${this.TicketRecuperacion.token_acceso}', 
            '${this.TicketRecuperacion.activo}'
            )`;
        let resp = await Database.Instance.Query<OkPacket>(query);

        let recuperacionContra = await this.GetRecuperacionById(resp.insertId);

        if (environments.logging) {
            console.log('3.', recuperacionContra);
        }
        return recuperacionContra;
    }

    SetAdminTicket(ticket: IRecuperacionContra) {
        this.TicketRecuperacion = ticket;
    }

    public async DeactivateTicketRecuperacion(id: number) {
        let query = `UPDATE recuperacion_contra SET activo = '0' WHERE recuperacion_contra.id = ${id}`;
        let resp = await Database.Instance.Query<AdminRecuperacion>(query);
        if (environments.logging) {
            console.log(resp);
        }
        return resp;
    }
}