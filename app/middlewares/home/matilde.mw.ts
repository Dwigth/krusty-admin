import { Request, Response } from "express";
import axios from 'axios';
import { ClienteController } from "../../controllers/models/matilde/cliente.controller";

export async function MatildeClients(req: Request, res: Response) {
    const ct = new ClienteController();
    const resp = await ct.GetClientsWithLicences();
    res.render('matilde-clients', { clients: resp })
}

