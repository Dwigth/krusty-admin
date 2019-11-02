import cors from 'cors';
import helmet from 'helmet';
import requestIp from 'request-ip';
import compression from 'compression';
import session from 'express-session';
import { json, urlencoded } from 'express';
import { environments } from '../../environments/enviroment';

export const MIDDLEWARES: any[] = [
    cors(),
    helmet(),
    json({ limit: '50mb' }),
    urlencoded({ limit: '50mb' }),
    requestIp.mw(),
    compression(),
    session({
        secret: environments.Session.Secret,
        cookie: {
            maxAge: new Date(Date.now() + environments.Session.expires).getMilliseconds(),
            expires: new Date(Date.now() + environments.Session.expires),
        }
    }),
];