import { Router } from "express";
import { GetProjects, Planner, CreateProject, CreateTask, UpdateTask } from "../../middlewares/general/planner.mw";

export const PlannerRouter = Router();


PlannerRouter.get('/planner/:admin', Planner)
PlannerRouter.get('/planner/:admin/projects', GetProjects)
PlannerRouter.post('/planner/create/', CreateProject)
PlannerRouter.post('/planner/tasks/create', CreateTask)
PlannerRouter.patch('/planner/tasks/update', UpdateTask)
