import { Router } from "express";
import { HomeRouter } from "./home/home.route";

export const routes: Router[] = [
    HomeRouter
];