import { Database } from "../../db/Database";
import { RecuperacionContra } from "../../interfaces/Database/models/recuperacion_contra";
import { hash } from "bcrypt";

export class ModelTest {

    constructor() {
        this.init();
    }

    async init() {
        const initialDate = new Date();
        const limiteDate = new Date(
            initialDate.getFullYear(),
            initialDate.getMonth(),
            initialDate.getDate(),
            initialDate.getHours(),
            initialDate.getMinutes(),
            initialDate.getSeconds() + 300
        );
        let recuperacion: RecuperacionContra = {
            activo: 1,
            fecha_peticion: initialDate.toISOString(),
            fecha_limite: limiteDate.toISOString(),
            token_acceso: await hash(Date.now().toString(), 10),
        };
        console.log(recuperacion);

        // let query = `INSERT INTO recuperacion_contra (id, fecha_peticion, fecha_limite, token_acceso, activo) VALUES (
        //     NULL, 
        //     '${recuperacion.fecha_peticion}', 
        //     '${recuperacion.fecha_limite}', 
        //     '${recuperacion.token_acceso}', 
        //     '${recuperacion.activo}'
        //     )`;
        let query = 'SELECT * FROM recuperacion_contra';
        Database.Instance.Queryable(query).then(result => {
            console.log(result.DataValues);
        })
    }
}
