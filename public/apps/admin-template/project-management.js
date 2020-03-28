/**
 * @author Dwigth Astacio
 * @description Integración y personalización del plugin Gantt de dhtmlx 
 * @see https://docs.dhtmlx.com/gantt
 */
class ProjectManagement {

    constructor(moment) {
        // Se obtiene de un objeto global al incluir el script
        this.Gantt = gantt;
        this.moment = moment;
        const initialWrapper = async () => {
            await this.GetProjects();
            await this.SelectProjectFromDOM();
            await this.GetAdmins();
            this.CurrentProject = this.projects[this.projects.length - 1];
            if (this.CurrentProject == undefined) {
                console.warn('No tiene proyectos');
                // this.BuildCreateAdvice();
                return;
            }
            this.InitAssignTaskProperties();
            this.InitGanttChart();
            this.GanttConfiguration();
            this.GanttEvents();
            this.GetTaskBars();
            this.AddUserImgToTasks();
        }

        initialWrapper();

    }

    /**
     * @description Inicializa la grafica de Gantt asignandole las tareas y relaciones
     */
    async InitGanttChart() {

        var tasks = {
            data: this.CurrentProject.tareas,
            links: this.CurrentProject.links
        };

        this.Gantt.init("gantt_here");
        this.Gantt.parse(tasks);
    }

    /**
     * @description Configuraciones extras para la gráfica
     */
    GanttConfiguration() {
        var zoomConfig = {
            levels: [
                {
                    name: "day",
                    scale_height: 27,
                    min_column_width: 80,
                    scales: [
                        { unit: "day", step: 1, format: "%d %M" }
                    ]
                },
                {
                    name: "week",
                    scale_height: 50,
                    min_column_width: 50,
                    scales: [
                        {
                            unit: "week", step: 1, format: function (date) {
                                var dateToStr = gantt.date.date_to_str("%d %M");
                                var endDate = gantt.date.add(date, -6, "day");
                                var weekNum = gantt.date.date_to_str("%W")(date);
                                return "#" + weekNum + ", " + dateToStr(date) + " - " + dateToStr(endDate);
                            }
                        },
                        { unit: "day", step: 1, format: "%j %D" }
                    ]
                },
                {
                    name: "month",
                    scale_height: 50,
                    min_column_width: 120,
                    scales: [
                        { unit: "month", format: "%F, %Y" },
                        { unit: "week", format: "Week #%W" }
                    ]
                },
                {
                    name: "quarter",
                    height: 50,
                    min_column_width: 90,
                    scales: [
                        { unit: "month", step: 1, format: "%M" },
                        {
                            unit: "quarter", step: 1, format: function (date) {
                                var dateToStr = gantt.date.date_to_str("%M");
                                var endDate = gantt.date.add(gantt.date.add(date, 3, "month"), -1, "day");
                                return dateToStr(date) + " - " + dateToStr(endDate);
                            }
                        }
                    ]
                },
                {
                    name: "year",
                    scale_height: 50,
                    min_column_width: 30,
                    scales: [
                        { unit: "year", step: 1, format: "%Y" }
                    ]
                }
            ]
        };

        this.Gantt.ext.zoom.init(zoomConfig);
        this.Gantt.ext.zoom.setLevel(this.CurrentProject.vista_actual);
        this.Gantt.ext.zoom.attachEvent("onAfterZoom", function (level, config) {
            document.querySelector(".gantt_radio[value='" + config.name + "']").checked = true;
        })

        document.getElementById('zoom-in').addEventListener('click', (evt) => {
            this.Gantt.ext.zoom.zoomIn();
            this.CurrentProject.vista_actual = zoomConfig.levels[gantt.ext.zoom.getCurrentLevel()].name;
        });
        document.getElementById('zoom-out').addEventListener('click', (evt) => {
            this.Gantt.ext.zoom.zoomOut()
            this.CurrentProject.vista_actual = zoomConfig.levels[gantt.ext.zoom.getCurrentLevel()].name;
        });

        const radios = document.getElementsByName("scale");
        for (var i = 0; i < radios.length; i++) {
            radios[i].onclick = function (event) {
                // Global 
                gantt.ext.zoom.setLevel(event.target.value);
            };
            if (radios[i].value == this.CurrentProject.vista_actual) {
                radios[i].checked = true
            }
        }
    }

