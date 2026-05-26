# ABSV Portfolio

Static React + Vite portfolio rebuilt with Radix UI and ready for GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## GitHub Pages deployment process

1. Push the `main` branch to GitHub.
2. Open repository settings and enable GitHub Pages from the `GitHub Actions` source.
3. Keep the workflow file at `.github/workflows/deploy.yml`.
4. Every push to `main` will build the site and deploy the `dist` folder automatically.

## Performance notes

- The app is built as a static site, so there is no server runtime.
- `vite.config.js` uses a relative base path, which keeps the site portable on GitHub Pages.
- The heaviest assets are already bundled locally and the build pipeline ships only the optimized output in `dist`.