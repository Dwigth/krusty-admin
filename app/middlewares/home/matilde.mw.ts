import { Request, Response } from "express";
import axios from 'axios';
import { ClienteController } from "../../controllers/models/matilde/cliente.controller";
import { TiendaController } from "../../controllers/models/matilde/tienda.controller";
import { PrincipioController } from "../../controllers/models/matilde/principio.controller";
import { ProductoController } from "../../controllers/models/matilde/producto.controller";
import { MetodoController } from "../../controllers/models/matilde/metodo.controller";

export async function MatildeClients(req: Request, res: Response) {
    const ct = new ClienteController();
    const resp = await ct.GetClientsWithLicences();
    res.render('matilde-clients', { clients: resp })
}

export async function MatildeCatalogs(req: Request, res: Response) {
    const tiendactl = new TiendaController();
    const princioctl = new PrincipioController();
    const productoctl = new ProductoController();
    const metodoctl = new MetodoController();

    const tiendas = await tiendactl.GetAll();
    const metodos = await metodoctl.GetAll();
    const principios = await princioctl.GetAll();
    const productos = await productoctl.GetAll();

    res.render('matilde-catalogs', {
        tiendas: tiendas,
        metodos: metodos,
        principios: principios,
        productos: productos,
    });
}

/**
 * ====================================================
 * 
 * Se debe obtener el nombre de usuario y el token
 * actual para poder proceder
 * 
 * ====================================================
 */
export async function MatildeCatalogsHandler(req: Request, res: Response) {
    const action = req.params.action;
    const table = req.params.table;
    console.log(action, table);
    res.json({ action, table });
}