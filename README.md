# Semana 14 - Entrega incremental del sitio web con JSON Server

## Mejora de usabilidad, accesibilidad, diseno/estructura y optimizacion

Bienvenido/a. Esta guia fue creada para que puedas desarrollar la actividad paso a paso desde Visual Studio Code. No es una guia para el profesor: es tu ruta de trabajo. Lee primero, ejecuta despues y toma evidencias durante todo el proceso.

En esta semana no vas a empezar desde cero. Vas a trabajar sobre un proyecto base llamado **Feria Rural Digital** y lo vas a convertir en una version funcional incrementada. Eso significa que debes agregar, corregir, probar y demostrar una mejora real del sitio.

---

## 1. Que vas a construir

Vas a mejorar una pagina web que tiene:

- Catalogo de productos y actividades de una feria rural.
- Formulario de registro de visitantes.
- Base de datos local con **JSON Server**.
- Panel de resumen con tabla y grafico.
- Checklist de requisitos.
- Validaciones de formulario.
- Evidencias de pruebas.

Tu mision es lograr que el sitio funcione correctamente, que los datos se guarden en `db.json`, que la interfaz sea clara y usable, que el formulario valide bien la informacion y que puedas demostrar tu avance con capturas.

---

## 2. Que es una entrega incremental

Una **entrega incremental** es una version mejorada de un proyecto existente. En un proyecto real, el software no se entrega una sola vez y ya. Normalmente se mejora por partes: primero se crea una version inicial, luego se agregan funciones, se corrigen errores, se hacen pruebas y se documentan los cambios.

En esta actividad, el incremento consiste en mejorar el sitio con una funcionalidad practica:

> Registrar visitantes interesados en productos o actividades de la feria, guardar esos datos en una base local con JSON Server y mostrar los resultados en un panel.

---

## 3. Que aprenderas con esta actividad

Al finalizar, deberias poder:

1. Ejecutar un proyecto web con Vite.
2. Levantar una API local usando JSON Server.
3. Consultar datos desde JavaScript con `fetch`.
4. Guardar registros en `db.json` mediante una peticion `POST`.
5. Validar campos de formulario antes de guardar.
6. Mejorar usabilidad y accesibilidad de una interfaz.
7. Revisar errores en consola del navegador.
8. Documentar evidencias tecnicas de tus pruebas.
9. Explicar que cambiaste, por que lo hiciste y como comprobaste que funciona.

---

## 4. Librerias que usa este proyecto

Este proyecto utiliza varias herramientas profesionales. No debes memorizarlas todas de una vez, pero si debes entender para que sirve cada una.

| Herramienta | Para que sirve en esta actividad |
|---|---|
| Vite | Ejecutar el sitio web localmente de forma rapida. |
| JSON Server | Simular una base de datos y una API local usando `db.json`. |
| Bootstrap | Mejorar el diseno responsive y la estructura visual. |
| Bootstrap Icons | Agregar iconos sin cargar imagenes pesadas. |
| SweetAlert2 | Mostrar alertas visuales mas claras al usuario. |
| Chart.js | Crear un grafico con los intereses registrados. |
| Concurrently | Ejecutar al mismo tiempo Vite y JSON Server. |

---

## 5. Requisitos antes de empezar

Necesitas tener instalado:

1. **Visual Studio Code**.
2. **Node.js** en version actual o reciente.
3. Un navegador web, preferiblemente Google Chrome, Microsoft Edge o Firefox.
4. Conexion a internet para instalar las librerias la primera vez.

Para verificar si tienes Node.js instalado, abre la terminal y escribe:

```bash
node -v
```

Luego verifica npm:

```bash
npm -v
```

Si ambos comandos muestran un numero de version, puedes continuar.

---

## 6. Como abrir el proyecto

1. Descarga y descomprime el ZIP entregado.
2. Abre Visual Studio Code.
3. Selecciona **File > Open Folder** o **Archivo > Abrir carpeta**.
4. Abre la carpeta del proyecto.
5. Abre la terminal integrada con:

