/**
 * Favicon Generator Script
 * 
 * Generates all required favicon sizes from the source 512x512 image.
 * Creates PNG files for various sizes and an ICO file for legacy browser support.
 * 
 * Usage: node scripts/generate-favicons.mjs
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_IMAGE = path.join(__dirname, '../public/images/cropped-Favicon-512x512-copy.png');
const OUTPUT_DIR = path.join(__dirname, '../public');

/**
 * Favicon sizes to generate with their output filenames
 */
const FAVICON_SIZES = [
  { size: 16, filename: 'favicon-16x16.png' },
  { size: 32, filename: 'favicon-32x32.png' },
  { size: 180, filename: 'apple-touch-icon.png' },
  { size: 192, filename: 'android-chrome-192x192.png' },
  { size: 512, filename: 'android-chrome-512x512.png' },
];

/**
 * Generates a PNG favicon at the specified size
 */
async function generatePNG(sourceBuffer, size, filename) {
  const outputPath = path.join(OUTPUT_DIR, filename);
  
  await sharp(sourceBuffer)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .png()
    .toFile(outputPath);
  
  console.log(`Generated: ${filename} (${size}x${size})`);
}

/**
 * Generates a favicon.ico file (32x32)
 * Note: Sharp doesn't directly support ICO, so we create a 32x32 PNG
 * and save it as .ico which modern browsers can handle
 */
async function generateICO(sourceBuffer) {
  const outputPath = path.join(OUTPUT_DIR, 'favicon.ico');
  
  // Generate 32x32 PNG buffer
  const pngBuffer = await sharp(sourceBuffer)
    .resize(32, 32, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .png()
    .toBuffer();
  
  // Write as .ico (modern browsers accept PNG in .ico)
  fs.writeFileSync(outputPath, pngBuffer);
  console.log('Generated: favicon.ico (32x32)');
}

async function main() {
  console.log('Generating favicons from:', SOURCE_IMAGE);
  console.log('Output directory:', OUTPUT_DIR);
  console.log('---');
  
  // Read source image
  if (!fs.existsSync(SOURCE_IMAGE)) {
    console.error('Source image not found:', SOURCE_IMAGE);
    process.exit(1);
  }
  
  const sourceBuffer = fs.readFileSync(SOURCE_IMAGE);
  
  // Generate all PNG sizes
  for (const { size, filename } of FAVICON_SIZES) {
    await generatePNG(sourceBuffer, size, filename);
  }
  
  // Generate ICO file
  await generateICO(sourceBuffer);
  
  console.log('---');
  console.log('All favicons generated successfully!');
}

main().catch(console.error);
