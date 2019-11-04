import { IHelperModel } from "../../../interfaces/helpers/helper";
import hbs from 'hbs';
import { MenuItems, ProfileMenuItems } from "../../../routes/menu-routes";

/**
 * =======================================================
 * 
 * Arreglo de objetos que contienen helpers personalizados
 * por modulo (carpeta).
 * 
 * =======================================================
 */
export const MenuHelperManager: IHelperModel[] = [
    {
        name: 'main_menu_builder',
        function: () => {

            let menu = '';
            const length = MenuItems.length;

            for (let i = 0; i < length; i++) {
                const item = MenuItems[i];
                if (item.children == undefined) {
                    const itemElem =
                        `
                    <li class="nav-item">
                        <a href="${item.route}" class="nav-link">
                            <i class="${item.icon}">
                        </i> ${item.name}</a>
                    </li>
                    `;
                    menu += itemElem;
                } else {
                    let itemElem =
                        `
                    <li class="nav-item">
                        <a href="javascript:void(0)" class="nav-link" data-toggle="dropdown">
                            <i class="${item.icon}"></i>
                            ${item.name}
                        </a>
                        <div class="dropdown-menu dropdown-menu-arrow">
                        `;
                    for (let j = 0; j < item.children.length; j++) {
                        const child = item.children[j];
                        itemElem +=
                            `<a href="${child.route}" class="dropdown-item ">${child.name}</a>`;
                    }
                    itemElem += ' </div></li>';
                    menu += itemElem;
                }

            }
            return new hbs.handlebars.SafeString(menu);
        }
    },
    {
        name: 'user_menu_builder',
        function: () => {
            let menu = '';
            const length = ProfileMenuItems.length;
            for (let i = 0; i < length; i++) {
                const item = ProfileMenuItems[i];
                //Aqui irá cualquier excepción para mostrar la cuenta de las notificaciones

                let itemElem =
                    `
                    <a class="dropdown-item" href="${item.route}">`;
                if (item.notification) {
                    itemElem += `
                        <span class="float-right"><span class="badge badge-${item.notification.color}">${item.notification.count}</span></span>`;
                }

                itemElem += `
                        <i class="dropdown-icon ${item.icon}"></i> ${item.name}
                    </a>
                    `;
                menu += itemElem;
            }
            return new hbs.handlebars.SafeString(menu);
        }
    }
];