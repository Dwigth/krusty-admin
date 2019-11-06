import express, { Request, Response } from 'express';
import { ShowKeys, CreateKeys } from '../../middlewares/home/keys-admin.mw';


export const HomeRouter = express.Router();

HomeRouter.get('/', (req: Request, res: Response) => {
    res.render('login', {
        title: 'Inicio de sesión'
    });
});
HomeRouter.get('/home', ShowKeys);

HomeRouter.post('/create-keys', CreateKeys);