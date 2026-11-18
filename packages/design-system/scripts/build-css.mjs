// Writes dist/tokens.css from the compiled tokens. Runs after `tsc` (see the package's build script).
import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { toCss } from '../dist/index.js';

mkdirSync(new URL('../dist/', import.meta.url), { recursive: true });
writeFileSync(new URL('../dist/tokens.css', import.meta.url), toCss());
console.log('wrote dist/tokens.css');
copyFileSync(new URL('../styles/base.css', import.meta.url), new URL('../dist/base.css', import.meta.url));
console.log('wrote dist/base.css');
