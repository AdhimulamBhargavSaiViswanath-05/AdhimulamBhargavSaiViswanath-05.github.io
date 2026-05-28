import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const assetsDir = path.join(distDir, 'assets');
const assetFiles = fs.readdirSync(assetsDir);

const jsFile = assetFiles.find((file) => /^(index|main)-.*\.js$/.test(file));
const cssFile = assetFiles.find((file) => /^(index|main)-.*\.css$/.test(file));
const faviconFile = assetFiles.find((file) => /^favicon-.*\.svg$/.test(file));

if (!jsFile || !cssFile || !faviconFile) {
  throw new Error('Unable to locate built assets in dist/assets.');
}

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="ABSV portfolio - AI/ML student portfolio rebuilt with modern UI, Radix UI, and static GitHub Pages deployment." />
    <title>Adhimulam Bhargav Sai Viswanath | Portfolio</title>
    <link rel="icon" href="./assets/${faviconFile}" type="image/svg+xml" />
    <script type="module" crossorigin src="./assets/${jsFile}"></script>
    <link rel="stylesheet" crossorigin href="./assets/${cssFile}">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

fs.writeFileSync(path.join(distDir, 'index.html'), html);

// Create stable fallback asset names to avoid GitHub Pages mismatches
try {
  const fallbackIndex = path.join(assetsDir, 'index.js');
  const fallbackMain = path.join(assetsDir, 'main.js');
  const fallbackCss = path.join(assetsDir, 'main.css');

  // copy the chosen jsFile to index.js (entry alias)
  fs.copyFileSync(path.join(assetsDir, jsFile), fallbackIndex);

  // If there's a main-*.js different from the entry (jsFile), try to create main.js
  const mainChunk = assetFiles.find((f) => /^main-.*\.js$/.test(f) && f !== jsFile);
  if (mainChunk) {
    fs.copyFileSync(path.join(assetsDir, mainChunk), fallbackMain);
  } else if (/^main-.*\.js$/.test(jsFile)) {
    // entry itself is a main-*.js, alias it
    fs.copyFileSync(path.join(assetsDir, jsFile), fallbackMain);
  }

  // copy css to main.css for a stable stylesheet name
  fs.copyFileSync(path.join(assetsDir, cssFile), fallbackCss);
} catch (e) {
  // Do not fail the build for aliasing; log for diagnostics
  // eslint-disable-next-line no-console
  console.warn('Postbuild fallback aliasing failed:', e && e.message);
}
