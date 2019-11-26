import { Router } from "express";
import { PlannerRouter } from "./planner.route";

export const GeneralRoutes: Router[] = [
    PlannerRouter
];  