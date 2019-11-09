import axios from 'axios';
import { environments } from '../../../../environments/enviroment';
import https from 'https';

export class KeysController {
    constructor() { }

    public async GetKeys() {
        const intance = axios.create({
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        })
        const resp = await intance.post(environments.MatildeAPIURL + '/actions', { comando: 'listar' });
        return resp.data.data;
    }
}