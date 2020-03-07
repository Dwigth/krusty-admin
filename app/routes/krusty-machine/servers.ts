import { Router, Request, Response } from 'express';
//Modelos
import { Respuesta } from '../../interfaces/krusty_machine/Respuesta';
import { ServerModel } from '../../interfaces/krusty_machine/server.model';
import { Database } from '../../db/Database';
import { UsuarioAdmin } from "../../interfaces/krusty_machine/usuario.model";

//Moment
import moment from 'moment';
//Controller Admin
import { AdminController } from '../../controllers/models/admin.controller';
import { usuarioController } from '../../sockets/socket';

const router = Router();


/**
 * @description Obtiene todas las krustymachines dela base de datos
 */
router.get('/obtener_krusty_machines', (req: Request, res: Response) => {

  var token: string = req.header("Authorization");
    // console.log("Token", token);
    // Obtener sus datos de sesión

    let consulta = `
        SELECT * FROM krusty_machine;
    `;

    Database.Instance.ejecutarConsulta(consulta, true, token, (err: any, datos: ServerModel[]) => {
        if (err) {
              let response: Respuesta = {
                error: true,
                mensaje: "Algo salio mal",
                data: err
              };

              return res.json(response);
            } else {
              let response: Respuesta = {
                error: false,
                mensaje: "Se obtuvieron los datos correctamente.",
                data: usuarioController.asignarConectados(datos)
              };

              return res.json(response);
            }
        }      
    );

});


/**
 * @description Inserta una nueva maquina de krustymachine a la base de datos
 */
router.post('/insertar_krusty_machine', (req: Request, res: Response)=>{
    let body = req.body;
    let fecha_acual: string = moment().locale('es').format('YYYY-MM-DD');

    var token: string = req.header("Authorization");
    // console.log("Token", token);

    let consulta = `
        INSERT INTO krusty_machine (id_server,ultimaFechaActivo,activo,longitud,
        latitud,nombreServer,velocidad_conexion,ip_server) 
        VALUES (NULL,'${fecha_acual}',${body.activo},'${body.longitud}','${body.latitud}', 
        '${body.nombreServer}','${body.velocidad_conexion}','${body.ip_server}');
    `;

    Database.Instance.ejecutarConsulta(
      consulta,
      true,
      token,
      (err: any, datos: Object[]) => {
        if (err) {
          let response: Respuesta = {
            error: true,
            mensaje: "Algo salio mal",
            data: err
          };

          return res.json(response);
        } else {
          let response: Respuesta = {
            error: false,
            mensaje: "Se insertaron los datos correctamente.",
            data: datos
          };

          return res.json(response);
        }
      }
    );
});

/**
 * @description Edita una maquina de krustymachine
 */

router.post('/modificar_krusty_machine', (req: Request, res: Response) => {
    let body = req.body;
    let id_krustymachine: number = body.id_server;
    let fecha_acual: string = moment().locale('es').format('YYYY-MM-DD');
    var token: string = req.header("Authorization");
    // console.log("Token", token);

    let consulta = `
        UPDATE krusty_machine SET 
        activo = ${body.activo},
        ultimaFechaActivo = ${fecha_acual},
        longitud = '${body.longitud}', 
        latitud = '${body.latitud}',
        nombreServer = '${body.nombreServer}',
        velocidad_conexion = '${body.velocidad_conexion}',
        ip_server = '${body.ip_server}'
        WHERE krusty_machine.id_server = ${id_krustymachine};
    `;

    Database.Instance.ejecutarConsulta(
      consulta,
      true,
      token,
      (err: any, datos: Object[]) => {
        if (err) {
          let response: Respuesta = {
            error: true,
            mensaje: "Algo salio mal",
            data: err
          };

          return res.json(response);
        } else {
          let response: Respuesta = {
            error: false,
            mensaje: "Se modificaron los datos correctamente.",
            data: datos
          };

          return res.json(response);
        }
      }
    );

});

/**
 * @description Elimina una maquina de krustymachine
 */

router.post('/eliminar_krusty_machine', (req: Request, res: Response) => {

    let body = req.body;
    let id_krustymachine: number = body.id_server;
    var token: string = req.header("Authorization");
    // console.log("Token", token);

    let consulta = `
        DELETE FROM krusty_machine WHERE krusty_machine.id_server = ${id_krustymachine}
    `;

    Database.Instance.ejecutarConsulta(
      consulta,
      true,
      token,
      (err: any, datos: Object[]) => {
        if (err) {
          let response: Respuesta = {
            error: true,
            mensaje: "Algo salio mal",
            data: err
          };

          return res.json(response);
        } else {
          let response: Respuesta = {
            error: false,
            mensaje: "Se elimino el registro correctamente.",
            data: datos
          };

          return res.json(response);
        }
      }
    );

});

export const ServerRouter = router;