class Session {
    constructor() { }
    Destroy() {
        // Eliminamos el objeto usuario
        localStorage.removeItem('user');
        // Lo enviamos al login
        window.location.href = '/';
    }
    Watch() {
        // Obtenemos el objeto usuario
        const session = localStorage.getItem('user');
        // Arreglo de pathnames en las que no se aplica esta redirección
        const allowedPaths = ['/', '/login'];
        // Verificamo que la url actual no esté dentro de las permitidas
        if (!allowedPaths.includes(window.location.pathname)) {
            if (session == null) {
                console.error('No hay sesión iniciada con anterioridad');
                window.location.href = '/';
            }
        }
    }
}
const session = new Session();
session.Watch();
document.getElementById('cerrar-sesion').addEventListener('click', () => { session.Destroy() });