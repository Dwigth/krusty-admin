"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NotificationController = /** @class */ (function () {
    function NotificationController(socket) {
        this.socket = socket;
        this.GetNotifications();
    }
    NotificationController.prototype.GetNotifications = function () {
        this.socket.emit('news', { hello: 'world' });
        this.socket.on('my other event', function (data) {
            console.log(data);
        });
    };
    return NotificationController;
}());
exports.NotificationController = NotificationController;
