import { Request, Response } from "express";

import { AdminController } from "../../controllers/models/admin.controller";
import { environments } from "../../../environments/enviroment";
import { AdminProfileController } from "../../controllers/models/admin_profile.controller";
import { AdminProfile } from "../../interfaces/Database/models/admin_profile";


/**
 * [GET]
 * @todo Pendiente documentación
 */
export async function AdminUserProfile(req: Request, res: Response) {
    const username = req.params.username;
    const token = req.params.token;

    const adminCtl = new AdminController();
    // Obtener sus datos de sesión
    const adminUser = await adminCtl.SearchAdminByParam('usuario', username).then(resp => resp[0]);
    adminUser.guest = false;

    if (token !== adminUser.token) {
        adminUser.guest = true;
        console.log('Solo carga la vista');
    }

    delete adminUser.contrasena;
    const adminProfileObj = { id_admin: adminUser.id_admin };

    const adminProfileCtl = new AdminProfileController(<AdminProfile>adminProfileObj);
    // Obtener sus datos
    const AdminProfileData = await adminProfileCtl.GetByAdminId();

    adminUser.data = AdminProfileData;

    res.render('profile', { adminUser: adminUser });
}

/**
 * [PUT]
 * @description Actualiza los datos del perfil de administrador
 * @param req 
 * @param res 
 */
export async function AdminUpdateProfile(req: Request, res: Response) {
    const incomingData = <AdminProfile>req.body;
    console.log(incomingData);

    const adminCtl = new AdminController();
    adminCtl.id_admin = incomingData.id_admin;
    adminCtl.email = incomingData.email;
    adminCtl.nombre = incomingData.usuario;
    await adminCtl.UpdateAdminName();
    await adminCtl.UpdateAdminEmail();


    const adminProfileCtl = new AdminProfileController(incomingData);
    await adminProfileCtl.Update();
    res.json({ msg: 'Su perfil ha sido actualizado' })
}