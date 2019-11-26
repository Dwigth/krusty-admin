/**
 * @author Dwigth Astacio
 * @description
 * @todo Implementar obtención de datos por SELECT
 * @see https://frappe.io/gantt
 * @see https://github.com/frappe/gantt
 */
class Planner {

    Sortable = {};
    Moment = {};

    constructor() {
        this.SelectProjectFromDOM();
        const initialWrapper = async () => {
            await this.GetProjects();
            this.CurrentProject = this.projects[this.projects.length - 1];
            this.InitAssignTaskProperties();
            this.InitGanttChart();
            this.UpdateTasks();
        };

        initialWrapper();
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
                // console.log(task, start, end);
            },
            on_progress_change: function (task, progress) {
                // console.log(task, progress);
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
        SelectElement.addEventListener('change', (evt) => {
            this.CurrentProject = SelectElement.value;
            this.InitGanttChart();
        });
    }

    /**
     * @description Esto debido a que la base de datos está en español pero las propiedades se toman en ingles :/
     */
    InitAssignTaskProperties() {
        this.TasksCount = this.CurrentProject.tareas.length;
        this.CurrentProject.tareas = this.CurrentProject.tareas.map(tarea => {
            tarea.id = tarea.id.toString()
            tarea.name = tarea.nombre;
            tarea.start = tarea.fecha_inicio;
            tarea.end = tarea.fecha_termino;
            tarea.progress = tarea.progreso;
            tarea.dependencies = tarea.dependencia;
            tarea.custom_class = 'bar-milestone'; // optional
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

            if (UltimaTarea != undefined) {
                FechaTerminoAnterior = UltimaTarea.end;
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

        });
    }

    /**
     * Cambia la vista de la grafica de Gantt
     */
    ChangeGanttView() {
        const ChangeViewSelect = document.getElementById('view-modes');
        ChangeViewSelect.value = this.CurrentProject.vista_actual;
        ChangeViewSelect.addEventListener('change', (evt) => {
            this.CurrentProject.vista_actual = ChangeViewSelect.value;
            this.gantt.change_view_mode(this.CurrentProject.vista_actual);
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
        NameCol.classList.add('col-3');
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
        ProgressCol.appendChild(progress);

        // Asignación
        const AssignCol = document.createElement('div');
        AssignCol.classList.add('col-3');
        const SelectWrapper = document.createElement('div');
        SelectWrapper.classList.add('form-group');
        const UserSelect = document.createElement('select');
        UserSelect.classList.add('form-control', 'custom-select', 'select-users');
        UserSelect.name = "user"; UserSelect.id = "select-users"
        SelectWrapper.appendChild(UserSelect);
        AssignCol.appendChild(SelectWrapper);
        // rellenamos de datos
        this.CurrentProject.invitados.map(invitado => {
            const option = document.createElement('option');
            option.style.backgroundImage = `url(${invitado.img})`
            option.value = invitado.id_admin;
            option.dataset.data = `{"image":'${invitado.img}'}`;
            option.textContent = invitado.nombre;
            UserSelect.appendChild(option)
        });

        // Dependencia
        const DependencyCol = document.createElement('div');
        DependencyCol.classList.add('col-3');
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
        icon.classList.add('fe', 'fe-calendar');
        DateBtn.appendChild(icon);
        DateCol.appendChild(DateBtn);

        row.append(NameCol, ProgressCol, AssignCol, DependencyCol, DateCol);
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

            const ModalActionsWrapper = document.createElement('div');
            ModalActionsWrapper.innerHTML = '';

            const StartDate = document.createElement('input');
            StartDate.type = 'date';
            StartDate.classList.add('btn', 'btn-secondary', 'btn-sm');
            StartDate.value = task.start;

            StartDate.addEventListener('change', () => {
                task.start = StartDate.value;
                task.fecha_inicio = StartDate.value;
                this.gantt.refresh(this.CurrentProject.tareas);
            });

            const EndDate = document.createElement('input');
            EndDate.type = 'date';
            EndDate.classList.add('btn', 'btn-secondary', 'btn-sm');
            EndDate.value = task.end;


            EndDate.addEventListener('change', () => {
                task.end = EndDate.value;
                task.fecha_termino = EndDate.value;
                this.gantt.refresh(this.CurrentProject.tareas);
            });

            ModalActionsWrapper.appendChild(StartDate);
            ModalActionsWrapper.appendChild(EndDate);

            modal.Append(ModalActionsWrapper);
            modal.Open();
        });

        return row;
    }

    /**
     * 
     */
    async UpdateTasks() {
        const UpdateBtn = document.getElementById('update-tasks-button');
        this.UpdateBtn = UpdateBtn;
        UpdateBtn.addEventListener('click', async () => {
            if (!UpdateBtn.classList.contains('disabled')) {
                await HTTP({
                    url: '/planner/tasks/update',
                    token: profile.profile.token,
                    data: { tareas: this.CurrentProject.tareas },
                    method: 'PATCH',
                    success: async (data) => {
                        const RecentlyCreatedTasks = await data.json();
                        // this.CurrentProject.tareas.pop();
                        // this.CurrentProject.tareas.push(RecentlyCreatedTasks.tasks[0]);
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