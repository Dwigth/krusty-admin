import { Router, Request, Response } from "express";
import { Login } from "../../middlewares/auth/login.mw";

export const AuthRouter = Router();

AuthRouter.get('/login');
AuthRouter.post('/login', Login);