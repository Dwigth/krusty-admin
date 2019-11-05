import { IHelperModel } from "../../../interfaces/helpers/helper";
import hbs from 'hbs';
import { IKeys } from "../../../interfaces/Database/IKeys";
import { IClienteModel, IClientWithLicence } from "../../../interfaces/Database/models/cliente";

/**
 * =======================================================
 * 
 * Arreglo de objetos que contienen helpers personalizados
 * por modulo (carpeta).
 * 
 * =======================================================
 */
export const MatildeHelperManager: IHelperModel[] = [
    /**
     * =============================================
     * 
     * Este helper genera multiples TR para llenar una
     * tabla de llaves
     * 
     * =============================================
     */
    {
        name: 'MatildeClientsDT',
        function: (clients: IClientWithLicence[]) => {
            let container = '<div class="card"><div class="table-responsive">';
            let table = '<table class="table card-table table-vcenter text-nowrap datatable dataTable no-footer clients-datatable">';
            const thead = `
            <thead>
                <th>ID_CLIENTE</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>correo</th>
                <th>key</th>
                <th>Licencia</th>
                <th>createdAt</th>
            </thead>
            `;
            let tbody = '<tbody>';
            let td = '';
            for (let i = 0; i < clients.length; i++) {
                const client = clients[i];
                td += `
                <tr>
                    <td>${client.ID_USUARIO}</td>
                    <td>${client.nombre}</td>
                    <td>${client.apellidos}</td>
                    <td>${client.correo}</td>
                    <td>${client.key}</td>
                    <td>${client.ID_LICENCIA}</td>
                    <td>${client.createdAt}</td>
                </tr>
                `;
            }
            tbody += td;
            tbody += '</tbody>';
            table += thead;
            table += tbody;
            table += '</table>';

            const script = `
            <script>
            require(['./admin-template/assets/plugins/datatables/datatables.min.js', 'jquery'], 
            function(datatable, $) {
                $('.clients-datatable').DataTable();
                });
            </script>
            `;
            table += script;
            container += table;
            container += '</div></div>';
            return new hbs.handlebars.SafeString(container);
        }
    }
];