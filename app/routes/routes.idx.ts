import { Router } from "express";
import { AuthRoutes } from "./auth/routes.idx";
import { HomeRoutes } from "./home/routes.idx";
import { MatildeRouter } from "./home/matilde";
import { GeneralRoutes } from "./general/routes.idx";

export let routes: Router[] = [];

routes = routes.concat(
    AuthRoutes,
    HomeRoutes,
    MatildeRouter,
    GeneralRoutes
);