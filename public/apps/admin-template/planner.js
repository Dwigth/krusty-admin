/**
 * @author Dwigth Astacio
 * @description
 * @requires util.js
 * @requires modal.js
 * @todo Implementar obtención de datos por SELECT
 * @see https://frappe.io/gantt
 * @see https://github.com/frappe/gantt
 */
class Planner {

    Sortable = {};
    Moment = {};

    constructor() {
        const initialWrapper = async () => {
            await this.GetProjects();
            this.SelectProjectFromDOM();
            this.CreateProject();

            await this.GetAdmins();
            this.CurrentProject = this.projects[this.projects.length - 1];
            if (this.CurrentProject == undefined) {
                console.warn('No tiene proyectos');
                this.BuildCreateAdvice();
                return;
            }
            this.InitAssignTaskProperties();
            this.InitGanttChart();
            this.UpdateTasks();
            this.InviteAdmin();
            this.DeleteProject();
        };

        initialWrapper();
    }

    /**
     * @description se acciona cuando no hay proyectos en la base de datos
     */
    BuildCreateAdvice() {
        const ProjectsBar = document.getElementById('project-bar');
        const ProjectBody = document.getElementById('project-tasks');
        const UpdateBtn = document.getElementById('update-tasks-button');

        ProjectsBar.innerHTML = '';
        ProjectBody.innerHTML = '';
        UpdateBtn.style.display = 'none';

        const ButtonWrapper = document.createElement('div');

        ButtonWrapper.classList.add('btn-list', 'text-center');

        const CreateBtn = document.createElement('button');

        CreateBtn.classList.add('btn', 'btn-sm', 'btn-secondary');
        CreateBtn.textContent = 'Nuevo proyecto';
        CreateBtn.addEventListener('click', () => {
            const modal = new Modal({ html: '' });
            modal.InsertHTML();
            modal.Append(this.BuildCreateProjectMenu());
            modal.Open();
        });

        ButtonWrapper.appendChild(CreateBtn);
        ProjectBody.appendChild(ButtonWrapper);

    }

    SetSortable(sortable) {
        this.Sortable = sortable;
    }
    SetMoment(moment) {
        this.Moment = moment;
    }
    /**
     * @description Inicializa el componente de la grafica de Gantt
     * @requires Al crear un proyecto siempre inicializarlo con al menos 1 tarea
     */
    InitGanttChart() {
        this.gantt = new Gantt("#gantt", this.CurrentProject.tareas, {
            on_click: function (task) {
                // console.log(task);
            },
            on_date_change: function (task, start, end) {
                task.start = task.PlannerInstance.Moment(start).format('YYYY-MM-DD');
                task.fecha_inicio = task.PlannerInstance.Moment(start).format('YYYY-MM-DD');
                task.end = task.PlannerInstance.Moment(end).format('YYYY-MM-DD');
                task.fecha_termino = task.PlannerInstance.Moment(end).format('YYYY-MM-DD');
                task.PlannerInstance.UpdateBtn.classList.remove('disabled');
            },
            on_progress_change: function (task, progress) {
                task.progress = progress;
                task.progreso = progress;
                task.PlannerInstance.UpdateBtn.classList.remove('disabled');
                task.ProgressInput.value = progress;
            },
            on_view_change: function (mode) {
                // console.log(mode);
            }
        });
        // Problema con el espacio vacío que deja el diagrama
        const NewHeigth = this.gantt.$svg.getAttribute('height') - 128;

        // this.gantt.$svg.setAttribute('height', NewHeighh);
        this.gantt.$svg.style.height = NewHeigth;
        // this.gantt.$svg.style.overflowY = 'scroll';


        this.gantt.change_view_mode(this.CurrentProject.vista_actual);
        this.RenderTaskList();
        this.AddTaskBtnAction();
        this.ChangeGanttView();
    }

    /**
     * @description Obtiene los proyectos del usuario
     */
    async GetProjects() {
        this.projects = await fetch(`/planner/${profile.profile.id_admin}/projects`, {
            headers: {
                'Content-Type': 'application/json',
                'token': profile.profile.token
            },
        }).then(res => res.json());
    }

    /**
     * @description Selecciona el proyecto actual
     */
    async SelectProjectFromDOM() {
        const SelectElement = document.getElementById('select-beast');

        SelectElement.children.item(this.projects.length - 1).selected = true;

        SelectElement.addEventListener('change', (evt) => {
            this.CurrentProject = this.projects.find(p => p.id == SelectElement.value);
            this.InitAssignTaskProperties();
            this.InitGanttChart();
            this.DeleteProject();
        });
    }

