import { Request, Response } from "express";
import { PlannerController } from "../../controllers/general/planner.controller";

export async function Settings(req: Request, res: Response) {
    res.render('settings');
}
export async function Home(req: Request, res: Response) {
    const Planner = new PlannerController();
    const ProjectsCount = await Planner.ProjectsCount();

    res.render('home', {
        ProjectsCount: ProjectsCount[0].TOTAL
    })
}
