import { IHelperModel } from "../../../interfaces/helpers/helper";
import hbs from 'hbs';
import { IKeys } from "../../../interfaces/Database/IKeys";

/**
 * =======================================================
 * 
 * Arreglo de objetos que contienen helpers personalizados
 * por modulo (carpeta).
 * 
 * =======================================================
 */
export const GeneralHelperManager: IHelperModel[] = [
    /**
     * =============================================
     * 
     * Este helper genera multiples TR para llenar una
     * tabla de llaves
     * 
     * =============================================
     */
    {
        name: 'display_keys',
        function: (keys: IKeys[]) => {
            let result = '';
            let length = keys.length;
            for (let i = 0; i < length; i++) {
                const K = keys[i];
                result += `
                <tr>
                    <th>
                      <label class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" name="" value="">
                        <div class="custom-control-label"></div>
                      </label>
                    </th>
                    <td>${K.nombre}</td>
                    <td class="d-none d-sm-table-cell">${K.fecha}</td>
                    <td class="d-none d-md-table-cell">${K.cantidad}</td>
                    <td class="d-none d-md-table-cell">
                    <button class="btn btn-secondary hide"> Mostrar </button>
                    </td>
                  </tr>
                  `;
            }
            return new hbs.handlebars.SafeString(result);
        }
    },
];

