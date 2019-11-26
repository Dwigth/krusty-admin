/**
 * @description Esta clase crea elementos select personalizados
 */
class Selectable {
    constructor() {
        window.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                let el = AppendToHEAD({
                    type: 'link',
                    url: '/admin-template/assets/css/custom/selectable.css'
                });
                console.warn('Esperando 1 segundos para comenzar.');
                this.Init();
            }, 1000);
        });
    }

    Init() {
        this.Elements = Array.from(document.getElementsByClassName('select-users'));
        console.log(this.Elements);

        if (this.Elements.length >= 1) {

            this.Elements.map((elem) => {
                this.CreateSibling(elem);
            });

        }
    }

    CreateSibling(element) {
        const sibling = document.createElement('div');
        sibling.style.width = element.style.width;
        sibling.classList.add('selectable-pane');
        element.parentElement.appendChild(sibling);
    }
}
const selectable = new Selectable();