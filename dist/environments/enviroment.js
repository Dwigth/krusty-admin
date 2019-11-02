"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environments = {
    database: {
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'tscbit_matilde'
    },
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
    PORT: 3000
};
