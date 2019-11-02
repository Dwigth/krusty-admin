import { IHelperModel } from "../../../interfaces/helpers/helper";
import hbs from 'hbs';

/**
 * =======================================================
 * 
 * Arreglo de objetos que contienen helpers personalizados
 * por modulo (carpeta).
 * 
 * =======================================================
 */
export const LoginHelperManager: IHelperModel[] = [
    {
        name: 'login_error',
        function: (error: boolean) => {
            console.log(error);
            if (error != undefined) {
                if (error) {
                    return new hbs.handlebars.SafeString(`<div class="alert alert-danger" role="alert" >Revisa tus credenciales </div>`);
                }
            }
        }
    },

];

