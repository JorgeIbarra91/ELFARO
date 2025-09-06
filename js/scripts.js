// Muestra la fecha y hora
function actualizarFechaHora() {
  const ahora = new Date();
  const fechaHora = document.getElementById('fechaHora');
  if (fechaHora) {
    fechaHora.textContent = ahora.toLocaleString('es-CL');
  }
}
setInterval(actualizarFechaHora, 1000);

// Cuenta siempre lo que está en la lista de artículos
function actualizarContador() {
  const lista = document.getElementById('listaArticulos');
  const contador = document.getElementById('contadorArticulos');

  if (lista && contador) {
    let total = 0;

    // Si la lista es por cards (index o deportes)
    if (lista.querySelectorAll('.col-md-4, .col-md-6').length > 0) {
      total = lista.querySelectorAll('.col-md-4, .col-md-6').length;
    }

    // Si es tipo lista ul (negocios)
    else if (lista.querySelectorAll('li').length > 0) {
      total = lista.querySelectorAll('li').length;
    }

    contador.textContent = "Total de artículos: " + total;
  }
}

// Manejo del formulario de artículos
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
      } 
      else if (lista && lista.querySelector('ul')) {
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

// Manejo del formulario de contacto
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

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
  actualizarFechaHora();
  actualizarContador();  // Esto ahora cuenta también las noticias iniciales
  initFormularioArticulos();
  initFormularioContacto();
});