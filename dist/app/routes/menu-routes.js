"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * =====================================
 *
 * Arreglo de items para poder construir
 * el menú
 *
 * =====================================
 */
exports.MenuItems = [
    {
        name: 'Home',
        route: '/home',
        icon: 'fe fe-home'
    },
    {
        name: 'Matilde',
        route: '/matilde',
        icon: 'fe fe-book-open',
        children: [
            {
                name: 'Clientes',
                route: '/matilde-clients'
            },
            {
                name: 'Llaves',
                route: '/matilde-keys'
            },
            {
                name: 'Catálogos',
                route: '/matilde-catalogs'
            }
        ]
    },
    {
        name: 'Configuración',
        route: '/settings',
        icon: 'fe fe-settings'
    }
];
exports.ProfileMenuItems = [
    {
        name: 'Perfil',
        route: '/profile',
        icon: 'fe fe-user'
    },
    {
        name: 'Configuración',
        route: '/user-settings',
        icon: 'fe fe-settings'
    },
    {
        name: 'Inbox',
        route: '/inbox',
        icon: 'fe fe-mail',
        notification: {
            count: 6,
            color: 'primary'
        }
    },
    {
        name: 'Mensajes',
        route: '/messages',
        icon: 'fe fe-send'
    }
];
