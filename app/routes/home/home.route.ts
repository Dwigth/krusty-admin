import express, { Request, Response } from 'express';
import { ShowKeys, CreateKeys } from '../../middlewares/home/keys-admin.mw';
import { AdminUserProfile, AdminUpdateProfile } from '../../middlewares/home/profile.mw';


export const HomeRouter = express.Router();

HomeRouter.get('/', (req: Request, res: Response) => {
    res.render('login', {
        title: 'Inicio de sesión'
    });
});
HomeRouter.get('/home', ShowKeys);
HomeRouter.get('/profile/:token/:username', AdminUserProfile)
HomeRouter.put('/profile/update', AdminUpdateProfile)

HomeRouter.post('/create-keys', CreateKeys);