    /**
     * @description Esto debido a que la base de datos está en español pero las propiedades se toman en ingles :/
     * Tambien se toma para agregar alguna otra propiedad necesaria
     */
    InitAssignTaskProperties() {
        this.TasksCount = this.CurrentProject.tareas.length;
        if (this.TasksCount == 0) {
            console.warn('No hay tareas');
        }
        this.CurrentProject.tareas = this.CurrentProject.tareas.map(tarea => {
            tarea.id = tarea.id.toString()
            tarea.name = tarea.nombre;
            tarea.start = tarea.fecha_inicio;
            tarea.end = tarea.fecha_termino;
            tarea.progress = tarea.progreso;
            tarea.dependencies = tarea.dependencia;
            tarea.custom_class = 'bar-milestone'; // optional
            tarea.PlannerInstance = this;
            return tarea;
        });
    }

    /**
     * @description Asigna las propiedades de las tareas en ingles
     */
    AssignPropertiesToLast() {
        this.TasksCount = this.CurrentProject.tareas.length;
        const tarea = this.CurrentProject.tareas[this.TasksCount - 1];
        tarea.id = tarea.id.toString()
        tarea.name = tarea.nombre;
        tarea.start = tarea.fecha_inicio;
        tarea.end = tarea.fecha_termino;
        tarea.progress = tarea.progreso;
        tarea.dependencies = tarea.dependencia;
        tarea.custom_class = 'bar-milestone'; // optional
        tarea.PlannerInstance = this;
        return tarea;
    }

    /**
     * @description Agrega funcionalidad al boton de "Agregar tareas"
     */
    AddTaskBtnAction() {
        const AddTaskBtn = document.getElementById('add-task');

        AddTaskBtn.addEventListener('click', async (evt) => {
            console.log(this.TasksCount);
            let UltimaPosicion;
            if (this.TasksCount >= 1) {
                UltimaPosicion = this.TasksCount - 1
            } else {
                UltimaPosicion = this.TasksCount;
            }

            let UltimaTarea = this.CurrentProject.tareas[UltimaPosicion];

            console.log(this.UltimaTarea);

            let FechaTerminoAnterior = '';
            let UltimoOrden;
            /**
             * Estas condiciones se agregan para posicionar las fechas de inicio y de termino de 
             * las siguientes tareas
             */
            if (UltimaTarea != undefined) {
                if (this.TasksCount == 1) {
                    FechaTerminoAnterior = UltimaTarea.start;
                } else {
                    FechaTerminoAnterior = UltimaTarea.end;
                }
                UltimoOrden = UltimaTarea.orden + 1;
            } else {
                FechaTerminoAnterior = this.Moment().format('YYYY-MM-DD');
                UltimoOrden = 1;
                console.log(FechaTerminoAnterior);
            }

            const task = {
                id: "",
                id_proyecto: this.CurrentProject.id,
                nombre: "",
                descripcion: "",
                fecha_inicio: FechaTerminoAnterior,
                fecha_termino: "",
                progreso: 0,
                dependencia: "",
                name: "",
                start: "",
                end: "",
                progress: 0,
                custom_class: 'bar-milestone',
                orden: UltimoOrden
            };

            if (task.fecha_inicio !== '') {


                this.CurrentProject.tareas.push(task);
                this.TasksCount++;
                // Se crea la tarea
                await HTTP({
                    url: '/planner/tasks/create',
                    token: profile.profile.token,
                    data: { tareas: [task] },
                    method: 'POST',
                    success: async (data) => {
                        const RecentlyCreatedTasks = await data.json();
                        this.CurrentProject.tareas.pop();
                        const Length = RecentlyCreatedTasks.tasks.length;
                        this.CurrentProject.tareas.push(RecentlyCreatedTasks.tasks[Length - 1]);
                        this.AssignPropertiesToLast();
                        // // Agregar 
                        const NewHeighh = parseInt(this.gantt.$svg.style.height.slice(0, -2)) + 38;
                        this.gantt.$svg.style.height = NewHeighh;

                    },
                    failed: (e) => { console.error(e) }
                });
                this.RenderTaskList();
                this.gantt.refresh(this.CurrentProject.tareas)
            }
        });
    }

