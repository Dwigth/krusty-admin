import { Request, Response } from "express";
import axios from 'axios';
import { ClienteController } from "../../controllers/models/matilde/cliente.controller";
import { TiendaController } from "../../controllers/models/matilde/tienda.controller";
import { PrincipioController } from "../../controllers/models/matilde/principio.controller";
import { ProductoController } from "../../controllers/models/matilde/producto.controller";
import { MetodoController } from "../../controllers/models/matilde/metodo.controller";
import { environments } from "../../../environments/enviroment";

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

export async function MatildeCatalogsNames(req: Request, res: Response) {
    const tiendactl = new TiendaController();
    const princioctl = new PrincipioController();
    const productoctl = new ProductoController();
    const metodoctl = new MetodoController();
    res.json({
        tiendas: await tiendactl.GetNames(),
        principios: await princioctl.GetNames(),
        productos: await productoctl.GetNames(),
        metodos: await metodoctl.GetNames()
    })
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
    const data = req.body;

    if (environments.logging) {
        console.log(data)
    }

    switch (table) {
        case 'tienda':

            const tiendactl = new TiendaController();

            switch (action) {
                case 'read':
                    tiendactl.GetAll().then(data => res.json(data)).catch(e => res.json(e))
                    break;
                case 'create':
                    tiendactl.Create(data).then(resp => {
                        res.json({ msg: 'Crear un item de tienda' })
                    }).catch(e => {
                        res.json({ msg: 'Crear un item de tienda' })
                    });
                    break;
                case 'update':
                    tiendactl.Update(data).then(resp => {
                        res.json({ msg: 'Actualizar un item de tienda' })
                    }).catch(e => {
                        res.json({ msg: 'Actualizar un item de tienda' })
                    });
                    break;
                case 'delete':
                    tiendactl.Delete(data).then(resp => {
                        res.json({ msg: 'Eliminar un item de tienda' })
                    }).catch(e => {
                        res.json({ msg: 'Error al eliminar un item de tienda' })
                    });
                    break;

                default:
                    res.json({ msg: 'Debe especificar una acción item de tienda' })
                    break;
            }
            break;
        case 'metodo':
            const metodoctl = new MetodoController();

            switch (action) {
                case 'read':
                    metodoctl.GetAll().then(data => res.json(data)).catch(e => res.json(e))
                    break;
                case 'create':
                    metodoctl.Create(data).then(resp => {
                        res.json({ msg: 'Crear un item de tienda' })
                    }).catch(e => {
                        res.json({ msg: 'Crear un item de tienda' })
                    });
                    break;
                case 'update':
                    metodoctl.Update(data).then(resp => {
                        res.json({ msg: 'Actualizar un item de metodo' })
                    }).catch(e => {
                        res.json({ msg: 'Actualizar un item de metodo' })
                    });

                    break;
                case 'delete':
                    metodoctl.Delete(data).then(resp => {
                        res.json({ msg: 'Eliminar un item de metodo' })
                    }).catch(e => {
                        res.json({ msg: 'Error al eliminar un item de metodo' })
                    });
                    break;

                default:
                    res.json({ msg: 'Debe especificar una acción item de metodos' })
                    break;
            }
            break;
        case 'principio':
            const princioctl = new PrincipioController();

            switch (action) {
                case 'read':
                    princioctl.GetAll().then(data => res.json(data)).catch(e => res.json(e))
                    break;
                case 'create':
                    princioctl.Create(data).then(resp => {
                        res.json({ msg: 'Crear un item de tienda' })
                    }).catch(e => {
                        res.json({ msg: 'Crear un item de tienda' })
                    });
                    break;
                case 'update':
                    princioctl.Update(data).then(resp => {
                        res.json({ msg: 'Actualizar un item de principio' })
                    }).catch(e => {
                        res.json({ msg: 'Actualizar un item de principio' })
                    });

                    break;
                case 'delete':
                    princioctl.Delete(data).then(resp => {
                        res.json({ msg: 'Eliminar un item de principio' })
                    }).catch(e => {
                        res.json({ msg: 'Error al eliminar un item de principio' })
                    });

                    break;

                default:
                    res.json({ msg: 'Debe especificar una acción item de principios' })
                    break;
            }
            break;
        case 'producto':
            const productoctl = new ProductoController();
            switch (action) {
                case 'read':
                    productoctl.GetAll().then(data => res.json(data)).catch(e => res.json(e))
                    break;
                case 'create':
                    productoctl.Create(data).then(resp => {
                        res.json({ msg: 'Crear un item de producto' })
                    }).catch(e => {
                        res.json({ msg: 'Crear un item de producto' })
                    });
                    break;
                case 'update':
                    productoctl.Update(data).then(resp => {
                        res.json({ msg: 'Actualizar un item de producto' })
                    }).catch(e => {
                        res.json({ msg: 'Actualizar un item de producto' })
                    });

                    break;
                case 'delete':
                    productoctl.Delete(data).then(resp => {
                        res.json({ msg: 'Eliminar un item de producto' })
                    }).catch(e => {
                        res.json({ msg: 'Error al eliminar un item de producto' })
                    });

                    break;

                default:
                    res.json({ msg: 'Debe especificar una acción item de productos' })
                    break;
            }
            break;

        default:
            res.json({ msg: 'Su consulta está mal formada' });
            break;
    }
}