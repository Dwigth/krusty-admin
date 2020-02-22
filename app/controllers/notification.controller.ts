/**
 * @description En esta clase controlador tendremos total manipulacion y contacto con 
 * el servicio de socket.io 
 */
import { Socket } from 'socket.io';

export class NotificationController {

    constructor(public socket: Socket) {
        this.GetNotifications();
    }

    GetNotifications() {
        this.socket.emit('news', { hello: 'world' });
        this.socket.on('my other event', function (data) {
            console.log(data);
        });
    }

}