    /**
     * @description Eventos para la grafica de gantt
     */
    GanttEvents() {
        const self = this;

        //Agregar tarea
        gantt.attachEvent("onAfterTaskAdd", async function (id, item) {

            let UltimaPosicion;
            if (self.TasksCount >= 1) {
                UltimaPosicion = self.TasksCount - 1
            } else {
                UltimaPosicion = self.TasksCount;
            }

            let UltimaTarea = self.CurrentProject.tareas[UltimaPosicion];

            let FechaTerminoAnterior = '';
            let UltimoOrden;

            // Estas condiciones se agregan para posicionar las fechas de inicio y de termino de 
            // las siguientes tareas


            if (UltimaTarea != undefined) {
                if (self.TasksCount == 1) {
                    FechaTerminoAnterior = UltimaTarea.fecha_inicio;
                } else {
                    FechaTerminoAnterior = UltimaTarea.fecha_termino;
                }
                UltimoOrden = UltimaTarea.orden + 1;
            } else {
                FechaTerminoAnterior = self.Moment().format('YYYY-MM-DD');
                UltimoOrden = 1;
                console.log(FechaTerminoAnterior);
            }

            const task = {
                id: "",
                id_proyecto: self.CurrentProject.id,
                nombre: item.text,
                // text: item.text,
                descripcion: "",
                fecha_inicio: FechaTerminoAnterior,
                // start_date: FechaTerminoAnterior,
                fecha_termino: self.moment(FechaTerminoAnterior).add(item.duration, 'd').format('YYYY-MM-DD'),
                progreso: item.progress,
                dependencia: item.parent,
                // progress: item.progress,
                // duration: item.duration,
                orden: UltimoOrden
            };

            console.log(task);

            if (task.fecha_inicio !== '') {


                self.CurrentProject.tareas.push(task);
                self.TasksCount++;

                // Se crea la tarea
                await HTTP({
                    url: '/planner/tasks/create',
                    token: profile.profile.token,
                    data: { tareas: [task] },
                    method: 'POST',
                    success: async (data) => {
                        const RecentlyCreatedTasks = await data.json();
                        self.CurrentProject.tareas.pop();
                        const Length = RecentlyCreatedTasks.tasks.length;
                        self.CurrentProject.tareas.push(RecentlyCreatedTasks.tasks[Length - 1]);
                    },
                    failed: (e) => { console.error(e) }
                });

            }


            gantt.message('Agregando una tarea!');
        });

        // Agregar link de la tarea
        gantt.attachEvent("onAfterLinkAdd", async function (id, item) {
            //any custom logic here
            gantt.message('Agregamos un link');
            console.log(item);
            await HTTP({
                url: '/planner/task/link',
                token: profile.profile.token,
                data: {
                    link: {
                        id_proyecto: self.CurrentProject.id,
                        id: 'NULL',
                        source: item.source,
                        target: item.target,
                        type: item.type
                    }
                },
                method: 'POST',
                success: async (data) => {
                    const respnse = await data.json();
                    console.log(respnse);
                },
                failed: (e) => { console.error(e) }
            });
        });

        // Borrar el link de la tarea
        gantt.attachEvent("onAfterLinkDelete", async function (id, item) {
            //any custom logic here
            gantt.message('Eliminamos un link');
            console.log(id, self);
            await HTTP({
                url: '/planner/task/unlink',
                token: profile.profile.token,
                data: {
                    link: {
                        id_proyecto: self.CurrentProject.id,
                        id: id,
                        source: item.source,
                        target: item.target,
                        type: item.type
                    }
                },
                method: 'DELETE',
                success: async (data) => {
                    const respnse = await data.json();
                    console.log(respnse);
                },
                failed: (e) => { console.error(e) }
            });
        });

        // Editar la fecha de la tarea
        gantt.attachEvent("onAfterTaskDrag", async function (id, mode) {
            var task = gantt.getTask(id);
            var pr = Math.floor(task.progress * 100 * 10) / 10;

            if (mode == gantt.config.drag_mode.progress) {
                var pr = Math.floor(task.progress * 100 * 10) / 10;
                gantt.message(task.text + " is now " + pr + "% completed!");
            } else {
                var convert = gantt.date.date_to_str("%H:%i, %F %j");
                var s = convert(task.start_date);
                var e = convert(task.end_date);
                gantt.message(task.text + " starts at " + s + " and ends at " + e);
            }
            task.progreso = task.progress;

            self.UpdateTask(task, self);
        });

        // Guardar en el modal
        gantt.attachEvent("onLightboxSave", function (id, task, is_new) {
            //any custom logic here
            let message = "Guardar!!";
            gantt.message(message);
            console.log(task);
            self.UpdateTask(task, self);
            return true;
        })

        // abre todas las ramas de tareas
        gantt.eachTask(function (task2open) {
            gantt.open(task2open.id);
        });

        // Cada que le de click se renderizarán quienes están asignados a la tarea
        gantt.attachEvent("onTaskClick", function (id, e) {
            setTimeout(() => {
                self.AddUsersImgsToTaskBar(id)
            }, 100);
            //any custom logic here
            return true;
        });
    }
    /**
     * 
     * @param {*} task Objeto tarea de la gráfica de Gantt
     */
    async UpdateTask(task, self) {
        const TaskObject = {
            id: task.id,
            id_proyecto: task.id_proyecto,
            nombre: task.text,
            fecha_inicio: self.moment(task.start_date).format('YYYY-MM-DD'),
            fecha_termino: self.moment(task.end_date).format('YYYY-MM-DD'),
            progreso: task.progress,
            orden: task.order,
            dependencia: task.parent,
            descripcion: ''
        };


        await HTTP({
            url: '/planner/tasks/update',
            token: profile.profile.token,
            data: { tareas: [TaskObject] },
            method: 'PATCH',
            success: async (data) => {
                const RecentlyUpdatedTasks = await data.json();
                console.log(RecentlyUpdatedTasks);
            },
            failed: (e) => { console.error(e) }
        });
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
                console.table(this.Admins);
            },
            failed: (e) => { console.error(e) }
        });
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
            this.Gantt.clearAll();
            this.InitGanttChart();
            this.GetTaskBars();
            this.AddUserImgToTasks();
            // this.DeleteProject();
        });
    }

    /**
     * @description Esto debido a que la base de datos está en español pero las propiedades se toman en ingles :/
     * Tambien se toma para agregar alguna otra propiedad necesarias
     */
    InitAssignTaskProperties() {
        this.TasksCount = this.CurrentProject.tareas.length;
        if (this.TasksCount == 0) {
            console.warn('No hay tareas');
        }
        this.CurrentProject.tareas = this.CurrentProject.tareas.map(tarea => {
            tarea.id = tarea.id.toString()
            tarea.text = tarea.nombre;
            tarea.start_date = this.moment(tarea.fecha_inicio).add(1, 'day').format('DD-MM-YYYY');
            tarea.order = tarea.orden;
            tarea.duration = this.moment(tarea.fecha_termino).diff(this.moment(tarea.fecha_inicio), 'days');
            tarea.progress = tarea.progreso;
            tarea.parent = tarea.dependencia;
            return tarea;
        });
    }

    /**
     * Le agregamos la imagen del usuario(s) asignado a la(s) tarea(s) 
     * al inicio de la carga del proyecto
     */
    AddUserImgToTasks() {
        // Obtenemos todas las barras de tareas
        // Están ordenadas en cascada
        this.TaskBars.map(elem => {
            const TaskId = elem.getAttribute('task_id');
            const task = this.CurrentProject.tareas.find(tarea => tarea.id == TaskId)
            // Ahora buscamos el elemento con la clase "gantt_task_progress_wrapper"
            // Siempre es el primero => [0]
            const TaskWrapper = elem.children[0];
            const asignados = task.asignados;
            if (asignados.length >= 1) {
                // Creamos los elementos y los agregamos al wrapper
                asignados.forEach(asignado => {
                    const avatar = window.ProjectManagementGuessList.CreateGuessElement(asignado);
                    TaskWrapper.prepend(avatar)
                })
            }
        });
    }

    /**
     * Agregamos las imagenes de los usuarios asignados a 
     * las barras de tareas
     * @param {*} id
     */
    AddUsersImgsToTaskBar(TaskId) {
        const TaskBar = document.getElementsByClassName('gantt_selected')[2];
        const Task = this.CurrentProject.tareas.find(tarea => tarea.id == TaskId);
        const TaskWrapper = TaskBar.children[0];
        const asignados = Task.asignados;
        if (asignados.length >= 1) {
            if (TaskWrapper.children.length == 1) {
                // Creamos los elementos y los agregamos al wrapper
                asignados.forEach(asignado => {
                    const avatar = window.ProjectManagementGuessList.CreateGuessElement(asignado);
                    TaskWrapper.prepend(avatar)
                })
            }
        }
    }

    /**
     * Obtiene las barras de gantt
     */
    GetTaskBars() {
        this.TaskBars = Array.from(document.getElementsByClassName('gantt_bar_task'));
    }

    /**
     * Asigna una tarea a un usuario
     * @param {*} task 
     */
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

    /**
     * Quita a un usuario de una tarea
     * @param {*} elem 
     */
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

    AssignForm(TaskContentElem) {
        const TaskId = TaskContentElem.parentElement.getAttribute('task_id');
        const Task = this.CurrentProject.tareas.find(tarea => tarea.id == TaskId);
    }

}

// Necesitamos usar esta estructura para poder utilizar las dependencias de JS
require(
    [
        'dhtmlxgantt',
        'dhtmlxgantt_tooltip',
        'moment'
    ],
    function (dhtmlxgantt, dhtmlxgantt_tooltip, moment) {
        const pm = new ProjectManagement(moment);
        window.ProjectManagement = pm;
    });