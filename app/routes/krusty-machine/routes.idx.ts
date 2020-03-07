import { Router } from "express";
import { ServerRouter } from './servers';
import { LoginAdminRouter } from './authAdmin';

export const ServerRoutes: Router[] = [
    ServerRouter,
    LoginAdminRouter
];