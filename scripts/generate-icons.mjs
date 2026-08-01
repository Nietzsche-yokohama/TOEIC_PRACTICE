// npm run gen-icons で実行 (要: npm install が完了していること)
import sharp from 'sharp';
import { readFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const src = readFileSync(join(root, 'public/icons/icon.svg'));
const out = join(root, 'public/icons');

mkdirSync(out, { recursive: true });

await sharp(src).resize(192, 192).png().toFile(join(out, 'icon-192.png'));
await sharp(src).resize(512, 512).png().toFile(join(out, 'icon-512.png'));
await sharp(src).resize(512, 512).png().toFile(join(out, 'icon-512-maskable.png'));
await sharp(src).resize(180, 180).png().toFile(join(out, 'apple-touch-icon.png'));

console.log('✓ Icons generated in public/icons/');
