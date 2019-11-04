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
                route: '/matilde-keys',
                icon: 'fe fe-info'
            }
        ]
    },
    {
        name: 'Configuración',
        route: '/settings',
        icon: 'fe fe-settings'
    }
];
exports.ProfileMenuItems = [];
