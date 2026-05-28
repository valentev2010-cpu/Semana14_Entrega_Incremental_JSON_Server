import { categorias } from './config.js';

export function setTexto(selector, texto) {
  const elemento = document.querySelector(selector);
  if (elemento) elemento.textContent = texto;
}

export function mostrarEstadoApi(estaActiva) {
  const estado = document.querySelector('#estadoApi');
  if (!estado) return;
  estado.textContent = estaActiva ? 'Activa' : 'Sin conexion';
  estado.classList.toggle('text-success', estaActiva);
  estado.classList.toggle('text-danger', !estaActiva);
}

export function renderProductos(productos, categoria = 'todas') {
  const contenedor = document.querySelector('#productosContainer');
  if (!contenedor) return;

  const filtrados = categoria === 'todas'
    ? productos
    : productos.filter((producto) => producto.categoria === categoria);

  if (!filtrados.length) {
    contenedor.innerHTML = `
      <div class="col-12">
        <div class="alert alert-warning">No hay productos para esta categoria.</div>
      </div>
    `;
    return;
  }

  contenedor.innerHTML = filtrados.map((producto) => `
    <article class="col-md-6 col-xl-3">
      <div class="card product-card h-100">
        <div class="card-body">
          <div class="product-icon" aria-hidden="true">${iconoCategoria(producto.categoria)}</div>
          <span class="badge text-bg-light mb-3">${categorias[producto.categoria] ?? producto.categoria}</span>
          <h3 class="h5">${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
          <p class="fw-bold mb-1">${producto.precio === 0 ? 'Gratis' : `$${producto.precio.toLocaleString('es-CO')}`}</p>
          <span class="badge ${producto.disponible ? 'text-bg-success' : 'text-bg-secondary'}">
            ${producto.disponible ? 'Disponible' : 'No disponible'}
          </span>
        </div>
      </div>
    </article>
  `).join('');
}

function iconoCategoria(categoria) {
  const iconos = {
    alimentos: '🥕',
    educacion: '📚',
    artesanias: '🧺',
    turismo: '🌿'
  };
  return iconos[categoria] ?? '📌';
}

export function renderVisitantes(visitantes) {
  setTexto('#totalVisitantes', visitantes.length);
  setTexto('#ultimoRegistro', visitantes[0]?.nombre ?? 'Sin datos');

  const tabla = document.querySelector('#tablaVisitantes');
  if (!tabla) return;

  if (!visitantes.length) {
    tabla.innerHTML = `
      <tr>
        <td colspan="4" class="text-center text-muted py-4">Aun no hay visitantes registrados.</td>
      </tr>
    `;
    return;
  }

  tabla.innerHTML = visitantes.slice(0, 8).map((visitante) => `
    <tr>
      <td>${visitante.nombre}</td>
      <td><span class="badge text-bg-primary">${categorias[visitante.interes] ?? visitante.interes}</span></td>
      <td>${visitante.telefono}</td>
      <td>${formatearFecha(visitante.fechaRegistro)}</td>
    </tr>
  `).join('');
}

export function renderRequisitos(requisitos) {
  const contenedor = document.querySelector('#requisitosContainer');
  if (!contenedor) return;

  contenedor.innerHTML = requisitos.map((requisito) => `
    <article class="col-md-6 col-xl-4">
      <div class="card requirement-card h-100 ${requisito.cumple ? 'is-done' : ''}">
        <div class="card-body">
          <span class="badge ${requisito.cumple ? 'text-bg-success' : 'text-bg-warning'} mb-3">
            ${requisito.cumple ? 'Cumple' : 'Pendiente'}
          </span>
          <h3 class="h6">${requisito.criterio}</h3>
          <p class="small text-muted mb-0"><strong>Categoria:</strong> ${requisito.categoria}</p>
          <p class="small text-muted mb-0"><strong>Evidencia:</strong> ${requisito.evidencia}</p>
        </div>
      </div>
    </article>
  `).join('');
}

export function mostrarErrorCarga(contenedorSelector, mensaje) {
  const contenedor = document.querySelector(contenedorSelector);
  if (!contenedor) return;
  contenedor.innerHTML = `
    <div class="col-12">
      <div class="alert alert-danger">
        <strong>No se pudo cargar la informacion.</strong><br />
        ${mensaje}<br />
        Verifica que JSON Server este activo con <code>npm run db</code> o usa <code>npm run start</code>.
      </div>
    </div>
  `;
}

export function mostrarErroresFormulario(formulario, errores) {
  Object.entries(errores).forEach(([campo, mensaje]) => {
    const input = formulario.elements[campo];
    const error = document.querySelector(`#error${capitalizar(campo)}`);

    if (!input || !error) return;

    const tieneError = Boolean(mensaje);
    input.classList.toggle('is-invalid', tieneError);
    input.classList.toggle('is-valid', !tieneError && campo !== 'comentario');
    error.textContent = mensaje;
  });
}

export function limpiarErroresFormulario(formulario) {
  [...formulario.elements].forEach((elemento) => {
    elemento.classList?.remove('is-invalid', 'is-valid');
  });

  formulario.querySelectorAll('.invalid-feedback').forEach((error) => {
    error.textContent = '';
  });
}

export function leerDatosFormulario(formulario) {
  const formData = new FormData(formulario);

  return {
    nombre: formData.get('nombre'),
    correo: formData.get('correo'),
    telefono: String(formData.get('telefono') ?? '').replace(/\D/g, ''),
    interes: formData.get('interes'),
    comentario: formData.get('comentario'),
    aceptaContacto: Boolean(formData.get('aceptaContacto')),
    fechaRegistro: new Date().toISOString()
  };
}

export function actualizarContadorComentario() {
  const textarea = document.querySelector('#comentario');
  const contador = document.querySelector('#contadorComentario');
  if (!textarea || !contador) return;
  contador.textContent = `${textarea.value.length}/180`;
}

function formatearFecha(fechaISO) {
  if (!fechaISO) return 'Sin fecha';
  return new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(new Date(fechaISO));
}

function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
