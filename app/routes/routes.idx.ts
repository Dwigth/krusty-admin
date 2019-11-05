import { Router } from "express";
import { AuthRoutes } from "./auth/routes.idx";
import { HomeRoutes } from "./home/routes.idx";
import { MatildeRouter } from "./home/matilde";

export let routes: Router[] = [];

routes = routes.concat(
    AuthRoutes,
    HomeRoutes,
    MatildeRouter
);