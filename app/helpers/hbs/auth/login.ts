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
    {
        name: 'manage_credentials',
        function: (user: any) => {
            const script =
                `<script>
                if(localStorage.getItem('user') === null){
                    if(${user} != undefined){
                        localStorage.setItem('user',JSON.stringify(${user}));
                        setTimeout(function(){
                            location.href = '/home';
                        },1000);
                    } 
                }else{
                    location.href = '/home';
                }
                </script>`;
            return new hbs.handlebars.SafeString(script);
        }
    }
];

