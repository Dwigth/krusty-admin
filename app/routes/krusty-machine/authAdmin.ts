import { Router, Request, Response } from 'express';
//Modelos
import { Respuesta } from '../../interfaces/krusty_machine/Respuesta';
import { ServerModel } from '../../interfaces/krusty_machine/server.model';
import { Database } from '../../db/Database';
import moment from 'moment';
import { compare } from 'bcryptjs';
import crypto from 'crypto';

const router = Router();

/**
 * @description Elimina una maquina de krustymachine
 */

router.post('/loginAdmin', (req: Request, res: Response)  => {

    var hash = crypto.createHash('sha256');
    var saltRounds = 15;

    let body = req.body;

    let consulta = `SELECT * FROM admin WHERE nombre = '${body.nombre}'`;

    Database.Instance.ejecutarConsulta(consulta, false, null, (err: any, datos: Object[])=> {
        //Error si no se encuentra el usuario
        if (err) {
            let response: Respuesta = {
                error: true,
                msg: "Algo salio mal en la consulta.",
                data: err
            };

            return res.json(response);
        } else {
            let user: any = datos[0];
                        
            //Si todo sale bien, checamos que la contraseña sea correcta
            compare(body.contrasena, user.contrasena).then( (valid: any)=>{
                
                if(valid){
                    //Si todo sale bien, actualizamos el token:
                    let TokenUpdated = hash.update(Date.now().toString()).digest('hex');
                    user.token = TokenUpdated;
                    let updatequery = `UPDATE admin SET token = '${TokenUpdated}' WHERE admin.id_admin = ${user.id_admin};`;
                    
                    Database.Instance.ejecutarConsulta(
                      updatequery,
                      false,
                      null,
                      (errUpdate: any, datosUpdate: Object[]) => {
                        if (errUpdate) {
                          //Error al actualizar el toekn
                          let response: Respuesta = {
                            error: true,
                            msg: "Algo salio mal al actualizar el token.",
                            data: errUpdate
                          };

                          return res.json(response);
                        } else {
                          delete user.contrasena;

                          //Todo salio biwen
                          let response: Respuesta = {
                            error: false,
                            msg: "Login correcto",
                            data: user
                          };

                          return res.json(response);
                        }
                      }
                    );
                }else{
                    //La contraseña no coincide con el hash
                    let response: Respuesta = {
                        error: true,
                        msg: "Sus credenciales son incorrectas.",
                        data: valid
                    };

                    return res.json(response);
                }
            }).catch((errorValid:any)=>{
                console.log("error al comparar hash", errorValid);
                //Algo salio mal al validar el hash de la contraseña
                let response: Respuesta = {
                    error: true,
                    msg: "Hubo un error en el valid del login.",
                    data: errorValid
                };

                return res.json(response);
            })
            
        }
    });

});

export const LoginAdminRouter = router;