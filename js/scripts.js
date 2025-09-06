// Muestra la fecha y hora en vivo
function actualizarFechaHora() {
  const ahora = new Date();
  const fechaHora = document.getElementById('fechaHora');
  if (fechaHora) {
    fechaHora.textContent = ahora.toLocaleString('es-CL');
  }
}
setInterval(actualizarFechaHora, 1000);

// Actualiza el contador leyendo lo que existe en listaArticulos
function actualizarContador() {
  const lista = document.getElementById('listaArticulos');
  const contador = document.getElementById('contadorArticulos');
  if (lista && contador) {
    let total = 0;

    // Si es página con cards (index.html)
    if (lista.querySelectorAll('.col-md-4').length > 0) {
      total = lista.querySelectorAll('.col-md-4').length;
    }

    // Si es página con lista ul (negocios y deporte)
    else if (lista.querySelectorAll('li').length > 0) {
      total = lista.querySelectorAll('li').length;
    }

    contador.textContent = "Total de artículos: " + total;
  }
}

// Inicia la lógica del formulario de artículos
function initFormularioArticulos() {
  const form = document.getElementById('formArticulo');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const titulo = document.getElementById('tituloArticulo').value;
      const desc = document.getElementById('descripcionArticulo').value;
      const lista = document.getElementById('listaArticulos');

      // Si la página es index.html agrego como card
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
      } 

      // Si la página es negocios.html o deporte.html agrego como ítem de la lista
      else if (lista && lista.querySelector('ul')) {
        const nuevoItem = document.createElement('li');
        nuevoItem.classList.add('list-group-item');
        nuevoItem.textContent = titulo + " - " + desc;
        lista.querySelector('ul').appendChild(nuevoItem);
      }

      // Actualizo contador y limpio el formulario
      actualizarContador();
      this.reset();
    });
  }
}

// Inicia la lógica del formulario de contacto
function initFormularioContacto() {
  const form = document.getElementById('formContacto');
  const mensajeEnviado = document.getElementById('mensajeEnviado');
  if (form && mensajeEnviado) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      mensajeEnviado.classList.remove('d-none');
      setTimeout(() => mensajeEnviado.classList.add('d-none'), 3000);
      this.reset();
    });
  }
}

// Cargo todo cuando la página ya está lista
document.addEventListener('DOMContentLoaded', function() {
  actualizarFechaHora();
  actualizarContador();
  initFormularioArticulos();
  initFormularioContacto();
});