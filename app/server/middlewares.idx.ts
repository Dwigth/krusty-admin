import cors from 'cors';
import helmet from 'helmet';
import requestIp from 'request-ip';
import compression from 'compression';
import { json, urlencoded } from 'express';

export const MIDDLEWARES: any[] = [
    cors(),
    helmet(),
    json({ limit: '50mb' }),
    urlencoded({ limit: '50mb' }),
    requestIp.mw(),
    compression()
];