# Guia rapida: JSON Server

## Que es JSON Server

JSON Server es una herramienta que permite crear una API local a partir de un archivo JSON. En este proyecto, el archivo `db.json` funciona como una base de datos sencilla.

## Como se ejecuta

```bash
npm run db
```

O junto con el sitio:

```bash
npm run start
```

## Rutas disponibles

| Ruta | Uso |
|---|---|
| `http://localhost:3001/productos` | Lista productos y actividades. |
| `http://localhost:3001/visitantes` | Lista y guarda visitantes. |
| `http://localhost:3001/requisitos` | Lista requisitos de entrega. |
| `http://localhost:3001/bugs` | Lista bugs sugeridos del proyecto. |

## Metodos importantes

| Metodo | Para que sirve |
|---|---|
| GET | Consultar datos. |
| POST | Crear un nuevo registro. |
| PATCH | Actualizar parte de un registro. |
| DELETE | Eliminar un registro. |

## Ejemplo de registro con POST

```js
fetch('http://localhost:3001/visitantes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nombre: 'Ejemplo',
    correo: 'ejemplo@correo.com',
    telefono: '3001234567',
    interes: 'alimentos',
    comentario: 'Registro de prueba',
    aceptaContacto: true,
    fechaRegistro: new Date().toISOString()
  })
});
```

## Reiniciar la base de datos

Si dañas `db.json`, puedes restaurarlo con:

```bash
npm run reset-db
```
