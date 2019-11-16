import { IMenuItem } from "../interfaces/controllers/Menu/menu-item";

/**
 * =====================================
 * 
 * Arreglo de items para poder construir
 * el menú 
 * 
 * =====================================
 */

export const MenuItems: IMenuItem[] = [
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
];

export const ProfileMenuItems: IMenuItem[] = [
    {
        name: 'Perfil',
        route: '/profile',
        icon: 'fe fe-user'
    },
    {
        name: 'Configuración',
        route: '/settings',
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
        name: 'Planeador',
        route: '/planner',
        icon: 'fe fe-calendar'
    },
    {
        name: 'Mensajes',
        route: '/messages',
        icon: 'fe fe-send'
    }
]; 