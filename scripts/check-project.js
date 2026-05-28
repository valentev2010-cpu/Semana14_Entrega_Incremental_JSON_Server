import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const requiredFiles = [
  'index.html',
  'src/js/app.js',
  'src/js/api.js',
  'src/js/validaciones.js',
  'src/js/ui.js',
  'src/js/charts.js',
  'src/css/styles.css',
  'db.json',
  'README.md',
  'docs/checklist-requisitos.md',
  'docs/informe-entrega.md'
];

const results = [];

for (const file of requiredFiles) {
  const exists = fs.existsSync(path.join(root, file));
  results.push({ item: file, ok: exists, detail: exists ? 'Existe' : 'No existe' });
}

const dbPath = path.join(root, 'db.json');
if (fs.existsSync(dbPath)) {
  try {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    results.push({ item: 'db.json/productos', ok: Array.isArray(db.productos), detail: 'Debe ser un arreglo' });
    results.push({ item: 'db.json/visitantes', ok: Array.isArray(db.visitantes), detail: 'Debe ser un arreglo' });
    results.push({ item: 'db.json/requisitos', ok: Array.isArray(db.requisitos), detail: 'Debe ser un arreglo' });
  } catch (error) {
    results.push({ item: 'db.json valido', ok: false, detail: error.message });
  }
}

const validationFile = path.join(root, 'src/js/validaciones.js');
if (fs.existsSync(validationFile)) {
  const content = fs.readFileSync(validationFile, 'utf8');
  const hasPhoneFix = /length\s*!==\s*10|length\s*===\s*10/.test(content);
  const asksConsent = /aceptaContacto[\s\S]*return\s+['"].+oblig|autoriz/i.test(content);
  results.push({ item: 'validacion telefono exactamente 10 digitos', ok: hasPhoneFix, detail: 'Busca una regla con length === 10 o length !== 10' });
  results.push({ item: 'validacion autorizacion de contacto', ok: asksConsent, detail: 'Debe exigir el checkbox de autorizacion' });
}

console.log('\nRevision automatica del proyecto Semana 14\n');
for (const result of results) {
  console.log(`${result.ok ? 'OK ' : 'FALTA'} - ${result.item}: ${result.detail}`);
}

const failed = results.filter((item) => !item.ok);
console.log(`\nResultado: ${results.length - failed.length}/${results.length} verificaciones superadas.`);

if (failed.length) {
  console.log('\nAun hay aspectos por revisar. Usa esta salida como evidencia de pruebas y corrige lo pendiente.');
  process.exitCode = 1;
} else {
  console.log('\nExcelente. Las verificaciones basicas fueron superadas.');
}
