import { Router } from "express";
import {
    GetProjects,
    Planner,
    CreateProject,
    CreateTask,
    UpdateTask,
    InviteToProject,
    UpdateProject,
    AssingTask,
    UnassingTask,
    DeleteProject
} from "../../middlewares/general/planner.mw";

export const PlannerRouter = Router();


PlannerRouter.get('/planner/:admin', Planner)
PlannerRouter.get('/planner/:admin/projects', GetProjects)
PlannerRouter.post('/planner/create/', CreateProject)
PlannerRouter.patch('/planner/update/', UpdateProject)
PlannerRouter.delete('/planner/delete', DeleteProject)
PlannerRouter.post('/planner/tasks/create', CreateTask)
PlannerRouter.post('/planner/invite', InviteToProject)
PlannerRouter.patch('/planner/tasks/update', UpdateTask)
PlannerRouter.post('/planner/tasks/assing', AssingTask)
PlannerRouter.post('/planner/tasks/unassing', UnassingTask)