    /**
     * @description Invitar a un administrador al proyecto
     */
    InviteAdmin() {
        const InviteAdminBtn = document.getElementById('add-admin');
        InviteAdminBtn.addEventListener('click', () => {
            const modal = new Modal({ html: '' });
            modal.InsertHTML();

            const AdminList = document.createElement('div');
            const ul = document.createElement('div');
            const form = document.createElement('form');
            form.style.height = '200px';
            ul.classList.add('custom-controls-stacked')
            this.Admins.forEach(admin => {
                const li = document.createElement('div');

                const Label = document.createElement('label');
                Label.classList.add('custom-control', 'custom-checkbox')
                const Checkbox = document.createElement('input');
                Checkbox.type = 'checkbox';
                Checkbox.classList.add('custom-control-input');
                Checkbox.value = admin.id_admin;
                Checkbox.name = admin.nombre;

                if (this.CurrentProject.invitados.find(i => i.nombre == admin.nombre)) {
                    Checkbox.checked = true;
                }

                Label.appendChild(Checkbox);
                li.appendChild(Label);

                const AdminWrapper = document.createElement('div');
                AdminWrapper.classList.add('custom-control-label');
                const AvatarTag = document.createElement('span');
                const Avatar = document.createElement('span');

                AvatarTag.classList.add('tag');

                Avatar.classList.add('tag-avatar', 'avatar');
                Avatar.style.backgroundImage = `url(${admin.img})`;
                AvatarTag.appendChild(Avatar);
                AvatarTag.dataset.content = admin.nombre;
                AdminWrapper.appendChild(AvatarTag);

                Label.appendChild(AdminWrapper);

                // li.appendChild();
                ul.appendChild(li);
                form.appendChild(ul);
            });

            AdminList.appendChild(form);
            const AddAdminListButton = document.createElement('button');
            AddAdminListButton.classList.add('btn', 'btn-block', 'btn-secondary');
            AddAdminListButton.textContent = 'Agregar al proyecto';
            AdminList.appendChild(AddAdminListButton);
            AddAdminListButton.addEventListener('click', async () => {
                const SelectedAdmins = [];
                Array.from(form.elements).forEach(elem => {
                    if (elem.checked) {
                        SelectedAdmins.push(elem.value)
                        //Agregarlos al arreglo de invitados
                        this.CurrentProject.invitados.push(this.Admins.find(adm => adm.id_admin == elem.value));
                    }
                });



                await HTTP({
                    url: '/planner/invite',
                    token: profile.profile.token,
                    data: { invitados: SelectedAdmins, id_proyecto: this.CurrentProject.id },
                    method: 'POST',
                    success: async (data) => {
                        const resp = await data.json();
                        // console.log(resp);
                    },
                    failed: (e) => { console.error(e) }
                })


            });
            modal.Append(AdminList);
            modal.Open();
        });
    }

