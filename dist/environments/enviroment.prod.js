"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environments = {
    /**
     * Información de la base de datos
    */
    database: {
        connectionLimit: 10,
        host: process.env.HOST || 'localhost',
        user: process.env.DBUSER || 'root',
        password: process.env.DBPASS || 'rootroot',
        database: process.env.DATABASE || 'tscbit_matilde',
        timezone: 'UTC'
    },
    /**
     *
     */
    logging: true,
    enableSSL: true,
    SSLConfig: {
        cert: '/etc/letsencrypt/live/tscbit.com/cert.pem',
        key: '/etc/letsencrypt/live/tscbit.com/privkey.pem'
    },
    MatildeAPIURL: 'https://tscbit.com:3000',
    Session: {
        Secret: 'asbn2',
        expires: 3600000
    },
    PORT: process.env.PORT || 3000,
    mailConfig: {
        FORGOT_PASSWORD_URL: process.env.FORGOT_PASSWORD_URL || 'http://localhost:3000',
        nodemailer: {
            host: "tscbit.com",
            port: 465,
            secure: true,
            auth: {
                user: "alfa@tscbit.com",
                pass: "TLOVpfM[#S}H"
            },
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false
            }
        }
    },
    Socket: {
        PORT: 3020
    }
};
// export const environments = {
//     database: {
//         connectionLimit: 10,
//         host: 'localhost',
//         user: process.env.DBUSER || 'root',
//         password: process.env.DBPASS || '',
//         // database: 'tscbit_matilde',
//         database: 'krusty_machine',
//         timezone: 'utc'
//     },
// }
