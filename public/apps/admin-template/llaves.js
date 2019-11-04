window.onload = (function () {
    //Agregar css para esta página
    var head = document.getElementsByTagName('HEAD')[0];
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = './admin-template/assets/css/custom/llaves.css';
    head.appendChild(link);

    const backdrop = document.createElement('div');
    backdrop.classList.add('keys-backdrop');
    backdrop.id = 'keys-backdrop';

    backdrop.innerHTML = `
    <div class="kb-child">
        <div class="card" style="height:400px;">
        <div class="card-header">
        <h3 class="card-title">Llaves</h3>
        </div>
        <div class="card-body" style="overflow-y:scroll">
            <ul id="keys-list">
                
            </ul>
        </div>
        <div class="card-footer">
            <div class="card-options">
                <a href="#" class="btn btn-primary btn-sm" onclick="CloseKeys()">Cerrar</a>
            </div>
      </div>
    </div>
  <div>`;
    var body = document.getElementsByTagName('body')[0];
    backdrop.style.height = body.scrollHeight + 'px';
    body.insertBefore(backdrop, body.firstChild);
});



function ShowKeys(el) {
    const backdrop = document.getElementById('keys-backdrop');
    backdrop.style.visibility = 'visible';
    const keys = document.getElementById(el.id + 'keys');
    const list = document.getElementById('keys-list');
    keysarray = keys.textContent.split(',');

    let listItems = '';
    let length = keysarray.length;
    for (let i = 0; i < length; i++) {
        const key = keysarray[i];
        listItems += `<li>${key}</li>`;
    }
    console.log(listItems);

    list.innerHTML = listItems;
}
function CloseKeys() {
    const backdrop = document.getElementById('keys-backdrop');
    backdrop.style.visibility = 'hidden';
}