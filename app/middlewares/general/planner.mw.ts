import { Request, Response } from "express";
import { PlannerController } from "../../controllers/general/planner.controller";
import { IProyecto } from "../../interfaces/Database/models/planner/proyecto";
import { ITareas } from "../../interfaces/Database/models/planner/tareas";
import { flattenDeep } from 'lodash'

export async function CreateProject(req: Request, res: Response) {
    let IncomingPlanner = <IProyecto>req.body.proyecto;
    const plannerctl = new PlannerController(IncomingPlanner);
    console.log('Project => ', plannerctl.GetProject());
    let project = await plannerctl.Create();
    console.log(project);
    res.json({ msg: 'ok' })
}

export async function UpdateProject(req: Request, res: Response) {
    let IncomingPlanner = <IProyecto>req.body.proyecto;
    const plannerctl = new PlannerController(IncomingPlanner);
    let project = await plannerctl.Update();
    console.log(project);

    res.json({ msg: 'ok' })
}

export async function CreateTask(req: Request, res: Response) {
    let IncomingTask = <ITareas[]>req.body.tareas;
    console.log(IncomingTask);
    const plannerctl = new PlannerController();
    plannerctl.SetTask(IncomingTask);
    let tasks = await plannerctl.CreateTask();
    if (Array.isArray(tasks)) {
        tasks = flattenDeep(tasks);
    }
    res.json({ msg: 'ok', tasks })

}

export async function UpdateTask(req: Request, res: Response) {
    let IncomingTask = <ITareas[]>req.body.tareas;
    const plannerctl = new PlannerController();
    plannerctl.SetTask(IncomingTask);
    let tasks = await plannerctl.UpdateTask();
    if (Array.isArray(tasks)) {
        tasks = flattenDeep(tasks);
    }
    res.json({ msg: 'ok', tasks })
}


export async function Planner(req: Request, res: Response) {
    const id_admin = +req.params.admin;
    const plannerctl = new PlannerController();
    plannerctl.SetCurrentUser(id_admin);
    const projects = await plannerctl.GetProjectsByUser();
    res.render('planner', { projects })
}

export async function GetProjects(req: Request, res: Response) {
    const id_admin = +req.params.admin;
    const plannerctl = new PlannerController();
    plannerctl.SetCurrentUser(id_admin);
    const projects = await plannerctl.GetProjectsByUser();
    res.json(projects)
}

export async function InviteToProject(req: Request, res: Response) {
    const id_proyecto = +req.body.id_proyecto;
    const guests = req.body.invitados;

    const project = { id: id_proyecto };
    const plannerctl = new PlannerController();
    plannerctl.SetProject(<IProyecto>project);
    plannerctl.SetGuests(guests);
    let result = plannerctl.InviteToProject();
    res.json({ msg: 'ok' });
}
export async function AssingTask(req: Request, res: Response) {
    const guests = req.body.invitados;
    const id_tarea = +req.body.id_tarea;

    const plannerctl = new PlannerController();
    plannerctl.SetTask(<ITareas>{ id: id_tarea });
    plannerctl.SetGuests(guests);
    const resp = await plannerctl.AssignAdminTask();
    res.json({ msg: 'ok' });
}
export async function UnassingTask(req: Request, res: Response) {
    const guests = req.body.invitados;
    const id_tarea = +req.body.id_tarea;

    const plannerctl = new PlannerController();
    plannerctl.SetTask(<ITareas>{ id: id_tarea });
    plannerctl.SetGuests(guests);
    const resp = await plannerctl.AssignAdminTask();
    res.json({ msg: 'ok' });
}