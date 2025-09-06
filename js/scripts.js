// Fecha y hora
function actualizarFechaHora() {
  const ahora = new Date();
  const fechaHora = document.getElementById('fechaHora');
  if (fechaHora) {
    fechaHora.textContent = ahora.toLocaleString('es-CL');
  }
}
setInterval(actualizarFechaHora, 1000);


// Formulario de artículos
function initFormularioArticulos() {
  const form = document.getElementById('formArticulo');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const titulo = document.getElementById('tituloArticulo').value;
      const desc = document.getElementById('descripcionArticulo').value;
      const lista = document.getElementById('listaArticulos');
      if (lista && lista.classList.contains('row')) {
        const nuevo = `
          <div class="col-md-4">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">${titulo}</h5>
                <p class="card-text">${desc}</p>
              </div>
            </div>
          </div>`;
        lista.insertAdjacentHTML('beforeend', nuevo);
      } else if (lista && lista.querySelector('ul')) {
        const nuevoItem = document.createElement('li');
        nuevoItem.classList.add('list-group-item');
        nuevoItem.textContent = titulo + " - " + desc;
        lista.querySelector('ul').appendChild(nuevoItem);
      }
      actualizarContador();
      this.reset();
    });
  }
}

// Inicializar funciones
document.addEventListener('DOMContentLoaded', function() {
  actualizarFechaHora();
  actualizarContador();
  initFormularioArticulos();
  initFormularioContacto();
});