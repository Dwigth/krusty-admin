import { Router, Request, Response } from 'express';
import { compare } from 'bcryptjs';

//Modelos
import { Respuesta } from '../../interfaces/krusty_machine/Respuesta';
import { Empresa } from '../../interfaces/recibos/empresa';
import { Suscripcion } from '../../interfaces/recibos/suscripcions';

//DB MYSQL
import { Database } from '../../db/Database';


//Moment
import moment from 'moment';
//Controllers
import { environments } from '../../../environments/enviroment';
import { SuscripcionesController } from './functions/suscripciones.controller';

const router = Router();
/////////////////////////////////////////EMPRESAS CRUD/////////////////////////////////////////////////

/**
 * @description Ingresar una empresa nueva
 */
router.post('/ingresarEmpresa', (req: Request, res: Response) => {
  let body = req.body;

  var token: string = req.header("Authorization");
  console.log("Token", token);
  console.log("body", body);
  let fecha_inicio: string = moment().locale('es').format('YYYY-MM-DD HH:mm');

  let consulta = `
        INSERT INTO empresas (id,nombreEmpresa,usuario,password,
          fecha_registro,token) 
        VALUES (NULL,'${body.nombreEmpresa}','${body.usuario}','${body.password}','${fecha_inicio}', 
        '');
  `;
  console.log("consulta", consulta);
  
  Database.Instance.ejecutarConsulta(consulta, environments.requiereToken, token, (err: any, data: any) => {
    //Error si no se encuentra el usuario
    if (err) {
      let response: Respuesta = {
        error: true,
        msg: "Algo salio mal en la consulta.",
        data: err
      };

      return res.json(response);
    } else {
      
      let response: Respuesta = {
        error: false,
        msg: "Empresas insertada en la bd con exito.",
        data: data
      };

      return res.json(response);
      }

    }).catch((error: any) => {
        //Algo salio mal
        let response: Respuesta = {
          error: true,
          msg: "Hubo un error al ejecutar la consulta",
          data: error
        };

        return res.json(response);
      });

});

/**
 * @description Buscar todas las empresas
 */
router.get('/obtenerEmpresas', (req: Request, res: Response) => {

  var token: string = req.header("Authorization");
  console.log("Token", token);
  
  let consulta = `
        SELECT * FROM empresas
  `;
  console.log("consulta", consulta);
  
  Database.Instance.ejecutarConsulta(consulta, environments.requiereToken, token, async(err: any, datos: Array<Empresa>) => {
    //Error si no se encuentra la consulta
    if (err) {
      let response: Respuesta = {
        error: true,
        msg: "Algo salio mal en la consulta.",
        data: err
      };

      return res.json(response);

    } else {

      console.log(datos);

      let empresas: Array<Empresa> = datos;

      let promesas: Promise<Empresa>[] = empresas.map(async (empresa) => {

        return new Promise<Empresa>(async (resolve, reject) => {
          empresa.suscripciones = await SuscripcionesController.obtenerSucripcion(empresa.id);
          resolve(empresa);
        })
      
      })


      let data = await Promise.all(promesas);

        
      let response: Respuesta = {
        error: false,
        msg: "Empresas encontradas con exito.",
        data: data
      };

      return res.json(response);

    }

    }).catch((error: any) => {
        //Algo salio mal
        let response: Respuesta = {
          error: true,
          msg: "Hubo un error al ejecutar la consulta",
          data: error
        };

        return res.json(response);
      });

});


/**
 * @description Elimina una empresa 
 */
router.post('/eliminarEmpresa', (req: Request, res: Response) => {
  let body = req.body;

  var token: string = req.header("Authorization");
  console.log("Token", token);
  console.log("body", body);
  
  let consulta = `
    DELETE FROM empresas WHERE id = ${body.id_empresa};
  `;
  console.log("consulta", consulta);
  
  Database.Instance.ejecutarConsulta(consulta, environments.requiereToken, token, (err: any, data: any) => {
    //Error si no se encuentra el usuario
    if (err) {
      let response: Respuesta = {
        error: true,
        msg: "Algo salio mal en la consulta.",
        data: err
      };

      return res.json(response);
    } else {
      
      let response: Respuesta = {
        error: false,
        msg: "Empresas eliminada de la bd con exito.",
        data: data
      };

      return res.json(response);
      }

    }).catch((error: any) => {
        //Algo salio mal
        let response: Respuesta = {
          error: true,
          msg: "Hubo un error al ejecutar la consulta",
          data: error
        };

        return res.json(response);
      });

});


/**
 * @description Editar una empresa
 */
router.post('/editarEmpresa', (req: Request, res: Response) => {
  let body = req.body;

  var token: string = req.header("Authorization");
  console.log("Token", token);
  console.log("body", body);

  let empresa: Empresa = {
    id: body.id,
    nombreEmpresa: body.nombreEmpresa,
    usuario: body.usuario,
  }
  
  let consulta = `
      UPDATE empresas SET nombreEmpresa = '${empresa.nombreEmpresa}', usuario = '${empresa.usuario}' WHERE id = ${empresa.id};
  `;

  console.log("consulta", consulta);
  
  Database.Instance.ejecutarConsulta(consulta, environments.requiereToken, token, (err: any, data: any) => {
    //Error si no se encuentra el usuario
    if (err) {
      let response: Respuesta = {
        error: true,
        msg: "Algo salio mal en la consulta.",
        data: err
      };

      return res.json(response);
    } else {
      
      let response: Respuesta = {
        error: false,
        msg: "Empresas editada en la bd con exito.",
        data: data
      };

      return res.json(response);
      }

    }).catch((error: any) => {
        //Algo salio mal
        let response: Respuesta = {
          error: true,
          msg: "Hubo un error al ejecutar la consulta",
          data: error
        };

        return res.json(response);
      });

});


