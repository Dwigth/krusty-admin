/**
 * @requires modal.js
 * @requires dt-custom-actions.js
 * @requires util.js 
 * 
 * Funciones personalizada
 * 
 * @description Este script podrá duplicarse para futuras páginas que también necesiten 
 * generar tablas de manera dinámica. El proceso de creación es un tanto tedioso y se hizo
 * de esa manera por razones que desconocemos (me odio). A primera instancia la DataTable se construirá 
 * en el backend y se inicializa en el frontend dentro del script dt-custom-actions.js
 * Las funciones que deberán llevar los scripts que hagan uso de las DataTable son las siguientes:
 * Update(tabla, indice)
 * Delete(tabla, indice)
 * Create(tabla)
 * 
 * @todo Determinar si al editar tomar el dato desde el JSON escondido o desde la fila seleccionada.
 * @todo Selección multiple (eliminación)
 * VARIABLES GLOBALES
 */

/**
 * Actualiza el valor de los datos escondidos
 * @param {*} tabla 
 * @param {*} newData 
 */
function UpdateHiddenData(tabla, newData) {
    let hiddenDataElement = document.getElementById(tabla + '-data');
    hiddenDataElement.textContent = JSON.stringify(newData);
}

/**
 * Intentará obtener los datos de la fila seleccionada ya sea por busqueda en un arreglo 
 * escondido en un elemento de la tabla con un índice dado o por busqueda del elemento 
 * mas cercano (tr).
 * @param {*} tabla
 * @param {*} index 
 */
function GetData(tabla, index) {
    let data;
    let hiddenData = JSON.parse(document.getElementById(tabla + '-data').textContent);

    // Revisamos si nuestro índice es un objeto (Elemento HTML)
    if (typeof (index) == "object") {
        const tr = index.parentElement.parentElement.parentElement.parentElement;
        const rowData = [];
        Array.from(tr.getElementsByTagName('td')).map(td => {
            rowData.push(td.textContent);
        });
        // Quitamos el último elemento que no tiene nada (porque es donde está el dropdown)
        rowData.pop();
        // Obtenemos el ID del dato de la fila
        let id = rowData[0];
        let propertyToLookUp = `id_${tabla}`.toLowerCase();

        data = hiddenData.find(val => val[propertyToLookUp].toString() == id.toString());
        if (data === undefined) {
            console.log(id, propertyToLookUp, rowData, hiddenData);
        }
    } else {
        data = hiddenData[index];
    }
    return data;
}

/**
 * Esta función depende enteramente de la estructura de la base de datos.
 * Al renderizarse la página se proveerá el parametro índice como número, pero
 * despues de hacer cualquier acción con la DataTable (actualizar, eliminar, crear)
 * se volverá a renderizar y se perderá el indice como parametro, pero se proveerá 
 * el boton del dropdown para poder localizar los datos de esa tabla.
 * @todo Hacer la función para eliminar en backend
 * @param {*} tabla 
 * @param {*} index 
 */
