import { Request, Response } from "express";
import axios from 'axios';
import { environments } from '../../../environments/enviroment';
import https from 'https';
import { ICreationKey } from "../../interfaces/Database/IKeys";

export async function ShowKeys(req: Request, res: Response) {
    const intance = axios.create({
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    })
    const resp = await intance.post(environments.MatildeAPIURL + '/actions', { comando: 'listar' });

    res.render('admin-llaves', { keys: resp.data.data });
}

export async function CreateKeys(req: Request, res: Response) {
    const intance = axios.create({
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    })
    const ck: ICreationKey = req.body;
    ck.cantidad = Number(ck.cantidad);

    if (ck.cantidad > 0) {
        const resp = await intance.post(environments.MatildeAPIURL + '/actions', { comando: 'crear', cantidad: ck.cantidad, tipo: ck.tipo });
    }

    res.redirect('/home')
}