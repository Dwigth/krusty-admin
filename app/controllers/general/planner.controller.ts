import { IProyecto } from "../../interfaces/Database/models/planner/proyecto";
import { Database } from "../../db/Database";
import { ITareas } from "../../interfaces/Database/models/planner/tareas";
import { OkPacket } from "../../interfaces/Database/IDatabase";
import moment from 'moment';

export class PlannerController {
    private CurrentUser: number;
    private ProjectInstance: IProyecto;
    private TaskInstance: ITareas | Array<ITareas>;
    private Guests: Array<number>;

    constructor(ins?: IProyecto) {
        this.ProjectInstance = ins;
    }

    public SetProject(ins: IProyecto) {
        this.ProjectInstance = ins;
    }

    public SetGuests(guests: Array<number>) {
        this.Guests = guests;
    }

    public GetProject() {
        return this.ProjectInstance;
    }


    public SetTask(task: ITareas | Array<ITareas>) {
        this.TaskInstance = task;
    }

    public SetCurrentUser(userid: number) {
        this.CurrentUser = userid;
    }
    /**
     * @description Obtiene a los usuarios invitados del proyecto
     * @param id_proyecto 
     */
    public async GetProjectGuests(id_proyecto: number) {
        let sql = `SELECT a.id_admin,a.nombre,a.img
                FROM invitados_proyecto ip
                INNER JOIN proyecto p
                ON ip.id_proyecto = p.id
                INNER JOIN admin a
                ON ip.id_invitado = a.id_admin
                WHERE ip.id_proyecto = ${id_proyecto}`;
        return await Database.Instance.Query<{ id_admin: number, nombre: string, img: string }[]>(sql);
    }

    public async InviteToProject() {
        const GuestsPromises = this.Guests.map(async guest => {
            const sql = `INSERT INTO invitados_proyecto (id_proyecto, id_invitado, permisos) VALUES (${this.ProjectInstance.id}, ${guest}, NULL)`;
            return await Database.Instance.Query<OkPacket>(sql);
        });
        return await Promise.all(GuestsPromises);
    }

    public async GetProjectsByUser() {
        let sql = `SELECT P.* FROM proyecto P WHERE P.id_creador = ${this.CurrentUser};`;
        let projects = await Database.Instance.Query<IProyecto[]>(sql);
        // Le agregamos los proyectos a los que está invitado
        projects = projects.concat(await this.GetInvitedProjectsByUser());

        let ProjectsWithTasks = await Promise.all(projects.map(async p => {
            p.tareas = await this.GetTasks(p.id).then(ts => ts.map(t => {
                t.fecha_inicio = moment(t.fecha_inicio).format('YYYY-MM-DD');
                t.fecha_termino = moment(t.fecha_termino).format('YYYY-MM-DD');
                return t;
            }));
            p.invitados = await this.GetProjectGuests(p.id);
            return p
        }
        ));
        return ProjectsWithTasks;
    }

    private async GetInvitedProjectsByUser() {
        let sql = `SELECT P.* FROM proyecto P 
        LEFT OUTER JOIN invitados_proyecto INVP
        ON P.id = INVP.id_proyecto
        WHERE INVP.id_invitado = ${this.CurrentUser}`;
        return await Database.Instance.Query<IProyecto[]>(sql).then(r => r);
    }

    public async Create() {
        let sql = `INSERT INTO proyecto(id_creador, id, fecha_inicio, fecha_termino, vista_actual,nombre) 
        VALUES(
             '${this.ProjectInstance.id_creador}',
             NULL,
             '${this.ProjectInstance.fecha_inicio}',
             '${this.ProjectInstance.fecha_termino}',
             '${this.ProjectInstance.vista_actual}',
             '${this.ProjectInstance.nombre}'
            )`;
        const ProjectCreated = await Database.Instance.Query<OkPacket>(sql);
        // Se debe asociar una tarea inicial 
        this.TaskInstance = {
            dependencia: '',
            fecha_inicio: this.ProjectInstance.fecha_inicio,
            fecha_termino: this.ProjectInstance.fecha_termino,
            descripcion: 'Tarea inicial',
            nombre: `Proyecto: ${this.ProjectInstance.nombre}`,
            id_proyecto: ProjectCreated.insertId,
            orden: 1,
            progreso: 0
        };
        const PrimerTarea = await this.CreateTask();
        return ProjectCreated;
    }
    public async Update() {
        let sql = `UPDATE proyecto SET
        fecha_inicio = '${this.ProjectInstance.fecha_inicio}',
        fecha_termino = '${this.ProjectInstance.fecha_termino}',
        vista_actual = '${this.ProjectInstance.vista_actual}'
        WHERE id = '${this.ProjectInstance.id}'`;
        return await Database.Instance.Query<OkPacket>(sql);
    }
    public async GetProjects() {

    }

