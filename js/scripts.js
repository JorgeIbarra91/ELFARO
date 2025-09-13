// Variables globales
let articulosJSON = null;
let contadorTotal = 0;

// Funcion que se ejecuta cuando la pagina carga completamente
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar reloj
    actualizarReloj();
    setInterval(actualizarReloj, 1000);
    
    // Contar articulos existentes al cargar
    contarArticulosExistentes();
    
    // Configurar eventos de formularios
    configurarFormularios();
    
    // Configurar boton AJAX
    configurarBotonAjax();
});

// Actualiza fecha y hora en tiempo real
function actualizarReloj() {
    const ahora = new Date();
    
    // Formatear fecha
    const fecha = ahora.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    
    // Formatear hora
    const hora = ahora.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    // Actualizar elementos en pantalla
    document.getElementById('fecha-actual').textContent = fecha;
    document.getElementById('hora-actual').textContent = hora;
}

// Cuenta articulos que ya existen en la pagina
function contarArticulosExistentes() {
    const articulosExistentes = document.querySelectorAll('.articulo-existente');
    const articulosDinamicos = document.querySelectorAll('#articulos-dinamicos .card');
    
    contadorTotal = articulosExistentes.length + articulosDinamicos.length;
    actualizarContador();
}

// Actualiza el numero mostrado en el contador
function actualizarContador() {
    const contador = document.getElementById('contador-articulos');
    if (contador) {
        contador.textContent = contadorTotal;
    }
}

// Configura todos los formularios de la pagina
function configurarFormularios() {
    // Formulario de contacto
    const formContacto = document.getElementById('contacto-form');
    if (formContacto) {
        formContacto.addEventListener('submit', enviarContacto);
    }
    
    // Formulario de articulos
    const formArticulo = document.getElementById('form-articulo');
    if (formArticulo) {
        formArticulo.addEventListener('submit', agregarArticulo);
    }
}

// Configura el boton para cargar articulos con AJAX
function configurarBotonAjax() {
    const boton = document.getElementById('cargar-articulos');
    if (boton) {
        boton.addEventListener('click', cargarArticulosAjax);
    }
}

// Carga articulos desde JSON usando AJAX
function cargarArticulosAjax(evento) {
    const boton = evento.target;
    const seccion = boton.getAttribute('data-seccion');
    
    // Cambiar texto del boton mientras carga
    boton.textContent = 'Cargando...';
    boton.disabled = true;
    
    // Hacer peticion AJAX
    fetch('articulos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar articulos');
            }
            return response.json();
        })
        .then(data => {
            articulosJSON = data;
            mostrarArticulos(seccion);
            
            // Restaurar boton
            boton.textContent = 'Articulos cargados';
            boton.classList.remove('btn-success');
            boton.classList.add('btn-secondary');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('No se pudieron cargar los articulos');
            
            // Restaurar boton en caso de error
            boton.textContent = 'Cargar mas noticias';
            boton.disabled = false;
        });
}

// Muestra articulos de una seccion especifica
function mostrarArticulos(seccion) {
    const contenedor = document.getElementById('articulos-dinamicos');
    
    if (!articulosJSON || !articulosJSON[seccion]) {
        return;
    }
    
    // Limpiar contenedor
    contenedor.innerHTML = '';
    
    // Agregar cada articulo
    articulosJSON[seccion].forEach(articulo => {
        const articuloHTML = crearArticuloHTML(articulo);
        contenedor.appendChild(articuloHTML);
        contadorTotal++;
    });
    
    // Actualizar contador
    actualizarContador();
}

// Crea el HTML de un articulo
function crearArticuloHTML(articulo) {
    const div = document.createElement('div');
    div.className = 'col-md-6 mb-3';
    
    div.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${articulo.titulo}</h5>
                <p class="card-text">${articulo.contenido}</p>
                <small class="text-muted">${articulo.fecha}</small>
            </div>
        </div>
    `;
    
    return div;
}

// Maneja el envio del formulario de contacto
function enviarContacto(evento) {
    evento.preventDefault();
    
    // Obtener datos del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
    
    // Simular envio (en proyecto real iria a servidor)
    setTimeout(() => {
        alert('Mensaje enviado correctamente');
        
        // Limpiar formulario
        document.getElementById('contacto-form').reset();
    }, 500);
}

// Maneja el envio del formulario de articulos
function agregarArticulo(evento) {
    evento.preventDefault();
    
    // Obtener datos
    const titulo = document.getElementById('titulo-articulo').value;
    const contenido = document.getElementById('contenido-articulo').value;
    
    // Crear fecha actual
    const fecha = new Date().toLocaleDateString('es-ES');
    
    // Crear articulo
    const nuevoArticulo = {
        titulo: titulo,
        contenido: contenido,
        fecha: fecha
    };
    
    // Agregar al DOM
    const contenedor = document.getElementById('articulos-dinamicos');
    const articuloHTML = crearArticuloHTML(nuevoArticulo);
    contenedor.appendChild(articuloHTML);
    
    // Actualizar contador
    contadorTotal++;
    actualizarContador();
    
    // Limpiar formulario
    document.getElementById('form-articulo').reset();
    
    // Mostrar confirmacion
    alert('Articulo agregado correctamente');
}