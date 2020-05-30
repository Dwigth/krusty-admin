import { compare } from 'bcryptjs';

//Modelos
import { Respuesta } from '../../../interfaces/krusty_machine/Respuesta';
import { Empresa } from '../../../interfaces/recibos/empresa';
import { Suscripcion } from '../../../interfaces/recibos/suscripcions';
//DB MYSQL
import { Database } from '../../../db/Database';


//Moment
import moment from 'moment';
//Controllers
import { AdminController } from '../../../controllers/models/admin.controller';
import { environments } from '../../../../environments/enviroment';



export class SuscripcionesController {

    constructor() {

    }

    public static obtenerSucripcion(id_empresa:number): Promise<Array<Suscripcion>> {

        return new Promise( (resolve, reject)=>{
            
            let consulta = `
                SELECT * FROM suscripciones WHERE id_empresa = ${id_empresa}
            `;

            console.log("consulta", consulta);

            Database.Instance.ejecutarConsulta(consulta, false, null, (err: any, datos: Array<Suscripcion>) => {
                if (err) {

                  if(err == 'El registro no existe'){
                      return resolve([]);
                  }else{
                    console.log("error", err);
                    return reject(err)
                  }
            
                } else {
                    // console.log(datos);
                    return resolve(datos)
                }
            
            }).catch((error: any) => {
                //Algo salio mal
                console.log(error);
                return reject(error)   
            });

        });
    }


}