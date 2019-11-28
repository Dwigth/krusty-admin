"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environments = {
    /**
     * Información de la base de datos
    */
    database: {
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'tscbit_matilde',
        timezone: 'utc'
    },
    /**
     *
     */
    logging: true,
    enableSSL: false,
    SSLConfig: {
        cert: '',
        key: ''
    },
    MatildeAPIURL: 'https://tscbit.com:3000',
    Session: {
        Secret: 'asbn2',
        expires: 3600000
    },
    PORT: 3000,
    mailConfig: {
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
    }
};
