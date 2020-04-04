class UserListContextMenu extends ProjectManagementContextMenu {

    CONTEXT_MENU_ITEMS;

    CONTEXT_MENU;

    PREVIUS_SELECTED_USERS;

    constructor() {
        const build = { build: false }
        super(build);
        const users = window.ProjectManagement.CurrentProject.invitados;
        this.CONTEXT_MENU_ITEMS = users.map(user => { user.seleccionado = false; return user; });
        this.PREVIUS_SELECTED_USERS = contextMenu.SELECTED_TASK.asignados;
        this.CONTEXT_MENU_ITEMS.forEach(user => {
            const found = this.PREVIUS_SELECTED_USERS.find(puser => puser.id_admin === user.id_admin);
            if (found) {
                user.seleccionado = true;
            }
            return user;
        })
        this.BuildContextMenu();
        this.SetPosition(contextMenu.CURREN_POSITION)
    }

    /**
     * @override
     */
    BuildContextMenu() {
        //Referencia a si mismo para funciones anidadas
        let self = this;
        let id = 'context-user-list';
        let nav;
        if (document.getElementById(id) == null) {
            // Creamos nuestro nav
            nav = document.createElement('nav');
            nav.classList.add('menu')
            nav.id = id;
        } else {
            nav = document.getElementById(id);
            nav.innerHTML = '';
        }
        // Despues la lista
        const ul = document.createElement('ul');
        ul.classList.add('menu-options')
        // Insertamos la lista dentro del nav
        nav.appendChild(ul);

        this.CONTEXT_MENU_ITEMS.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('menu-option');
            const a = document.createElement('a');
            const box = document.createElement('input')
            box.type = 'checkbox';
            box.checked = item.seleccionado;
            li.appendChild(a);
            a.textContent = item.nombre;
            a.prepend(box);

            li.addEventListener('click', () => {
                box.checked = !box.checked;
                item.seleccionado = box.checked;
            })

            ul.appendChild(li);
        });

        // Agregar boton
        const hr = document.createElement('hr');
        const button = document.createElement('button');
        button.textContent = 'Asignar';
        button.classList.add('btn', 'btn-primary', 'btn-block')
        button.addEventListener('click', () => {
            self.ToggleMenu("hide");
            // Agregar la tarea
            const asignados = self.CONTEXT_MENU_ITEMS.filter(user => user.seleccionado == true)
            contextMenu.SELECTED_TASK.asignados = asignados;
            window.ProjectManagement.AssignTask(contextMenu.SELECTED_TASK);
            window.ProjectManagement.AddUsersImgsToTaskBar(contextMenu.SELECTED_TASK.id)
        });
        nav.append(hr, button)

        this.CONTEXT_MENU = nav;

        document.getElementsByTagName('body')[0].appendChild(this.CONTEXT_MENU);
    }
}