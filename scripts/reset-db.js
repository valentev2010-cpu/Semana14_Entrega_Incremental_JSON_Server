import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const original = path.join(root, 'db.original.json');
const target = path.join(root, 'db.json');

if (!fs.existsSync(original)) {
  console.error('No se encontro db.original.json');
  process.exit(1);
}

fs.copyFileSync(original, target);
console.log('Base de datos reiniciada correctamente desde db.original.json');
