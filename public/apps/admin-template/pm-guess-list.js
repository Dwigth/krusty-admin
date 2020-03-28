/**
 * @fileoverview Clase para generar una lista de invitados por proyectos.
 * @requires ProjectManagement
 * @requires HTMLElement con id "guessList"
 */
class ProjectManagementGuessList {

    GUESS_LIST;
    GUESS_LIST_ELEMENTS = [];

    constructor() {

        this.GUESS_LIST = document.getElementById('guessList');
        this.BuildGuessList();
    }

    BuildGuessList() {
        const userSession = session.Get();
        const user = { id_admin: userSession.id_admin, img: userSession.img, nombre: userSession.nombre }
        setTimeout(() => {
            const guesses = window.ProjectManagement.CurrentProject.invitados;
            guesses.push(user)
            guesses.forEach(guess => {
                const guessElement = document.createElement('span');
                const smallName = document.createElement('small');
                guessElement.classList.add('avatar', 'avatar-lg');
                guessElement.style.backgroundImage = `url(${guess.img})`;
                smallName.textContent = guess.nombre;
                guessElement.appendChild(smallName)
                this.GUESS_LIST_ELEMENTS.push(guessElement);
                this.GUESS_LIST.appendChild(guessElement);
            });
        }, 1000);
    }

    /**
     * Crea un elemento AVATAR de un invitado
     * @param {*} guess 
     */
    CreateGuessElement(guess) {
        const guessElement = document.createElement('span');
        guessElement.classList.add('avatar');
        guessElement.style.backgroundImage = `url(${guess.img})`;
        return guessElement;
    }
}

const pmGuessList = new ProjectManagementGuessList();
window.ProjectManagementGuessList = pmGuessList;