import express, { Request, Response } from 'express';
import { ShowKeys, CreateKeys } from '../../middlewares/home/keys-admin.mw';
import { AdminUserProfile, AdminUpdateProfile } from '../../middlewares/home/profile.mw';
import { Settings, Home } from '../../middlewares/home/home.mw';


export const HomeRouter = express.Router();

HomeRouter.get('/', (req: Request, res: Response) => {
    res.render('login', {
        title: 'Inicio de sesión'
    });
});
HomeRouter.get('/home', Home);
HomeRouter.get('/profile/:token/:username', AdminUserProfile)
HomeRouter.get('/settings', Settings)

HomeRouter.put('/profile/update', AdminUpdateProfile)
HomeRouter.post('/create-keys', CreateKeys);