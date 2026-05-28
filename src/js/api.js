import { API_URL } from './config.js';

async function request(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status} al consultar ${endpoint}`);
  }

  return response.json();
}

export function obtenerProductos() {
  return request('/productos');
}

export function obtenerVisitantes() {
  return request('/visitantes?_sort=fechaRegistro&_order=desc');
}

export function crearVisitante(visitante) {
  return request('/visitantes', {
    method: 'POST',
    body: JSON.stringify(visitante)
  });
}

export function obtenerRequisitos() {
  return request('/requisitos');
}

export function obtenerBugs() {
  return request('/bugs');
}

export async function verificarApi() {
  try {
    await request('/productos');
    return true;
  } catch (error) {
    return false;
  }
}
