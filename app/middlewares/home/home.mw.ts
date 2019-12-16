import { Request, Response } from "express";
import { PlannerController } from "../../controllers/general/planner.controller";
import { AdminController } from "../../controllers/models/admin.controller";

export async function Settings(req: Request, res: Response) {

    const isAdmin = (req.cookies.isAdmin == 'true') ? true : false;

    const id_admin = req.cookies.id_admin;
    if (isAdmin) {
        const adminctl = new AdminController();

        adminctl.id_admin = id_admin;

        const admins = await adminctl.GetAdmins();

        res.render('settings', { isAdmin, admins });
    }
    else {
        res.render('settings', { isAdmin });
    }
}
export async function Home(req: Request, res: Response) {
    const Planner = new PlannerController();
    const ProjectsCount = await Planner.ProjectsCount();

    res.render('home', {
        ProjectsCount: ProjectsCount[0].TOTAL
    })
}
