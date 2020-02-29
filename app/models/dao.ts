import { IDAO, IWhere } from "../interfaces/dao";
import colors from 'colors';
import { APPDB } from "../server/server";
import { QueryModeler } from "../classes/querymodeler";


export class DAO extends QueryModeler implements IDAO {
    DB: { Query: any };
    tablename: string;
    constructor() {
        super();
        this.DB = APPDB;
    }
    /**
     * @description Este metodo va agregando datos en forma de: `('','',...)`. 
     * 
     * Por cada uno de los elementos de un arreglo, 
     * para así generar una sola consulta atomica.
     * @param data Arreglo de datos a insertar
     */
    BatchInsert<T>(data: Array<T>) {
        // Obtenemos los valores que se van a insertar
        const keys = Object.keys(data[0]);
        // Curamos estos datos como string y les agregamos una coma a cada una
        const keysString = Object.keys(data[0]).join(',');
        // Creamos la consulta
        let sql = `INSERT INTO ${this.tablename} ( ${keysString} ) VALUES `;
        // Generamos los datos que se van a insertar
        let inserts = data.map((d: any) => keys.map((k: string) => d[k]));
        // Curamos los datos para que puedan ser string
        let insertsStr = inserts.map((i: Array<any>) => {
            let data = i.map(l => {
                if (l == '') {
                    return "''";
                }
                return (isNaN(+l) ? `'${l}'` : l);
            }).join(',');
            return `(${data})`;
        })
        // Se agregan los inserts a la consulta.
        sql += `${insertsStr}`;
        // console.log(colors.green(sql));
        this.DB.Query(sql).then(console.log).catch(console.log);
    }
    /**
     * Genera una consulta de inserción para un dato dado.
     * @returns Promise
     * @param data Dato a insertar
     */
    async Insert<T extends any>(data: T) {
        const keys = Object.keys(data);
        let sql = `INSERT INTO ${this.tablename} (${keys}) VALUES (${this.SanitizeData(data, 'insert')})`;
        console.log(sql);
        return await this.DB.Query(sql);
    }
    /**
     * 
     * @param data Objeto a actualizar
     * @param where Sentencia WHERE ej. "WHERE id = 2" { property:'id',value:2 }
     */
    async Update<T extends any>(data: T, where?: string) {
        if (where == undefined) {
            console.error(colors.red('Se requiere la sentencia WHERE para seguir'));
            return;
        }
        let sql = `UPDATE ${this.tablename} SET ${this.SanitizeData(data, 'update')}  ${where};`;
        return await this.DB.Query(sql);
    }
    /**
     * El batch update es un metodo especial y especifico para crear una consulta por cada uno de los elementos agregados
     * es posible especificar una sentencia global WHERE o una por cada uno de los elementos.
     * @param data Objetos a actualizar
     * @param where Objeto con dos propiedades: `global` boolean que nos permite saber si el primer elemento del arreglo de valores where 
     * se aplicará para todas las consultas. `Values` arreglo de valores sentencias where.
     */
    async BatchUpdate<T>(data: Array<T>, where?: { global?: boolean, values: Array<string> }) {
        let sql = '';
        data.map((d, i) => {
            let sentence;
            if (where?.global) {
                sentence = where?.values[0];
            } else {
                sentence = where?.values[i];
            }
            sql += `UPDATE ${this.tablename} SET ${this.SanitizeData(d, 'update')} ${sentence};`;
        })
        await this.DB.Query(sql);
        return sql;
    }
    /**
     * @todo No funciona
     */
    Delete() {
    }
    /**
     * Obtiene un elemento de la tabla asignada al controlador
     */
    async Get(options?: { where: IWhere }) {
        let keysString = (options?.where.Properties != undefined) ? options?.where.Properties?.join(',') : '*';
        let sql = `SELECT ${keysString} FROM ${this.tablename} `;
        if (options) {
            sql += this.Whereify(options.where);
        }
        sql += ' LIMIT 1'
        console.log(sql);
        return await this.DB.Query(sql).then((r: any) => r[0]);
    }
    /**
     * @description Retorna un arreglo de datos (rows), la consulta básica es SELECT * FROM foo
     * > El objeto `options` tiene como responsabilidad manejar dos especificaciones del usuario.
     *  Dentro de options existe la propiedad `keys` que son las propiedades que se quieran mostrar.
     *  Tambien existe la propiedad `append` que sirve para agregar una o más sentencias SQL al final de 
     *  la consulta SQL por defecto.
     * @example 
     * options {
     *   keys:Array<string>  // Arreglo de propiedades a agregar,
     *   append:Array<string>// Arreglo de sentencias SQL a agregar al final de la consulta principal
     * }
     * =========================
     * Ejemplo:
     * options {
     *  keys:['nombre','apellidos'],
     *  append:['WHERE id_usuario_tipo = 2', 'ORDER BY fecha_nacimiento DESC']
     * }
     * 
     * options {
     *  append:['WHERE id_usuario_tipo = 3']
     * }
     */
    async GetAll(options?: any) {

        if (options) {
            const append_count = (options.append) ? options.append.length : 0;
            const keys_count = (options.keys) ? options.keys.length : 0;
            let sql = 'SELECT ';
            if (keys_count > 0) {
                // Obtenemos los valores que se van a insertar
                if (keys_count > 1) {
                    sql += `${options.keys.join(',')}`
                } else {
                    sql += `${options.keys[0]}`
                }
            } else {
                sql += ' * ';
            }
            sql += ` FROM ${this.tablename} `;
            if (append_count > 0) {
                // if (append_count >= 1) {
                sql += options.append.join(' ')
                // }
            }
            console.log(colors.yellow(sql));
            return await this.DB.Query(sql).then((r: any) => r);
        } else {
            let sql = `SELECT * FROM ${this.tablename}`;
            return await this.DB.Query(sql).then((r: any) => r);
        }
    }

    /**
     * Retorna un string sanitizado a un formato especifico
     * > Si es insert lo devolverá de esta manera "'test','test',1"
     * @param data Objeto par-valor
     * @param mode Define el modo ya sea 'insert' o 'update'
     * @todo sanitizar update en arreglo
     */
    protected SanitizeData<T>(data: T | Array<T>, mode?: string) {
        if (Array.isArray(data)) {
            if (mode == 'insert') {
                let data2 = data.map((i: any) => {
                    if (i == '') {
                        return "''";
                    }
                    return (isNaN(+i) ? `'${i}'` : i);
                }).join(',');
                console.log(data2);
                // return `(${data})`;
            } else {

            }
        } else {
            if (mode == 'insert') {
                // Me retorna un string con los valores sanitizados
                return Object.values(data).map((i: any) => {
                    if (i == '') {
                        return "''";
                    }
                    return (isNaN(+i) ? `'${i}'` : i);
                }).join(',');
            } else {
                // Me retorna un string update sanitizado
                const keys = Object.keys(data);
                const values = Object.values(data).map((i: any) => {
                    if (i == '') {
                        return "''";
                    }
                    return (isNaN(+i) ? `'${i}'` : i);
                })
                return keys.map((k, i) => `${k} = ${values[i]}`)
            }
        }
    }
}