import { mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
const output = 'out';
mkdirSync(path.join(output, 'assets'), { recursive: true });
for (const name of ['index.html', 'styles.css', 'app.js']) {
  copyFileSync(path.join('dist', name), path.join(output, name));
}
for (const name of readdirSync('dist/assets')) {
  if (/\.(jpg|jpeg|png|webp|svg)$/i.test(name)) {
    copyFileSync(path.join('dist/assets', name), path.join(output, 'assets', name));
  }
}
console.log('Prepared static website files.');
