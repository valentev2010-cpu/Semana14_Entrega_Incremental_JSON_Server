# Guia de pruebas - Semana 14

Esta guia te ayuda a comprobar que tu incremento funciona.

## 1. Prueba de ejecucion

1. Ejecuta `npm install`.
2. Ejecuta `npm run start`.
3. Abre `http://localhost:5173`.
4. Abre `http://localhost:3001/productos`.
5. Toma captura de ambos resultados.

Resultado esperado: el sitio carga y la API responde.

---

## 2. Prueba de carga de catalogo

1. Entra al sitio.
2. Revisa la seccion de productos.
3. Cambia el filtro de categoria.
4. Presiona el boton "Recargar catalogo".

Resultado esperado: los productos se muestran y el filtro funciona.

---

## 3. Pruebas de validacion

Realiza estos casos:

| Caso | Datos de entrada | Resultado esperado |
|---|---|---|
| Formulario vacio | Todos los campos vacios | Mensajes de error. |
| Correo invalido | `correo-malo` | Error de correo. |
| Telefono corto | `12345` | Error de telefono. |
| Telefono con letras | `abc30012` | No debe aceptarse como valido. |
| Sin interes | Campo interes vacio | Error de seleccion. |
| Sin autorizacion | Checkbox sin marcar | Error de autorizacion. |
| Datos correctos | Todos los campos validos | Registro guardado. |

---

## 4. Prueba de guardado en JSON Server

1. Envia un registro correcto.
2. Abre `http://localhost:3001/visitantes`.
3. Busca el registro nuevo.
4. Toma captura.

Resultado esperado: el nuevo visitante aparece en la API.

---

## 5. Prueba del panel

1. Guarda varios registros con intereses distintos.
2. Revisa la tabla.
3. Revisa el grafico.
4. Presiona "Actualizar tabla".

Resultado esperado: la tabla y el grafico reflejan los datos guardados.

---

## 6. Prueba responsive

1. Abre herramientas del navegador con `F12`.
2. Activa modo dispositivo movil.
3. Selecciona un ancho pequeno.
4. Revisa menu, formulario, tarjetas y tabla.
5. Toma captura.

Resultado esperado: el sitio se adapta y sigue siendo usable.

---

## 7. Prueba de consola

1. Abre la pestana Console.
2. Usa las funciones principales del sitio.
3. Verifica que no aparezcan errores rojos.
4. Toma captura.

Resultado esperado: consola sin errores despues de las pruebas.

---

## 8. Revision automatica

Ejecuta:

```bash
npm run check
```

Guarda captura del resultado.
