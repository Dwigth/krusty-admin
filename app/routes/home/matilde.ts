import express, { Request, Response } from 'express';
import { MatildeClients } from '../../middlewares/home/matilde.mw';
import { ShowKeys } from '../../middlewares/home/keys-admin.mw';


export const MatildeRouter = express.Router();

MatildeRouter.get('/matilde-clients', MatildeClients);
MatildeRouter.get('/matilde-keys', ShowKeys);