    /**
     * Cambia la vista de la grafica de Gantt
     */
    ChangeGanttView() {
        const ChangeViewSelect = document.getElementById('view-modes');
        ChangeViewSelect.value = this.CurrentProject.vista_actual;
        ChangeViewSelect.addEventListener('change', async (evt) => {
            this.CurrentProject.vista_actual = ChangeViewSelect.value;
            this.gantt.change_view_mode(this.CurrentProject.vista_actual);

            //Copia del proyecto actual
            const CurrentProjectCopy = {
                id_creador: this.CurrentProject.id_creador,
                id: this.CurrentProject.id,
                fecha_inicio: this.CurrentProject.fecha_inicio,
                fecha_termino: this.CurrentProject.fecha_termino,
                vista_actual: this.CurrentProject.vista_actual,
                nombre: this.CurrentProject.nombre
            };

            HTTP({
                url: '/planner/update/',
                token: profile.profile.token,
                data: { proyecto: CurrentProjectCopy },
                method: 'PATCH',
                failed: (e) => {
                    console.error(e);
                }
            })
        });
    }
    /**
     * Renderiza la lista de tareas
     */
    RenderTaskList() {
        const TaskListElem = document.getElementById('task-list');
        //  Vaciamos la lista
        TaskListElem.innerHTML = '';
        this.CurrentProject.tareas.map((task, index) => {
            const taskElem = document.createElement('li');
            taskElem.style.listStyleImage = 'url(/admin-template/krusty-lab/images/handle.png)';
            taskElem.style.cursor = 'grab';
            taskElem.classList.add('m-2');

            // Acciones de las tareas
            taskElem.appendChild(this.TaskListActions(task));
            TaskListElem.appendChild(taskElem);
        });
        // Creamos una instancia Sortable
        const SortableTasks = this.Sortable.create(TaskListElem, {
            animation: 150
        });
        console.log(this.CurrentProject.tareas.map(t => t.orden));

    }
    /**
     * Acciones de la lista de tareas
     * @todo Cambiar el modal de "fechas" a un modal de "opciones" 
     * @param {*} task 
     */
    TaskListActions(task) {
        // Creación de elementos
        // Nombre
        const row = document.createElement('div');
        row.classList.add('row');
        const NameCol = document.createElement('div');
        NameCol.classList.add('col-5');
        const input = document.createElement('input');
        input.classList.add('btn', 'btn-block', 'btn-secondary', 'btn-sm');
        input.style.pointer = 'cursor';
        input.value = task.name;
        NameCol.appendChild(input);

        //Progreso
        const ProgressCol = document.createElement('div');
        ProgressCol.classList.add('col-2');
        const progress = document.createElement('input');
        progress.type = 'number';
        progress.classList.add('form-control');
        progress.step = 1; progress.min = 0; progress.max = 100;
        progress.defaultValue = task.progress;
        task.ProgressInput = progress;
        ProgressCol.appendChild(progress);

        // Dependencia
        const DependencyCol = document.createElement('div');
        DependencyCol.classList.add('col-4');
        const DependencySelect = document.createElement('select');
        DependencySelect.classList.add('form-control', 'custom-select');
        const DependencyDefaultOption = document.createElement('option');
        DependencyDefaultOption.textContent = "Sin dependencia";
        DependencyDefaultOption.value = "";
        DependencySelect.appendChild(DependencyDefaultOption);
        this.CurrentProject.tareas.map(tarea => {
            const option = document.createElement('option');
            option.textContent = tarea.nombre;
            option.value = tarea.id;
            DependencySelect.appendChild(option);
        });

        DependencySelect.value = task.dependencia;


        DependencyCol.appendChild(DependencySelect)

        // Fechas
        const DateCol = document.createElement('div');
        DateCol.classList.add('col-1');
        const DateBtn = document.createElement('div');
        DateBtn.classList.add('btn', 'btn-secondary', 'btn-sm');
        const icon = document.createElement('i');
        icon.classList.add('fe', 'fe-more-vertical');
        DateBtn.appendChild(icon);
        DateCol.appendChild(DateBtn);

        row.append(NameCol, ProgressCol, DependencyCol, DateCol);
        // Acciones
        input.addEventListener('keyup', (evt) => {
            task.name = input.value;
            task.nombre = input.value;
            this.gantt.refresh(this.CurrentProject.tareas);
            this.UpdateBtn.classList.remove('disabled');
        })

        progress.addEventListener('change', () => {
            task.progress = progress.value;
            task.progreso = progress.value;
            this.gantt.refresh(this.CurrentProject.tareas);
            this.UpdateBtn.classList.remove('disabled');

        });

        DependencySelect.addEventListener('change', () => {
            task.dependencies = DependencySelect.value;
            task.dependencia = DependencySelect.value;
            this.gantt.refresh(this.CurrentProject.tareas);
            this.UpdateBtn.classList.remove('disabled');
        });

        DateBtn.addEventListener('click', (evt) => {
            this.UpdateBtn.classList.remove('disabled');
            const modal = new Modal({ html: '' });
            modal.InsertHTML();
            modal.Append(this.RenderTaskOptionMenu(task));
            modal.Open();
        });

        return row;
    }

