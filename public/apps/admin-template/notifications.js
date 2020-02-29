class Notifications {
    constructor(socket, moment) {
        moment.locale('es-us');
        this.moment = moment;
        this.socket = socket;
        this.notifications = [];

        socket.emit('mynotifications', { user: session.Get() });
        const self = this;
        socket.on('mynotifications', function (data) {
            self.notifications = [];
            self.notifications = data.notifications;
            console.log('notificaciones', data);
            self.Builder(self.notifications, self.moment);
        });
        // this.AddNotification();
    }

    /**
     * Crea los elementos dentro del contenedor de notificaciones
     * @param {*} data 
     * @param {*} moment 
     */
    Builder(data, moment) {
        const container = document.getElementById('notification-container');

        if (data.length === 0) {
            data.push({
                img: '/images/alert.jpg',
                mensaje: 'Aún no tienes notificaciones',
                fecha_creacion: moment().format('YYYY-MM-DD HH:mm:ss')
            })
        }

        data.map(notificacion => {

            const a = document.createElement('a');
            a.classList.add('dropdown-item', 'd-flex');

            const span = document.createElement('span');
            span.classList.add('avatar', 'mr-3', 'align-self-center');
            span.style.backgroundImage = `url(${notificacion.img})`;

            const div = document.createElement('div');
            div.textContent = notificacion.mensaje;

            const divTime = document.createElement('div');
            divTime.classList.add('small', 'text-muted');
            divTime.textContent = moment(
                moment(notificacion.fecha_creacion).format('YYYY-MM-DD HH:mm:ss')
            ).from(moment());

            div.appendChild(divTime);
            a.append(span, div);
            container.prepend(a);
        });
    }

    AddNotification() {
        const data = {
            Sender: session.Get(),
            cve_usuario: 3,
            titulo: 'Test n',
            subtitulo: 'Subtitulo n',
            mensaje: 'Mensaje n',
            img: session.Get().img,
            url: '#',
            fecha_creacion: this.moment().format('YYYY-MM-DD HH:mm:ss'),
        };
        this.socket.emit('addnotification', { notification: data });
    }
}

require([
    'socket',
    'moment'
], function (io, moment) {
    var socket = io.connect('http://localhost:3020');
    const notifications = new Notifications(socket, moment);
});