```bash
Ctrl + `
```

Tambien puedes ir a **Terminal > New Terminal**.

---

## 7. Instalacion de librerias

Dentro de la carpeta del proyecto, ejecuta:

```bash
npm install
```

Este comando descarga las librerias necesarias. Puede tardar unos minutos.

Cuando termine, aparecera una carpeta llamada `node_modules`. No debes editarla ni subirla a Moodle si el archivo queda muy pesado.

---

## 8. Como ejecutar el proyecto completo

Este proyecto necesita dos servicios funcionando al mismo tiempo:

1. El sitio web con Vite.
2. La base de datos local con JSON Server.

La forma mas facil es ejecutar:

```bash
npm run start
```

Ese comando abre ambos servicios al mismo tiempo.

Normalmente veras algo parecido a esto:

```text
Local:   http://localhost:5173/
JSON Server started on http://localhost:3001
```

Abre en el navegador:

```text
http://localhost:5173
```

La API local debe quedar disponible en:

```text
http://localhost:3001
```

Puedes probar la base de datos abriendo:

```text
http://localhost:3001/productos
http://localhost:3001/visitantes
http://localhost:3001/requisitos
```

---

## 9. Si `npm run start` falla

Puedes abrir dos terminales separadas.

En la primera terminal ejecuta:

```bash
npm run db
```

En la segunda terminal ejecuta:

```bash
npm run dev
```

Luego abre:

```text
http://localhost:5173
```

Si el catalogo no carga o el formulario no guarda, casi siempre significa que olvidaste ejecutar JSON Server.

---

## 10. Estructura del proyecto

```text
semana14-entrega-incremental-json-server/
|
|-- index.html
|-- package.json
|-- db.json
|-- db.original.json
|-- README.md
|
|-- src/
|   |-- css/
|   |   |-- styles.css
|   |
|   |-- js/
|       |-- app.js
|       |-- api.js
|       |-- charts.js
|       |-- config.js
|       |-- ui.js
|       |-- validaciones.js
|
|-- docs/
|   |-- checklist-requisitos.md
|   |-- guia-pruebas.md
|   |-- informe-entrega.md
|   |-- bitacora-bugs.md
|   |-- rubrica.md
|   |-- guia-json-server.md
|   |-- investigacion-previa.md
|
|-- evidencias/
|   |-- antes/
|   |-- despues/
|   |-- pruebas/
|
|-- scripts/
    |-- check-project.js
    |-- reset-db.js
```

---

## 11. Que hace cada archivo importante

### `index.html`

Contiene la estructura principal del sitio: menu, secciones, formulario, tabla, panel y checklist. Aqui debes revisar accesibilidad, etiquetas, estructura semantica y textos visibles.

### `src/css/styles.css`

Contiene los estilos personalizados. Aqui puedes ajustar colores, espacios, responsive, tamanos, tarjetas, contraste visual y detalles de usabilidad.

### `src/js/app.js`

Es el archivo principal de JavaScript. Conecta eventos, carga productos, carga visitantes, envia el formulario y actualiza el panel.

### `src/js/api.js`

Contiene las funciones que se comunican con JSON Server usando `fetch`.

### `src/js/validaciones.js`

Contiene las reglas del formulario. Este archivo tiene retos marcados con comentarios. Debes revisarlo y mejorarlo.

### `src/js/ui.js`

Contiene funciones para mostrar productos, visitantes, requisitos y errores en pantalla.

### `src/js/charts.js`

Genera el grafico con Chart.js.

### `db.json`

Es la base de datos local. JSON Server lee este archivo y lo convierte en una API.

---

## 12. Actividad principal

Debes realizar una entrega incremental del sitio. Para lograrlo, desarrolla estas tareas:

### Tarea 1: Ejecuta el proyecto

1. Instala librerias con `npm install`.
2. Ejecuta el proyecto con `npm run start`.
3. Abre `http://localhost:5173`.
4. Verifica que carguen productos, visitantes, grafico y requisitos.
5. Toma una captura inicial y guardala en `evidencias/antes/`.

### Tarea 2: Revisa la consola

1. Abre las herramientas del navegador con `F12`.
2. Entra a la pestana **Console**.
3. Usa el sitio: filtra productos, envia formularios, recarga visitantes.
4. Identifica si aparecen errores.
5. Toma captura de la consola y guardala en `evidencias/pruebas/`.

### Tarea 3: Corrige las validaciones

Abre:

```text
src/js/validaciones.js
```

Busca los comentarios que dicen **RETO PARA EL ESTUDIANTE**.

