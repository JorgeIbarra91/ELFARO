// variable global con el total de articulos
let contadorTotal = 0;

// lista de imagenes para asignar a articulos nuevos de forma aleatoria
const imagenesAleatorias = [
    "imagenes/noticia1.jpg",
    "imagenes/noticia2.jpg",
    "imagenes/noticia3.jpg",
    "imagenes/deporte1.jpg",
    "imagenes/deporte2.jpg",
    "imagenes/negocios1.jpg",
    "imagenes/negocios2.jpg"
];

// se ejecuta cuando el documento esta listo
document.addEventListener('DOMContentLoaded', function() {
    actualizarReloj();
    setInterval(actualizarReloj, 1000);

    contarArticulosExistentes();
    configurarFormularios();
    configurarBotonAjax();
});

// -----------------------------
// funcion reloj
// -----------------------------
function actualizarReloj() {
    const ahora = new Date();

    const fecha = ahora.toLocaleDateString('es-ES', {
        day: '2-digit', month: '2-digit', year: 'numeric'
    });

    const hora = ahora.toLocaleTimeString('es-ES', {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });

    const spanFecha = document.getElementById('fecha-actual');
    const spanHora = document.getElementById('hora-actual');

    if (spanFecha && spanHora) {
        spanFecha.textContent = fecha;
        spanHora.textContent = hora;
    }
}

// -----------------------------
// funciones contador
// -----------------------------
function contarArticulosExistentes() {
    const existentes = document.querySelectorAll('.articulo-existente').length;
    const dinamicos = document.querySelectorAll('#articulos-dinamicos .card').length;
    contadorTotal = existentes + dinamicos;
    actualizarContador();
}

function actualizarContador() {
    const contador = document.getElementById('contador-articulos');
    if (contador) {
        contador.textContent = contadorTotal;
    }
}

// -----------------------------
// configuracion de formularios
// -----------------------------
function configurarFormularios() {
    // formulario de contacto
    const formContacto = document.getElementById('contacto-form');
    if (formContacto) {
        formContacto.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mensaje enviado correctamente');
            formContacto.reset();
        });
    }

    // formulario para agregar articulos
    const formArticulo = document.getElementById('form-articulo');
    if (formArticulo) {
        formArticulo.addEventListener('submit', function(e) {
            e.preventDefault();

            const titulo = document.getElementById('titulo-articulo').value;
            const contenido = document.getElementById('contenido-articulo').value;
            const fecha = new Date().toLocaleDateString('es-ES');

            // se elige una imagen al azar de la lista
            const imagenRandom = imagenesAleatorias[Math.floor(Math.random() * imagenesAleatorias.length)];

            const nuevoArticulo = {
                titulo: titulo,
                contenido: contenido,
                fecha: fecha,
                imagen: imagenRandom
            };

            const contenedor = document.getElementById('articulos-dinamicos');
            contenedor.appendChild(crearArticuloHTML(nuevoArticulo));

            contadorTotal++;
            actualizarContador();

            formArticulo.reset();
            alert('Articulo agregado correctamente');
        });
    }
}

// -----------------------------
// configuracion boton ajax
// -----------------------------
function configurarBotonAjax() {
    const boton = document.getElementById('cargar-articulos');
    if (boton) {
        boton.addEventListener('click', function() {
            const seccion = boton.getAttribute('data-seccion');
            fetch('articulos.json')
                .then(res => res.json())
                .then(data => {
                    if (data[seccion]) {
                        const contenedor = document.getElementById('articulos-dinamicos');
                        data[seccion].forEach(art => {
                            contenedor.appendChild(crearArticuloHTML(art));
                            contadorTotal++;
                        });
                        actualizarContador();
                        boton.disabled = true;
                        boton.textContent = 'Articulos cargados';
                        boton.classList.remove('btn-success');
                        boton.classList.add('btn-secondary');
                    }
                })
                .catch(err => {
                    console.error(err);
                    alert('Error cargando articulos');
                });
        });
    }
}

// -----------------------------
// crear tarjeta de articulo
// -----------------------------
function crearArticuloHTML(articulo) {
    const div = document.createElement('div');
    div.className = 'col-md-6 mb-3';

    // si el articulo trae imagen se muestra dentro de un ratio bootstrap
    const imgHTML = articulo.imagen 
        ? `
        <div class="ratio ratio-16x9">
            <img src="${articulo.imagen}" class="card-img-top" alt="imagen-articulo" style="object-fit:cover;">
        </div>
        `
        : '';

    div.innerHTML = `
        <div class="card">
            ${imgHTML}
            <div class="card-body">
                <h5 class="card-title">${articulo.titulo}</h5>
                <p class="card-text">${articulo.contenido}</p>
                <small class="text-muted">${articulo.fecha}</small>
            </div>
        </div>
    `;
    return div;
}