    Delete() { }

    public async GetTasks(IdProject: number) {
        let sql = `SELECT * FROM TAREAS WHERE ID_PROYECTO = ${IdProject} ORDER BY ORDEN ASC`;
        return await Database.Instance.Query<ITareas[]>(sql);
    }

    public async GetTask(idTask: number) {
        let sql = `SELECT * FROM TAREAS WHERE ID = ${idTask}`;
        return await Database.Instance.Query<ITareas>(sql);
    }

    public async CreateTask() {
        // Sentencia precia
        let sql = `INSERT INTO tareas(id_proyecto,nombre, descripcion, fecha_inicio, fecha_termino, progreso, dependencia)`;

        if (Array.isArray(this.TaskInstance)) {
            const taskPromises = this.TaskInstance.map(async (task: ITareas) => {
                let instanceSql = `INSERT INTO tareas SET ?`;
                delete task['name']
                delete task['start']
                delete task['end']
                delete task['progress']
                delete task['custom_class']
                // Agregamos un dia por defecto a la fecha de termino 
                let DiaAgregado = moment(task.fecha_inicio).add(1, 'day');
                task.fecha_termino = DiaAgregado.format('YYYY-MM-DD');
                let res = await Database.Instance.Query<OkPacket>(instanceSql, task);
                const Task = await this.GetTask(res.insertId);
                return Task;
            });
            return await Promise.all(taskPromises);
        } else {
            sql += `VALUES(
            '${this.TaskInstance.id_proyecto}',
            '${this.TaskInstance.nombre}', 
            '${this.TaskInstance.descripcion}', 
            '${this.TaskInstance.fecha_inicio}', 
            '${this.TaskInstance.fecha_termino}', 
            '${this.TaskInstance.progreso}', 
            '${this.TaskInstance.dependencia}'
        )`;
            let res = await Database.Instance.Query<OkPacket>(sql);
            return await this.GetTask(res.insertId);
        }

    }

    public async UpdateTask() {
        let sql = `UPDATE tareas SET`;

        if (Array.isArray(this.TaskInstance)) {
            const taskPromises = this.TaskInstance.map(async (task: ITareas) => {
                let instanceSql = sql;
                instanceSql += `
                    nombre = '${task.nombre}', 
                    descripcion = '${task.descripcion}', 
                    fecha_inicio = '${task.fecha_inicio}',
                    fecha_termino = '${task.fecha_termino}', 
                    progreso = '${task.progreso}', 
                    dependencia = '${task.dependencia}',
                    orden = '${task.orden}'
                    WHERE id = '${task.id}'`;
                let res = await Database.Instance.Query<OkPacket>(instanceSql);
                const Task = await this.GetTask(task.id);
                return Task;
            });
            return await Promise.all(taskPromises);
        } else {
            sql += `nombre = '${this.TaskInstance.nombre}', 
            descripcion = '${this.TaskInstance.descripcion}', 
            fecha_inicio = '${this.TaskInstance.fecha_inicio}',
            fecha_termino = '${this.TaskInstance.fecha_termino}', 
            progreso = '${this.TaskInstance.progreso}', 
            dependencia = '${this.TaskInstance.dependencia}'
            WHERE id = '${this.TaskInstance.id}'`;
            let res = await Database.Instance.Query<OkPacket>(sql);
            const Task = await this.GetTask(this.TaskInstance.id);
            return Task;
        }
    }

}