Debes corregir como minimo:

1. El telefono debe tener exactamente 10 digitos.
2. Si el comentario existe, debe tener minimo 10 caracteres.
3. La autorizacion de contacto debe ser obligatoria.
4. Los mensajes de error deben ser claros para el usuario.

Ejemplo esperado para telefono:

```js
if (soloDigitos.length !== 10) {
  return 'El telefono debe tener exactamente 10 digitos. Ejemplo: 3001234567.';
}
```

No copies sin entender. Lee la funcion completa y prueba diferentes casos.

### Tarea 4: Prueba el formulario

Prueba minimo estos casos:

| Caso | Que debes comprobar |
|---|---|
| Nombre vacio | Debe mostrar error. |
| Correo incorrecto | Debe mostrar error. |
| Telefono con menos de 10 digitos | Debe mostrar error. |
| Telefono con letras | Debe limpiar o rechazar el dato. |
| Interes sin seleccionar | Debe mostrar error. |
| Autorizacion sin marcar | Debe mostrar error. |
| Datos correctos | Debe guardar en JSON Server. |

Toma capturas de al menos tres pruebas.

### Tarea 5: Verifica la base de datos

Despues de guardar un visitante, abre:

```text
http://localhost:3001/visitantes
```

Verifica que aparezca el nuevo registro.

Tambien puedes revisar directamente el archivo `db.json`.

### Tarea 6: Mejora usabilidad y accesibilidad

Revisa el sitio con estos criterios:

- Los botones explican claramente que hacen.
- El menu permite moverse por la pagina.
- Los campos tienen etiquetas visibles.
- Los mensajes de error explican como corregir.
- El sitio se entiende en celular.
- Los colores tienen buen contraste.
- La informacion esta separada por secciones claras.
- No hay elementos innecesarios que distraigan.

Realiza al menos **tres mejoras visuales o de usabilidad** y explicalas en tu informe.

### Tarea 7: Mejora la estructura y organizacion del codigo

Revisa que:

- HTML, CSS y JS esten separados.
- Los nombres de funciones sean claros.
- No haya codigo repetido innecesario.
- Los comentarios ayuden a comprender el codigo.
- Los archivos esten en carpetas organizadas.

Puedes mejorar nombres, comentarios o pequenos bloques si lo consideras necesario.

### Tarea 8: Ejecuta la revision automatica

Cuando termines, ejecuta:

```bash
npm run check
```

Este comando revisa aspectos basicos del proyecto. Si aparecen pendientes, corrige lo necesario.

Toma captura del resultado y guardala en:

```text
evidencias/pruebas/
```

### Tarea 9: Completa la documentacion

Debes completar estos archivos:

```text
docs/checklist-requisitos.md
docs/informe-entrega.md
docs/bitacora-bugs.md
```

No los dejes vacios. La documentacion hace parte de la nota.

---

## 13. Que debes entregar en Moodle

Entrega un archivo `.zip` con:

1. Proyecto completo.
2. `README.md` actualizado si agregaste notas.
3. Carpeta `docs/` diligenciada.
4. Carpeta `evidencias/` con capturas.
5. Archivo `db.json` con datos de prueba.
6. Captura de consola sin errores.
7. Captura del comando `npm run check`.
8. Captura del sitio en modo escritorio y modo movil.

Si trabajas con repositorio, tambien puedes entregar el enlace, pero igual debes subir las evidencias solicitadas.

---

## 14. Evidencias minimas

Guarda tus capturas asi:

```text
evidencias/antes/01-vista-inicial.png
evidencias/pruebas/01-consola-inicial.png
evidencias/pruebas/02-validacion-telefono.png
evidencias/pruebas/03-registro-json-server.png
evidencias/pruebas/04-npm-run-check.png
evidencias/despues/01-vista-final-escritorio.png
evidencias/despues/02-vista-final-movil.png
```

No es obligatorio usar exactamente esos nombres, pero si deben ser claros.

---

## 15. Como probar en modo movil

1. Abre el sitio en el navegador.
2. Presiona `F12`.
3. Activa el icono de dispositivo movil.
4. Prueba un ancho pequeno, por ejemplo 390 x 844.
5. Verifica que el menu, el formulario, las tarjetas y la tabla se adapten correctamente.
6. Toma captura y guardala en `evidencias/despues/`.

