import { Request, Response } from "express";

export async function Settings(req: Request, res: Response) {
    res.render('settings');
}
export async function Home(req: Request, res: Response) {
    res.render('home')
}