function Delete(tabla, index) {
    let data;
    data = GetData(tabla, index);
    let modal = new Modal();
    modal.Confirm({
        message: '¿Estas seguro que deseas eliminar?',
        callback: async function () {
            await fetch(`/matilde-catalogs/delete/${tabla}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((resp) => resp.json()).catch(console.log)
                .finally(() => {
                    require(
                        [
                            './admin-template/assets/plugins/datatables/datatables.min.js',
                            'jquery'
                        ],
                        function (datatable, $) {
                            // Instancia DataTable
                            var table = $('#' + tabla).DataTable();
                            // var table = new $.fn.dataTable.Api('#' + tabla);
                            $.post('/matilde-catalogs/read/' + tabla, function (narr) {
                                table.clear();
                                table.rows.add(narr).draw();
                                UpdateHiddenData(tabla, narr);
                            });
                        });
                });
        }
    });
}

/**
 * Esta función depende enteramente de la estructura de la base de datos.
 * Al renderizarse la página se proveerá el parametro índice como número, pero
 * despues de hacer cualquier acción con la DataTable (actualizar, eliminar, crear)
 * se volverá a renderizar y se perderá el indice como parametro, pero se proveerá 
 * el boton del dropdown para poder localizar los datos de esa tabla.
 * @param {*} tabla |string| - ID de la tabla.
 * @param {*} index |number|HTMLElement| -  Indice o botón de la fila.
 */
async function Update(tabla, index) {
    console.log(typeof (index));
    // Datos de la fila
    let data;

    data = GetData(tabla, index);
    console.log(data);

    let Fields = Object.getOwnPropertyNames(data);

    //Hash-Table de datos
    let selectableFields = await GetSelectableFields();

    let selectables = Object.getOwnPropertyNames(selectableFields);
    // Construcción del html
    var FormOptions = {
        data: data,
        Fields: Fields,
        selectables: selectables,
        selectableFields: selectableFields,
        filled: true
    }
    let ModalOptions = {
        html: CreateForm(FormOptions)
    };
    let modal = new Modal(ModalOptions);
    modal.InsertHTML();
    // Como solo hay un form en la página
    // lo tomaremos como ventaja
    const updateBtn = document.createElement('button');
    updateBtn.classList.add('p-2', 'm-2', 'btn', 'btn-primary');
    updateBtn.addEventListener('click', () => {
        const form = modal.container.getElementsByTagName('form')[0];
        // Hay que pedir confirmación
        modal.Confirm({
            message: '¿Estás seguro que quieres actualizar este item?',
            callback: async function () {
                let query = await fetch('/matilde-catalogs/update/' + tabla,
                    {
                        method: 'POST',
                        body: JSON.stringify(GetHTMLFormData(form)),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    }).then(res => res.json())
                    .catch(e => e)
                    .finally(() => {
                        require(
                            [
                                './admin-template/assets/plugins/datatables/datatables.min.js',
                                'jquery'
                            ],
                            function (datatable, $) {
                                // Instancia DataTable
                                var table = $('#' + tabla).DataTable();
                                // var table = new $.fn.dataTable.Api('#' + tabla);
                                $.post('/matilde-catalogs/read/' + tabla, function (narr) {
                                    table.clear();
                                    table.rows.add(narr).draw();
                                    UpdateHiddenData(tabla, narr);
                                });
                            });
                    });
            },
            destroy: false
        });
    });
    updateBtn.textContent = "Actualizar";
    modal.container.appendChild(updateBtn);
    modal.Open();
}

/**
 * 
 * @param {*} tabla 
 */
async function Create(tabla) {
    // ID del elemento donde estará guardado los datos JSON en un STRING
    var JSONData = JSON.parse(document.getElementById(tabla + '-data').textContent);
    let Fields = Object.getOwnPropertyNames(JSONData[0]);

    //Hash-Table de datos
    let selectableFields = await GetSelectableFields();

    let selectables = Object.getOwnPropertyNames(selectableFields);
    // Construcción del html
    var FormOptions = {
        data: JSONData,
        Fields: Fields,
        selectables: selectables,
        selectableFields: selectableFields,
        filled: false
    }
    // Opciones globales para la creación del modal
    var ModalOptions = {
        html: CreateForm(FormOptions),
    }
    var modal = new Modal(ModalOptions);
    modal.InsertHTML();
    // lo tomaremos como ventaja
    const createBtn = document.createElement('button');
    createBtn.classList.add('p-2', 'm-2', 'btn', 'btn-primary');

    createBtn.addEventListener('click', async () => {
        const form = modal.container.getElementsByTagName('form')[0];
        // Hay que pedir confirmación
        modal.Loader();

        let query = await fetch('/matilde-catalogs/create/' + tabla,
            {
                method: 'POST',
                body: JSON.stringify(GetHTMLFormData(form)),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => {
                modal.Close();
                return res.json()
            }).finally(() => {
                require(
                    [
                        './admin-template/assets/plugins/datatables/datatables.min.js',
                        'jquery'
                    ],
                    function (datatable, $) {
                        // Instancia DataTable
                        var table = $('#' + tabla).DataTable();
                        // var table = new $.fn.dataTable.Api('#' + tabla);
                        $.post('/matilde-catalogs/read/' + tabla, function (narr) {
                            table.clear();
                            table.rows.add(narr).draw();
                            UpdateHiddenData(tabla, narr);
                        });
                    });
            });

        console.log(query)
    });
    createBtn.textContent = "Crear";
    modal.container.appendChild(createBtn);
    modal.Open();

}

/**
 * 
 * @param {*} data  - De donde se obtiene la información
 * @param {*} Fields - Arreglo de strings que contienen los nombres de propiedades
 * @param {*} selectables - Arreglo de strings que contienen los titulos que serán convertidos en elementos "select"
 * @param {*} filled - Si se requieren los inputs con datos previos
*/
function CreateForm(options) {
    let html = '<form>';
    options.Fields.map(field => {
        if (options.selectables.includes(field.toLowerCase())) {
            field = field.toLowerCase();
            let SelectOptions = '';
            html += `<div class="form-group">
            <label class="form-label">${field}</label>
            <select name="id_${field}" type="text" class="form-control">`;
            options.selectableFields[field].map(fieldData => {
                SelectOptions += `<option value="${fieldData["id_" + field]}">${fieldData.nombre}</option>`;
            });
            html += SelectOptions;
            html += '<select></div>';
        } else {
            if (options.filled) {
                html += `<div class="form-group">
            <label class="form-label">${field}</label>
            <input name="${field}" type="text" value="${options.data[field]}" class="form-control">
        </div>`;
            } else {
                html += `<div class="form-group">
            <label class="form-label">${field}</label>
            <input name="${field}" type="text" value="" class="form-control">
        </div>`;
            }
        }
    });
    html += '</form>';
    return html;
}

async function GetSelectableFields() {
    //Obtener los datos
    const names = await fetch('/matilde-catalogs-names', { method: 'GET' }).then(resp => resp.json());
    //Hash-Table de datos
    return {
        "metodo": names.metodos,
        "principio": names.principios,
        "tienda": names.tiendas,
    };
}