---

## 16. Preguntas guia para tu informe

Responde en `docs/informe-entrega.md`:

1. Que incremento funcional entregaste?
2. Que errores o debilidades encontraste?
3. Que cambios hiciste en HTML, CSS y JavaScript?
4. Como comprobaste que el formulario guarda datos en JSON Server?
5. Que pruebas realizaste?
6. Que mejoraste en usabilidad?
7. Que mejoraste en accesibilidad?
8. Que aprendiste sobre entregar una version funcional de un proyecto?

---

## 17. Errores frecuentes y como solucionarlos

### Error: `npm` no se reconoce

Puede significar que Node.js no esta instalado o no se agrego al PATH. Instala Node.js y reinicia VS Code.

### Error: no carga el catalogo

Probablemente JSON Server no esta activo. Ejecuta:

```bash
npm run db
```

O ejecuta todo junto:

```bash
npm run start
```

### Error: `EADDRINUSE`

Significa que el puerto ya esta ocupado. Cierra otras terminales o cambia el puerto en `package.json`.

### El formulario no guarda

Revisa:

1. Que JSON Server este activo.
2. Que no haya errores en consola.
3. Que `API_URL` en `src/js/config.js` sea `http://localhost:3001`.
4. Que los datos pasen las validaciones.

### El grafico no aparece

Revisa que existan visitantes en `db.json` y que Chart.js se haya instalado correctamente con `npm install`.

---

## 18. Actividad de busqueda antes de corregir

Antes de modificar el codigo, busca y lee informacion breve sobre estos temas:

1. Que es JSON Server.
2. Que es una API REST.
3. Que significa `GET` y `POST`.
4. Que es validacion de formularios.
5. Que es usabilidad web.
6. Que es accesibilidad web.
7. Que es diseno responsive.

Puedes apoyarte en documentacion, tutoriales o videos cortos, pero escribe las respuestas con tus propias palabras en:

```text
docs/investigacion-previa.md
```

---

## 19. Reto opcional para mayor nivel

Si terminas lo basico, puedes agregar una de estas mejoras:

### Opcion A: Buscador de visitantes

Agrega un campo para buscar visitantes por nombre o interes.

### Opcion B: Boton para eliminar registros

Permite eliminar un visitante desde la tabla. Debes usar una peticion `DELETE` hacia JSON Server.

### Opcion C: Actualizar checklist desde la interfaz

Permite marcar requisitos como cumplidos usando una peticion `PATCH`.

### Opcion D: Modo oscuro

Agrega un boton para cambiar entre modo claro y modo oscuro.

Si haces un reto opcional, documentalo claramente en el informe.

---

## 20. Criterios de evaluacion

| Criterio | Peso sugerido |
|---|---:|
| Funcionalidad demostrable con JSON Server | 30% |
| Validaciones operativas y claras | 20% |
| Integracion correcta de librerias y archivos | 15% |
| Calidad visual, usabilidad y accesibilidad | 15% |
| Evidencias y checklist de requisitos | 10% |
| Organizacion del codigo e informe | 10% |

---

## 21. Checklist rapido antes de entregar

Antes de subir tu ZIP a Moodle, verifica:

- [ ] Ejecute `npm install` sin errores.
- [ ] Ejecute `npm run start` y abrio el sitio.
- [ ] JSON Server respondio en `http://localhost:3001`.
- [ ] El catalogo cargo desde `db.json`.
- [ ] El formulario valido los campos correctamente.
- [ ] El registro se guardo en `db.json`.
- [ ] La tabla de visitantes se actualizo.
- [ ] El grafico mostro los intereses.
- [ ] La consola no mostro errores.
- [ ] Ejecute `npm run check`.
- [ ] Complete `docs/checklist-requisitos.md`.
- [ ] Complete `docs/informe-entrega.md`.
- [ ] Agregue capturas en `evidencias/`.
- [ ] Comprimi la carpeta final en ZIP.

---

## 22. Mensaje final

No te limites a hacer que el proyecto funcione una sola vez. Pruebalo como si otra persona fuera a usarlo. Un buen desarrollador no solo escribe codigo: tambien revisa, corrige, mejora, documenta y demuestra que su solucion funciona.
