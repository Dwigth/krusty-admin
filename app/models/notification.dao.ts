import { DAO } from "./dao";

export class NotificationDAO extends DAO {
    constructor() {
        super();
        this.tablename = 'notificaciones';
    }
}