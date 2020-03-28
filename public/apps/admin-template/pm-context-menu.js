/**
 * @fileoverview Leve modificación de menu contextual
 * @requires ProjectManagement
 * @see https://dev.to/iamafro/how-to-create-a-custom-context-menu--5d7p
 */
class ProjectManagementContextMenu {

    CONTEXT_MENU_ITEMS = [
        {
            label: 'Asignar tarea',
            icon: 'fa fa-plus-circle'
        }
    ]

    APPLY_ON_ELEMENTS = [
        'gantt_task_content'
    ];

    CONTEXT_MENU;

    CURRENT_ELEMENT;

    MenuVisible = false;

    constructor() {
        this.BuildContextMenu();
        // Abrir
        const self = this;
        document.addEventListener("contextmenu", function (e) {
            if (self.APPLY_ON_ELEMENTS.includes(e.srcElement.classList[0])) {
                e.preventDefault();
                self.CURRENT_ELEMENT = e.srcElement;
                const origin = {
                    left: e.pageX,
                    top: e.pageY
                };
                self.SetPosition(origin);
                return false;
            }
        });
        window.addEventListener("click", e => {
            if (self.MenuVisible) self.ToggleMenu("hide");
        });
    }

    /**
     * La estructura del context menu será de la siguiente forma:
     * -nav
     *  -ul
     *    -li
     *      -a
     */
    BuildContextMenu() {
        //Referencia a si mismo para funciones anidadas
        let self = this;
        // Creamos nuestro nav
        const nav = document.createElement('nav');
        nav.classList.add('menu')
        // Despues la lista
        const ul = document.createElement('ul');
        ul.classList.add('menu-options')
        // Insertamos la lista dentro del nav
        nav.appendChild(ul);

        this.CONTEXT_MENU_ITEMS.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('menu-option');
            const a = document.createElement('a');
            const icon = document.createElement('i');
            item.icon.split(' ').forEach(classs => icon.classList.add(classs))
            li.appendChild(a);
            a.textContent = item.label;
            a.prepend(icon);

            li.addEventListener('click', () => {
                window.ProjectManagement.AssignForm(self.CURRENT_ELEMENT);
            })

            ul.appendChild(li);
        });

        this.CONTEXT_MENU = nav;
        document.getElementsByTagName('body')[0].appendChild(this.CONTEXT_MENU);
    }

    ToggleMenu(command) {
        this.CONTEXT_MENU.style.display = command === "show" ? "block" : "none";
        this.MenuVisible = !this.MenuVisible;

    };

    SetPosition({ top, left }) {
        this.CONTEXT_MENU.style.left = `${left}px`;
        this.CONTEXT_MENU.style.top = `${top}px`;
        this.ToggleMenu('show');
    };

    GetTask() {

    }

}

const contextMenu = new ProjectManagementContextMenu();