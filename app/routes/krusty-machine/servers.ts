import { Router, Request, Response } from 'express';
import { compare } from 'bcryptjs';

//Modelos
import { Respuesta } from '../../interfaces/krusty_machine/Respuesta';
import { ServerModel } from '../../interfaces/krusty_machine/server.model';
import { Database } from '../../db/Database';
import { UsuarioAdmin } from "../../interfaces/krusty_machine/usuario.model";

//Moment
import moment from 'moment';
//Controllers
import { AdminController } from '../../controllers/models/admin.controller';
import { usuarioController, SocketClass } from '../../sockets/socket';
import { socket_KrustyMachine } from '../../server/server';

const router = Router();

/**
 * @description Reinicia maquina de krustymachine
 */
router.post('/reiniciarServidor', (req: Request, res: Response) => {
  let body = req.body;

  var token: string = req.header("Authorization");
  console.log("Token", token);
  console.log("body", body);
  
  let consulta = `SELECT * FROM admin WHERE nombre = '${body.usuario}'`;
  console.log("consulta", consulta);
  
  Database.Instance.ejecutarConsulta(consulta, true, token, (err: any, datos: Object[]) => {
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
      compare(body.contrasena, user.contrasena).then((valid: any) => {

        if (valid) {
          //Si todo sale bien
          let socketCtrl = new SocketClass(socket_KrustyMachine);
          socketCtrl.emitirReinicio(body.nombreServer);

          let response: Respuesta = {
            error: false,
            msg: "Perfecto",
            data: "Reiniciando " + body.nombreServer
          };

          return res.json(response);
          
        } else {
          //La contraseña no coincide con el hash
          let response: Respuesta = {
            error: true,
            msg: "Sus credenciales son incorrectas.",
            data: valid
          };

          return res.json(response);
        }
      }).catch((errorValid: any) => {
        // console.log("error al comparar hash", errorValid);
        //Algo salio mal al validar el hash de la contraseña
        let response: Respuesta = {
          error: true,
          msg: "Hubo un error al decifrar la contraseña",
          data: errorValid
        };

        return res.json(response);
      })

    }
  });

});


/**
 * @description Apaga maquina de krustymachine
 */
router.post('/apagarServidor', (req: Request, res: Response) => {
  let body = req.body;

  var token: string = req.header("Authorization");
  // console.log("Token", token);

  let consulta = `SELECT * FROM admin WHERE nombre = '${body.usuario}'`;

  Database.Instance.ejecutarConsulta(consulta, true, token, (err: any, datos: Object[]) => {
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
      compare(body.contrasena, user.contrasena).then((valid: any) => {

        if (valid) {
          //Si todo sale bien
          let socketCtrl = new SocketClass(socket_KrustyMachine);
          socketCtrl.emitirApagado(body.nombreServer);

          let response: Respuesta = {
            error: false,
            msg: "Perfecto",
            data: "Apagando " + body.nombreServer
          };

          return res.json(response);

        } else {
          //La contraseña no coincide con el hash
          let response: Respuesta = {
            error: true,
            msg: "Sus credenciales son incorrectas.",
            data: valid
          };

          return res.json(response);
        }
      }).catch((errorValid: any) => {
        // console.log("error al comparar hash", errorValid);
        //Algo salio mal al validar el hash de la contraseña
        let response: Respuesta = {
          error: true,
          msg: "Hubo un error al decifrar la contraseña",
          data: errorValid
        };

        return res.json(response);
      })

    }
  });

});


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
                msg: "Algo salio mal",
                data: err
              };

              return res.json(response);
            } else {
              let response: Respuesta = {
                error: false,
                msg: "Se obtuvieron los datos correctamente.",
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
            msg: "Algo salio mal",
            data: err
          };

          return res.json(response);
        } else {
          let response: Respuesta = {
            error: false,
            msg: "Se insertaron los datos correctamente.",
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
            msg: "Algo salio mal",
            data: err
          };

          return res.json(response);
        } else {
          let response: Respuesta = {
            error: false,
            msg: "Se modificaron los datos correctamente.",
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
            msg: "Algo salio mal",
            data: err
          };

          return res.json(response);
        } else {
          let response: Respuesta = {
            error: false,
            msg: "Se elimino el registro correctamente.",
            data: datos
          };

          return res.json(response);
        }
      }
    );

});

export const ServerRouter = router;