////////////////////////////////////////////SUSCRIPCIONES CRUD/////////////////////////////////////////////////

/**
 * @description Ingresar una empresa nueva
 */
router.post('/nuevaSuscripcion', (req: Request, res: Response) => {
  let body = req.body;

  var token: string = req.header("Authorization");
  console.log("Token", token);
  console.log("body", body);

  let consulta = `
        INSERT INTO suscripciones (id,id_empresa,nombre_servicio,fecha_inicio,
          fecha_vencimiento,pagado, tipo, metodo_pago, recurrencia) 
        VALUES (NULL, ${body.id_empresa},'${body.nombre_servicio}','${body.fecha_inicio}','${body.fecha_vencimiento}', 
        ${body.pagado}, ${body.tipo}, '${body.metodo_pago}', '${body.recurrencia}');
  `;
  console.log("consulta", consulta);
  
  Database.Instance.ejecutarConsulta(consulta, environments.requiereToken, token, (err: any, data: any) => {
    //Error si no se encuentra el usuario
    if (err) {
      let response: Respuesta = {
        error: true,
        msg: "Algo salio mal en la consulta.",
        data: err
      };

      return res.json(response);
    } else {
      
      let response: Respuesta = {
        error: false,
        msg: "Suscripcion insertada en la bd con exito.",
        data: data
      };

      return res.json(response);
      }

    }).catch((error: any) => {
        //Algo salio mal
        let response: Respuesta = {
          error: true,
          msg: "Hubo un error al ejecutar la consulta",
          data: error
        };

        return res.json(response);
      });

});

/**
 * @description Elimina una sucripcion
 */
router.post('/eliminarSuscripcion', (req: Request, res: Response) => {
  let body = req.body;

  var token: string = req.header("Authorization");
  console.log("Token", token);
  console.log("body", body);

  let consulta = `
        DELETE FROM suscripciones WHERE id = ${body.id_suscripcion}
  `;
  console.log("consulta", consulta);
  
  Database.Instance.ejecutarConsulta(consulta, environments.requiereToken, token, (err: any, data: any) => {
    //Error si no se encuentra el usuario
    if (err) {
      let response: Respuesta = {
        error: true,
        msg: "Algo salio mal en la consulta.",
        data: err
      };

      return res.json(response);
    } else {
      
      let response: Respuesta = {
        error: false,
        msg: "Suscripcion eliminada en la bd con exito.",
        data: data
      };

      return res.json(response);
      }

    }).catch((error: any) => {
        //Algo salio mal
        let response: Respuesta = {
          error: true,
          msg: "Hubo un error al ejecutar la consulta",
          data: error
        };

        return res.json(response);
      });

});

/**
 * @description Editar una sucripcion
 */
router.post('/editarSuscripcion', (req: Request, res: Response) => {
  let body = req.body;

  var token: string = req.header("Authorization");
  console.log("Token", token);
  console.log("body", body);

  let suscripcion: Suscripcion = {
    id: body.id,
    nombre_servicio: body.nombre_servicio,
    fecha_inicio: body.fecha_inicio,
    fecha_vencimiento: body.fecha_vencimiento,
    pagado: body.pagado,
    tipo: body.tipo,
    metodo_pago: body.metodo_pago,
    recurrencia: body.recurrencia
  }
  
  let consulta = `
      UPDATE suscripciones SET 
      nombre_servicio = '${suscripcion.nombre_servicio}', 
      fecha_inicio = '${suscripcion.fecha_inicio}',
      fecha_vencimiento = '${suscripcion.fecha_vencimiento}',
      pagado = ${suscripcion.pagado},
      tipo = ${suscripcion.tipo},
      metodo_pago = '${suscripcion.metodo_pago}',
      recurrencia = '${suscripcion.recurrencia}'

      WHERE id = ${suscripcion.id};
  `;

  console.log("consulta", consulta);
  
  Database.Instance.ejecutarConsulta(consulta, environments.requiereToken, token, (err: any, data: any) => {
    //Error si no se encuentra el usuario
    if (err) {
      let response: Respuesta = {
        error: true,
        msg: "Algo salio mal en la consulta.",
        data: err
      };

      return res.json(response);
    } else {
      
      let response: Respuesta = {
        error: false,
        msg: "Suscripcion editada en la bd con exito.",
        data: data
      };

      return res.json(response);
      }

    }).catch((error: any) => {
        //Algo salio mal
        let response: Respuesta = {
          error: true,
          msg: "Hubo un error al ejecutar la consulta",
          data: error
        };

        return res.json(response);
      });

});




export const RecibosRouter = router;