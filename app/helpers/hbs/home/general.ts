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
    name: 'show_userdata',
    function: () => {
      const script = `
      <script>
      if(localStorage.getItem('user') != null){
        const avatar = document.getElementById('avatar');
        const nombre = document.getElementById('nombre');
        const nivel = document.getElementById('nivel');

        const usuario = JSON.parse(localStorage.getItem('user'));
        avatar.style.backgroundImage = 'url('+usuario.img+')';
        nombre.textContent = usuario.nombre;
        nivel.textContent = usuario.usuario;
      }
      </script>
      `;
      return new hbs.handlebars.SafeString(script);
    }
  }
];

