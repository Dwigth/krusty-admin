import express, { Request, Response } from 'express';
import { ShowKeys, CreateKeys } from '../../middlewares/home/keys-admin.mw';
import { AdminUserProfile, AdminUpdateProfile, UploadCoverPic, UploadProfilePic } from '../../middlewares/home/profile.mw';
import { Settings, Home } from '../../middlewares/home/home.mw';
import { GetAdministrators } from '../../middlewares/auth/auth.mw';
import multer from 'multer';

const upload = multer({ dest: 'public/uploads/' });

export const HomeRouter = express.Router();

HomeRouter.get('/', (req: Request, res: Response) => {
    res.render('login', {
        title: 'Inicio de sesión'
    });
});
HomeRouter.get('/home', Home);
HomeRouter.get('/profile/:token/', AdminUserProfile)
HomeRouter.get('/settings', Settings)

HomeRouter.put('/profile/update', AdminUpdateProfile)
HomeRouter.post('/create-keys', CreateKeys);

HomeRouter.post('/profile/upload-profile-pic', upload.single('profile'), UploadProfilePic)
HomeRouter.post('/profile/upload-cover-pic', upload.single('cover'), UploadCoverPic)

HomeRouter.post('/admins/getAllExceptMe', GetAdministrators)