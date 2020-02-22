require([
    'socket',
], function (io) {

    var socket = io.connect('http://localhost:3020');
    socket.on('news', function (data) {
        console.log(data);
        socket.emit('my other event', { my: 'data' });
    });
});