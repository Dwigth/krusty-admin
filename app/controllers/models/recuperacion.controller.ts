import { RecuperacionModel, AdminRecuperacion, RecuperacionContra } from "../../interfaces/Database/models/recuperacion_contra";
import { Database } from "../../db/Database";
import { environments } from "../../../environments/enviroment";
/**
 * Esta clase se encargará de generar tickets y relaciones entre el administrador y posiblemente en un futuro 
 * de usuarios externos
 */
export class RecuperacionController implements RecuperacionModel {

    private TicketRecuperacion: RecuperacionContra;

    constructor() { }

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
        let query = `INSERT INTO recuperacion_contra (id, fecha_peticion, fecha_limite, token_acceso, activo) VALUES (
            NULL, 
            '${this.TicketRecuperacion.fecha_peticion}', 
            '${this.TicketRecuperacion.fecha_limite}', 
            '${this.TicketRecuperacion.token_acceso}', 
            '${this.TicketRecuperacion.activo}'
            )`;
        let resp = await Database.Instance.Query<RecuperacionContra>(query);
        if (environments.logging) {
            console.log(query, resp);
        }
        return resp;
    }

    SetAdminTicket(ticket: RecuperacionContra) {
        this.TicketRecuperacion = ticket;
    }
}