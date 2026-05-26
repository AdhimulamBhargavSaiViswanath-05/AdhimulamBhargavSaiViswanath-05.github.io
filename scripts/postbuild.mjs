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
