class ChangePassword {

    constructor() {
        this.Form = document.getElementsByTagName('form')[1];
        let TokenInput = document.createElement('input');
        TokenInput.type = 'hidden'; TokenInput.value = profile.profile.token; TokenInput.name = 'token';
        this.Form.appendChild(TokenInput)

        this.BtnChange = document.getElementById('changep');
        this.BtnChange.addEventListener('click', (evt) => {
            evt.preventDefault();
            if (this.CheckPasswords()) {
                this.Form.submit();
            }
        })
    }
    /**
     * verifica que ningún input esté vació 
     */
    CheckPasswords() {
        /**
         * [0] = Contraseña previa
         * [1] = Contraseña nueva
         * [2] = Confirmación de contraseña
         */
        let inputs = [] = Array.from(this.Form.getElementsByTagName('input')).map(inp => inp.value);
        let AreEmpty = false;
        inputs.map(input => {
            if (input == '') {
                AreEmpty = true
                console.error('Uno de los campos está vacío.');
            }
        });
        if (AreEmpty) {
            return false;
        }
        if (inputs[2] != inputs[1]) {
            console.error('La contraseña nueva no coincide');
            return false;
        }
        return true;
    }
}

const changePassword = new ChangePassword();