// The World Dispatch (25 November 2026): writes the rendered front-page image to /output/entry.png.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const MAX_IMAGE_BYTES = 1048576;

function publishPoster(): void {
  const imageBytes = readFileSync(join(repoRoot, 'entry.png'));
  if (imageBytes.byteLength === 0 || imageBytes.byteLength > MAX_IMAGE_BYTES) {
    throw new Error(`entry.png size out of range: ${imageBytes.byteLength} bytes`);
  }
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, 'entry.png'), imageBytes);
}

publishPoster();
