import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Swal from 'sweetalert2';
import '../css/styles.css';

import { obtenerProductos, obtenerVisitantes, crearVisitante, obtenerRequisitos, verificarApi } from './api.js';
import { validarFormularioVisitante, tieneErrores } from './validaciones.js';
import {
  actualizarContadorComentario,
  leerDatosFormulario,
  limpiarErroresFormulario,
  mostrarErrorCarga,
  mostrarErroresFormulario,
  mostrarEstadoApi,
  renderProductos,
  renderRequisitos,
  renderVisitantes
} from './ui.js';
import { renderGraficoIntereses } from './charts.js';

let productos = [];
let visitantes = [];

const elementos = {
  filtroCategoria: document.querySelector('#filtroCategoria'),
  btnRecargarProductos: document.querySelector('#btnRecargarProductos'),
  btnRecargarVisitantes: document.querySelector('#btnRecargarVisitantes'),
  formulario: document.querySelector('#formVisitante'),
  comentario: document.querySelector('#comentario')
};

iniciarAplicacion();

async function iniciarAplicacion() {
  registrarEventos();
  await comprobarApi();
  await cargarProductos();
  await cargarVisitantes();
  await cargarRequisitos();
}

function registrarEventos() {
  elementos.filtroCategoria?.addEventListener('change', () => {
    renderProductos(productos, elementos.filtroCategoria.value);
  });

  elementos.btnRecargarProductos?.addEventListener('click', cargarProductos);
  elementos.btnRecargarVisitantes?.addEventListener('click', cargarVisitantes);
  elementos.comentario?.addEventListener('input', actualizarContadorComentario);

  elementos.formulario?.addEventListener('reset', () => {
    setTimeout(() => {
      limpiarErroresFormulario(elementos.formulario);
      actualizarContadorComentario();
    }, 0);
  });

  elementos.formulario?.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    await manejarEnvioFormulario();
  });
}

async function comprobarApi() {
  const activa = await verificarApi();
  mostrarEstadoApi(activa);
}

async function cargarProductos() {
  try {
    productos = await obtenerProductos();
    renderProductos(productos, elementos.filtroCategoria?.value ?? 'todas');
    await comprobarApi();
  } catch (error) {
    mostrarEstadoApi(false);
    mostrarErrorCarga('#productosContainer', error.message);
  }
}

async function cargarVisitantes() {
  try {
    visitantes = await obtenerVisitantes();
    renderVisitantes(visitantes);
    renderGraficoIntereses(visitantes);
    await comprobarApi();
  } catch (error) {
    mostrarEstadoApi(false);
    renderVisitantes([]);
    renderGraficoIntereses([]);
    console.error(error);
  }
}

async function cargarRequisitos() {
  try {
    const requisitos = await obtenerRequisitos();
    renderRequisitos(requisitos);
  } catch (error) {
    mostrarErrorCarga('#requisitosContainer', error.message);
  }
}

async function manejarEnvioFormulario() {
  const datos = leerDatosFormulario(elementos.formulario);
  const errores = validarFormularioVisitante(datos);
  mostrarErroresFormulario(elementos.formulario, errores);

  if (tieneErrores(errores)) {
    await Swal.fire({
      icon: 'warning',
      title: 'Revisa el formulario',
      text: 'Hay campos que debes corregir antes de guardar el registro.',
      confirmButtonText: 'Entendido'
    });
    return;
  }

  try {
    await crearVisitante(datos);
    elementos.formulario.reset();
    limpiarErroresFormulario(elementos.formulario);
    actualizarContadorComentario();
    await cargarVisitantes();

    await Swal.fire({
      icon: 'success',
      title: 'Registro guardado',
      text: 'El visitante fue registrado correctamente en JSON Server.',
      confirmButtonText: 'Continuar'
    });
  } catch (error) {
    mostrarEstadoApi(false);
    await Swal.fire({
      icon: 'error',
      title: 'No se pudo guardar',
      text: 'Verifica que JSON Server este activo. Ejecuta npm run db o npm run start.',
      confirmButtonText: 'Revisar'
    });
    console.error(error);
  }
}