    /**
     * @description Esta función crea un menú de opciones para cada tarea de la lista
     */
    RenderTaskOptionMenu(task) {
        const menu = document.createElement('div');

        // Fechas
        const DatesWrapper = document.createElement('div');
        DatesWrapper.classList.add('row');

        const DateInputs = [
            {
                name: 'fecha inicio',
                value: task.start,
                property: ['fecha_inicio', 'start']
            },
            {
                name: 'fecha termino',
                value: task.end,
                property: ['fecha_termino', 'end']
            }
        ];

        DateInputs.map(dates => {

            const DateContainer = document.createElement('div');
            DateContainer.classList.add('col-6', 'form-group');

            const Label = document.createElement('label');
            Label.classList.add('form-label');
            Label.textContent = Capitalize(dates.name);

            const Input = document.createElement('input');
            Input.type = 'date';
            Input.classList.add('form-control');
            Input.value = dates.value;

            Input.addEventListener('change', () => {
                task[dates.property[0]] = Input.value;
                task[dates.property[1]] = Input.value;
                this.gantt.refresh(this.CurrentProject.tareas);
            });

            DateContainer.append(Label, Input);
            DatesWrapper.appendChild(DateContainer);
        });

        // Asignaciones de tareas a usuarios
        const AssignsWrapper = document.createElement('div');

        const SelectContainer = document.createElement('div');
        const SelectLabel = document.createElement('label');
        const AssignedAdminContainer = document.createElement('div');

        SelectLabel.classList.add('form-label')
        SelectContainer.classList.add('form-group');

        const UserSelect = document.createElement('select');
        UserSelect.classList.add('form-control', 'custom-select', 'select-users');
        UserSelect.name = "user"; UserSelect.id = "select-users";
        SelectLabel.textContent = 'Asignar tarea a:';
        SelectLabel.htmlFor = UserSelect.id;

        SelectContainer.append(SelectLabel, UserSelect, AssignedAdminContainer);

        // rellenamos de datos los option del select
        this.CurrentProject.invitados.map(invitado => {
            const option = document.createElement('option');
            option.style.backgroundImage = `url(${invitado.img})`
            option.value = invitado.id_admin;
            option.dataset.data = `{"image":'${invitado.img}'}`;
            option.textContent = invitado.nombre;
            UserSelect.appendChild(option);
        });

        const option = document.createElement('option');
        option.textContent = "Escoge un invitado"; option.selected = true;
        UserSelect.insertBefore(option, UserSelect.children[0]);

        // Debemos sacar esta lista de las tareas
        // const CurrentlySelectedAdmins = [];

        task.asignados.forEach(Admin => {
            const AdminTag = CreateAvatarTag(Admin, this.UnassignTask, { idust: Admin.id });
            AssignedAdminContainer.appendChild(AdminTag);
        });

        UserSelect.addEventListener('change', async () => {
            const SelectedAdmin = UserSelect.value;
            const Admin = this.CurrentProject.invitados.find(i => i.id_admin == SelectedAdmin);

            if (task.asignados.find(i => i.id_admin == SelectedAdmin) == undefined) {
                task.asignados.push(Admin);
                const AdminTag = CreateAvatarTag(Admin, this.UnassignTask, { idust: Admin.id });
                AssignedAdminContainer.appendChild(AdminTag);
            }
            console.log(task.asignados);

            await this.AssignTask(task);

        });




        AssignsWrapper.appendChild(SelectContainer);

        menu.append(DatesWrapper, AssignsWrapper);

        return menu;
    }

    /**
     * 
     */
    async UpdateTasks() {
        const UpdateBtn = document.getElementById('update-tasks-button');
        this.UpdateBtn = UpdateBtn;
        UpdateBtn.addEventListener('click', async () => {
            this.CurrentProject.tareas = this.CurrentProject.tareas.map(t => { delete t.PlannerInstance; return t; })
            if (!UpdateBtn.classList.contains('disabled')) {
                await HTTP({
                    url: '/planner/tasks/update',
                    token: profile.profile.token,
                    data: { tareas: this.CurrentProject.tareas },
                    method: 'PATCH',
                    success: async (data) => {
                        const RecentlyCreatedTasks = await data.json();
                        this.CurrentProject.tareas = RecentlyCreatedTasks.tasks;
                        this.InitAssignTaskProperties();
                        this.gantt.refresh(this.CurrentProject.tareas)
                    },
                    failed: (e) => { console.error(e) }
                });
                UpdateBtn.classList.add('disabled')
            }
        });

    }

    /**
     * Boton de creación de proyecto
     */
    CreateProject() {
        const CreatePrjctBtn = document.getElementById('prjct-btn');
        CreatePrjctBtn.addEventListener('click', (evt) => {
            const modal = new Modal({ html: '' });
            modal.InsertHTML();
            modal.Append(this.BuildCreateProjectMenu());
            modal.Open();
        });
    }

