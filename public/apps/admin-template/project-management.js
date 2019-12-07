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
        }

        initialWrapper();

    }

    /**
     * @description Inicializa la grafica de Gantt asignandole las tareas y relaciones
     */
    async InitGanttChart() {
        var tasks = {
            // data: [
            //     {
            //         id: 1,
            //         text: "Project #2",
            //         start_date: "01-04-2020",
            //         duration: 18,
            //         order: 10,
            //         progress: 0.4,
            //         open: true
            //     },
            //     {
            //         id: 2, text: "Task #1", start_date: "02-04-2020", duration: 8, order: 10,
            //         progress: 0.6, parent: 1
            //     },
            //     {
            //         id: 3, text: "Task #2", start_date: "11-04-2020", duration: 8, order: 20,
            //         progress: 0.6, parent: 1
            //     }
            // ],
            data: this.CurrentProject.tareas,
            // links: [
            // { id: 1, source: 1, target: 2, type: "1" }, 
            // { id: 2, source: 2, target: 3, type: "0" }
            // ]
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

        gantt.attachEvent("onAfterLinkAdd", function (id, item) {
            //any custom logic here
            gantt.message('Agregamos un link');
            console.log(item);


        });

        gantt.attachEvent("onAfterLinkDelete", function (id, item) {
            //any custom logic here
            gantt.message('Eliminamos un link');
            console.log(item);

        });

        gantt.attachEvent("onAfterTaskDrag", function (id, mode) {
            var task = gantt.getTask(id);
            console.log(task.nombre)
            if (mode == gantt.config.drag_mode.progress) {
                var pr = Math.floor(task.progress * 100 * 10) / 10;
                gantt.message(task.text + " is now " + pr + "% completed!");
            } else {
                var convert = gantt.date.date_to_str("%H:%i, %F %j");
                var s = convert(task.start_date);
                var e = convert(task.end_date);
                gantt.message(task.text + " starts at " + s + " and ends at " + e);
            }
        });

        gantt.attachEvent("onBeforeTaskDrag", function (id, mode) {
            var task = gantt.getTask(id);
            var message = task.text + " ";

            if (mode == gantt.config.drag_mode.progress) {
                message += "progress is being updated";
            } else {
                message += "is being ";
                if (mode == gantt.config.drag_mode.move)
                    message += "moved";
                else if (mode == gantt.config.drag_mode.resize)
                    message += "resized";
            }

            gantt.message(message);
            return true;
        });

        gantt.attachEvent("onLightboxSave", function (id, task, is_new) {
            //any custom logic here
            let message = "Guardar!!";
            gantt.message(message);
            return true;
        })

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
            tarea.start_date = this.moment(tarea.fecha_inicio).format('DD-MM-YYYY');
            tarea.order = tarea.orden;
            tarea.duration = this.moment(tarea.fecha_termino).diff(this.moment(tarea.fecha_inicio), 'days');
            tarea.progress = tarea.progreso;
            tarea.parent = tarea.dependencia;
            return tarea;
        });
    }

}

// Necesitamos usar esta estructura para poder utilizar las dependencias de JS
require(
    [
        'dhtmlxgantt',
        'moment'
    ],
    function (dhtmlxgantt, moment) {
        const pm = new ProjectManagement(moment);
    });