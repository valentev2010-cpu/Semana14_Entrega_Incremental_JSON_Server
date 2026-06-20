export function limpiarTexto(valor) {
  return String(valor ?? '').trim();
}

export function validarNombre(nombre) {
  const texto = limpiarTexto(nombre);

  if (!texto) {
    return 'El nombre es obligatorio.';
  }

  if (texto.length < 3) {
    return 'El nombre debe tener minimo 3 caracteres.';
  }

  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(texto)) {
    return 'El nombre solo debe contener letras y espacios.';
  }

  return '';
}

export function validarCorreo(correo) {
  const texto = limpiarTexto(correo);

  if (!texto) {
    return 'El correo es obligatorio.';
  }

  const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!patronCorreo.test(texto)) {
    return 'Escribe un correo valido. Ejemplo: nombre@correo.com';
  }

  return '';
}

export function validarTelefono(telefono) {
  const soloDigitos = limpiarTexto(telefono).replace(/\D/g, '');

  if (!soloDigitos) {
    return 'El telefono es obligatorio.';
  }

  // RETO 1 PARA EL ESTUDIANTE:
  // La actividad pide validar exactamente 10 digitos.
  // Esta version inicial es flexible y acepta 7 o mas digitos.
  // Debes corregirla para que solo acepte 10 digitos.
  if (soloDigitos.length !== 10) {
    return 'El telefono debe tener exactamente 10 digitos.';
  }

  return '';
}

export function validarInteres(interes) {
  const texto = limpiarTexto(interes);
  const opcionesValidas = ['alimentos', 'educacion', 'artesanias', 'turismo'];

  if (!texto) {
    return 'Selecciona un interes principal.';
  }

  if (!opcionesValidas.includes(texto)) {
    return 'Selecciona una opcion valida de la lista.';
  }

  return '';
}

export function validarComentario(comentario) {
  const texto = limpiarTexto(comentario);

  if (texto.length > 180) {
    return 'El comentario no debe superar 180 caracteres.';
  }

  if (texto && texto.length < 10) {
    return 'Si escribes un comentario, debe tener al menos 10 caracteres.';
  }

  return '';
}

export function validarAceptaContacto(aceptaContacto) {
  if (!aceptaContacto) {
    return 'Debes autorizar el contacto para continuar.';
  }

  return '';
}

export function validarFormularioVisitante(datos) {
  return {
    nombre: validarNombre(datos.nombre),
    correo: validarCorreo(datos.correo),
    telefono: validarTelefono(datos.telefono),
    interes: validarInteres(datos.interes),
    comentario: validarComentario(datos.comentario),
    aceptaContacto: validarAceptaContacto(datos.aceptaContacto)
  };
}

export function tieneErrores(errores) {
  return Object.values(errores).some(Boolean);
}
