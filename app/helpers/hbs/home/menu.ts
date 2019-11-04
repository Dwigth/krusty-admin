import { IHelperModel } from "../../../interfaces/helpers/helper";
import hbs from 'hbs';
import { MenuItems } from "../../../routes/menu-routes";

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
        name: 'menu_builder',
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
    }
];