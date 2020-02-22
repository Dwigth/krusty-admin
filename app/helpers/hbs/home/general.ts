import { IHelperModel } from "../../../interfaces/helpers/helper";
import hbs from 'hbs';
import { IKeys } from "../../../interfaces/Database/IKeys";
import { IAdmin } from "../../../interfaces/Database/models/admin";
import { chunk } from 'lodash';

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
  },
  {
    name: 'settings',
    function: (admins: Array<IAdmin>) => {
      admins.unshift(<IAdmin>{});
      const ChunkedAdmins = chunk(admins, 3);
      let finalHTML = '';
      ChunkedAdmins.forEach((cadmins, i) => {
        finalHTML += '<div class="row row-cards row-deck">';
        cadmins.forEach((admin, j) => {
          if (j == 0 && i == 0) {
            finalHTML += `
            <div class="col-md-4">
                <div class="card create-user">
                    <a href="#">
                    <img class="card-img-top"
                            src="/admin-template/krusty-lab/images/add.png"
                            alt="Foto de perfil"></a>
                    <div class="card-body d-flex flex-column">
                        <h4>
                            <a href="#">Crear un nuevo usuario</a>
                        </h4>
                        <div class="ml-auto text-muted"></div>

                    </div>

                </div>
            </div>`;
          } else {
            admin.img = (admin.img == '') ? '/images/avatar.png' : admin.img;
            finalHTML += `
            <div class="col-md-4">
                <div class="card">
                    <a href="#"><img class="card-img-top"
                            src="${admin.img}"
                            alt="Foto de perfil"></a>
                    <div class="card-body d-flex flex-column">
                        <h4>
                            <a href="#">${admin.nombre}</a>
                        </h4>

                        <div class="ml-auto text-muted">`;
            if (admin.usuario == 'super_administrador') {
              finalHTML += `<div class="tag tag-danger">
                                          S. Administrador
                                          <span class="tag-addon"><i class="fe fe-user"></i></span>
                                      </div>`;
            }
            finalHTML += `<a href="#" data-idadmin="${admin.id_admin}" class="disable-user-btn icon d-none d-md-inline-block ml-3"><i
                                    class="fe fe-trash mr-1"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            `;
          }
        });
        finalHTML += '</div>';
      });
      return new hbs.handlebars.SafeString(finalHTML);

    }
  }
];

