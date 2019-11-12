import { Pool } from "mysql";

export interface MySQLResponse {
    OkPacket?: OkPacket;
}

export interface IDatabase {
    Pool: Pool;
    Query: Function;
}

export interface OkPacket {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    serverStatus: number;
    warningCount: number;
    message: string;
    protocol41: boolean,
    changedRows: number;
}