    BuildCreateProjectMenu() {
        const wrapper = document.createElement('div');
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '/planner/create/';
        const inputs = [
            {
                name: 'id_creador',
                type: 'hidden',
                value: profile.profile.id_admin
            },
            {
                name: 'vista_actual',
                type: 'hidden',
                value: 'Week'
            },
            {
                name: 'nombre',
                type: 'text',
                value: ''
            },
            {
                name: 'fecha_inicio',
                type: 'date',
                value: ''
            },
            {
                name: 'fecha_termino',
                type: 'date',
                value: ''
            }
        ];

        inputs.forEach(input => {

            const FormGroup = document.createElement('div');
            FormGroup.classList.add('form-group');
            if (input.type != 'hidden') {
                const Label = document.createElement('label');
                Label.classList.add('form-label');
                Label.textContent = Capitalize(input.name.replace('_', ' '));
                FormGroup.appendChild(Label);
            }
            const InputElem = document.createElement('input');
            InputElem.classList.add('form-control');
            InputElem.name = input.name;
            InputElem.type = input.type;

            if (input.value != '') {
                InputElem.value = input.value;
            }

            FormGroup.appendChild(InputElem);
            form.appendChild(FormGroup);
        });

        wrapper.appendChild(form);


        const CreateBtn = document.createElement('button');
        CreateBtn.classList.add('btn', 'btn-block', 'btn-secondary');
        CreateBtn.textContent = 'Crear proyecto';

        CreateBtn.addEventListener('click', async (evt) => {
            evt.preventDefault();
            const requestObject = {};
            Array.from(form.elements).forEach(elem => {
                requestObject[elem.name] = elem.value;
            });
            await HTTP({
                url: '/planner/create/',
                token: profile.profile.token,
                data: { proyecto: requestObject },
                method: form.method,
                success: async (data) => {
                    location.reload();
                },
                failed: (e) => { console.error(e) }
            });
        });

        wrapper.appendChild(CreateBtn);

        return wrapper;
    }

    async GetAdmins() {
        await HTTP({
            url: '/admins/getAllExceptMe',
            token: profile.profile.token,
            data: {
                id_admin: profile.profile.id_admin,
                token: profile.profile.token
            },
            method: 'POST',
            success: async (data) => {
                const resp = await data.json();
                this.Admins = resp.Admins;
                console.log(this.Admins);
            },
            failed: (e) => { console.error(e) }
        });
    }

    async AssignTask(task) {
        const guests = task.asignados.map(t => t.id_admin);
        await HTTP({
            url: '/planner/tasks/assing',
            token: profile.profile.token,
            data: {
                invitados: guests,
                id_tarea: task.id
            },
            method: 'POST',
            success: async (data) => {
                const resp = await data.json();
                console.log(resp);
            },
            failed: (e) => { console.error(e) }
        });
    }

    async UnassignTask(elem) {
        const idust = elem.dataset.idust;
        await HTTP({
            url: '/planner/tasks/unassing',
            token: profile.profile.token,
            data: {
                id_ust: idust
            },
            method: 'POST',
            success: async (data) => {
                const resp = await data.json();
                console.log(resp);
            },
            failed: (e) => { console.error(e) }
        });
    }

    DeleteProject() {
        const DeleteProjectBtn = document.getElementById('delete-btn');

        const EventListenerAction = () => {
            if (this.CurrentProject.id_creador == profile.profile.id_admin) {
                const modal = new Modal({ html: '' });
                modal.InsertHTML();
                modal.Confirm({
                    message: '¿Está seguro que deseas eliminar este proyecto?',
                    callback: async () => {
                        console.warn('Me borraste UnU');
                        modal.Loader();
                        await HTTP({
                            url: '/planner/delete',
                            token: profile.profile.token,
                            data: {
                                proyecto: {
                                    id_creador: this.CurrentProject.id_creador,
                                    id: this.CurrentProject.id,
                                    fecha_inicio: this.CurrentProject.fecha_inicio,
                                    fecha_termino: this.CurrentProject.fecha_termino,
                                    vista_actual: this.CurrentProject.vista_actual,
                                    nombre: this.CurrentProject.nombre
                                }
                            },
                            method: 'DELETE',
                            success: () => {
                                location.reload();
                            },
                            failed: () => { },
                        });
                    }
                });
            }
        }

        if (this.CurrentProject.id_creador == profile.profile.id_admin) {
            DeleteProjectBtn.classList.remove('disabled');
            DeleteProjectBtn.addEventListener('click', EventListenerAction);
        } else {
            DeleteProjectBtn.classList.add('disabled')
        }
    }

}
// Necesitamos usar esta estructura para poder utilizar las dependencias de JS
require(
    [
        'sortable',
        'selectize',
        'bootstrap',
        'moment',
        'snap-svg',
        'frappe-gantt',
        'jquery'
    ],
    function (sortable, selectize, bootstrap, moment, snapsvg, gantt, $) {
        const planner = new Planner();
        planner.SetSortable(sortable);
        planner.SetMoment(moment);
    });