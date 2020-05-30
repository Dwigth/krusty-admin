import { Router } from "express";
import { RecibosRouter } from './recibos';

export const ServerRoutes: Router[] = [
    RecibosRouter,
];