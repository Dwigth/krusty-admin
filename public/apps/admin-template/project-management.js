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
                this.BuildCreateAdvice();
                return;
            }
            this.InitAssignTaskProperties();
            this.InitGanttChart();
            this.GanttConfiguration();

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
            links: [
                // { id: 1, source: 1, target: 2, type: "1" },
                // { id: 2, source: 2, target: 3, type: "0" }
            ]
            // links: this.CurrentProject.links
        };

        this.Gantt.init("gantt_here");
        this.Gantt.parse(tasks);
    }
    /**
     * Confirugaciones extras para la gráfica
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
        this.Gantt.ext.zoom.setLevel("year");
        this.Gantt.ext.zoom.attachEvent("onAfterZoom", function (level, config) {
            document.querySelector(".gantt_radio[value='" + config.name + "']").checked = true;
        })

        document.getElementById('zoom-in').addEventListener('click', (evt) => {
            this.Gantt.ext.zoom.zoomIn();
        });
        document.getElementById('zoom-out').addEventListener('click', (evt) => {
            this.Gantt.ext.zoom.zoomOut()
        });

        const radios = document.getElementsByName("scale");
        for (var i = 0; i < radios.length; i++) {
            radios[i].onclick = function (event) {
                // Global 
                gantt.ext.zoom.setLevel(event.target.value);
            };
        }
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
        console.log(this.CurrentProject);
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