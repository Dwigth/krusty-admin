/**
 * Proceso de creación del modal
 */
window.onload = (function () {
    //Agregar css para esta página
    var head = document.getElementsByTagName('HEAD')[0];
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = './admin-template/assets/css/custom/modal.css';
    head.appendChild(link);

    const backdrop = document.createElement('div');
    backdrop.classList.add('backdrop');
    backdrop.id = 'backdrop';

    backdrop.innerHTML = `
    <div class="b-child">
        <div class="card" style="height:400px;">
        <div class="card-header">
        <h3 class="card-title"></h3>
        </div>
        <div class="card-body" style="overflow-y:scroll">
            
        </div>
        <div class="card-footer">
            <div class="card-options">
            </div>
      </div>
    </div>
  <div>`;
    var body = document.getElementsByTagName('body')[0];
    backdrop.style.height = body.scrollHeight + 'px';
    body.insertBefore(backdrop, body.firstChild);
});

class Modal {

    constructor(options) {
        this.modal = document.getElementsByClassName('b-child')[0];
        this.container = this.modal.getElementsByClassName('card-body')[0];
        this.backdrop = document.getElementById('backdrop');
        this.options = options;
    }
    /**
     * Renderiza una carta con un backdrop oscuro (modal)
     */
    Open() {
        const y = window.scrollY;
        const offset = 100;
        this.modal.style.top = (y + offset) + 'px';
        this.backdrop.style.visibility = 'visible';
        this.RenderOptions(true)
    }
    /**
     * Oculta el modal
     */
    Close() {
        backdrop.style.visibility = 'hidden';
    }
    /**
     * Mostrar opciones
     */
    RenderOptions(show, customhtml) {
        if (show) {
            if (customhtml == undefined) {
                this.modal.getElementsByClassName('card-options')[0].innerHTML = `<a href="#" class="btn btn-primary btn-sm" onclick="Close()">Cerrar</a>`;
            } else {
                this.modal.getElementsByClassName('card-options')[0].innerHTML = customhtml;
            }
            this.modal.getElementsByClassName('card-options')[0].style.display = 'block';
        } else {
            this.modal.getElementsByClassName('card-options')[0].style.display = 'none';
        }
    }
    /**
     * Incrusta HTML dentro del elemento 'card-body'
     */
    InsertHTML() {
        if (this.options !== undefined) {
            this.container.innerHTML = this.options.html;
        } else {
            console.error('InsertHTML requiere le parametro "options" al instanciarse.');
        }
    }
    /**
     * Retorna un valor boolean si el modal se ha confirmado
     */
    async Confirm(message) {
        return new Promise((resolve, reject) => {
            let messageCtn = `
                <div>
                    <label class="form-label">${message}</label>
                    <div id="actions"></div>
                </div>`;
            this.container.innerHTML = messageCtn;
            let space = document.getElementById('actions');
            let confirmBtn = document.createElement('button');
            let declineBtn = document.createElement('button');
            let result = false;
            confirmBtn.classList.add('p-2', 'm-2', 'btn', 'btn-primary');
            confirmBtn.textContent = 'Aceptar';
            declineBtn.classList.add('p-2', 'm-2', 'btn', 'btn-secondary');
            declineBtn.textContent = 'Cancelar';
            space.append(confirmBtn, declineBtn);
            this.Open();
            this.RenderOptions(false)

            // 'Rechazado por el usuario.'
            confirmBtn.addEventListener('click', () => { result = true; resolve(result); this.Close(); })
            declineBtn.addEventListener('click', () => { result = false; this.Close(); reject(result); })
        });
    }
}

function Close() {
    var modal = new Modal().Close();
}