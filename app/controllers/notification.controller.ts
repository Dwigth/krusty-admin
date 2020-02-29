/**
 * @description En esta clase controlador tendremos total manipulacion y contacto con 
 * el servicio de socket.io 
 */
import { Socket } from 'socket.io';
import { UserClientData } from '../interfaces/classes/user';
import { NotificationDAO } from '../models/notification.dao';
import moment from 'moment';

export class NotificationController {
    /**
     * 
     * @param socket Obtiene el socket desde el server
     */
    constructor(public socket: Socket) {
        this.GetNotifications();
        this.AddNotification();
    }

    private GetNotifications() {
        const global = this.socket;
        const self = this;

        this.socket.on('mynotifications', async function (data) {
            const user: UserClientData = data.user;
            const notifications = await self.NotificationsByUser(user);
            global.emit('mynotifications', { notifications });
        });
    }

    private async NotificationsByUser(user: UserClientData) {
        const notdao = new NotificationDAO();
        let notifications = await notdao.GetAll({ append: [`WHERE cve_usuario = ${user.id_admin}`] });
        return notifications = notifications.map((n: any) => {
            n.fecha_creacion = moment(n.fecha_creacion).utc().format('YYYY-MM-DD HH:mm:ss');
            return n;
        })
    }

    private AddNotification() {
        const global = this.socket;
        const self = this;
        this.socket.on('addnotification', async function (data) {
            const notification = JSON.parse(JSON.stringify(data));
            delete notification.notification.Sender;
            const notdao = new NotificationDAO();
            // console.log(notification);
            await notdao.Insert(notification.notification);
            // console.log(data.notification.Sender);

            const notifications = await self.NotificationsByUser(data.notification.Sender);
            global.emit('mynotifications', { notifications });
        });
    }

}