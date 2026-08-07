# Laboratory RL

A roguelike game built with **TypeScript**, **Vite**, and the [rot.js](https://github.com/ondras/rot.js) library.

**Playable Demo:** [https://mizar999.github.io/laboratory-rl/](https://mizar999.github.io/laboratory-rl/)

> **Note:** The game is currently in the planning and design phase.

---

## Resources

- [rot.js - Roguelike Toolkit](https://github.com/ondras/rot.js)

---

## Development

To clone and develop this project locally:

```powershell
git clone https://github.com/Mizar999/laboratory-rl.git
cd laboratory-rl
npm install
npm run dev
```

### Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite dev server with instant Hot Module Replacement (HMR). |
| `npm run build` | Runs TypeScript type-checking and builds the production bundle into `dist/`. |
| `npm run preview` | Previews the production build locally. |

---

## New Project Setup from Scratch

If you want to set up a new rot.js Roguelike project with TypeScript and Vite from scratch:

1. **Initialize NPM project & install dependencies:**

   ```powershell
   npm init -y
   npm install --save-dev typescript vite rot-js
   ```

2. **Create Vite configuration (`vite.config.ts`):**

   ```typescript
   import { defineConfig } from 'vite';

   export default defineConfig({
     base: './',
     build: {
       outDir: 'dist',
     },
   });
   ```

3. **Create TypeScript configuration (`tsconfig.json`):**

   ```json
   {
     "compilerOptions": {
       "target": "ES2020",
       "useDefineForClassFields": true,
       "module": "ESNext",
       "lib": ["ES2020", "DOM", "DOM.Iterable"],
       "skipLibCheck": true,
       "moduleResolution": "node",
       "allowSyntheticDefaultImports": true,
       "strict": false,
       "noEmit": true
     },
     "include": ["src"]
   }
   ```

4. **Create HTML Entry Point (`index.html`):**

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Laboratory RL</title>
       <link href="app.css" rel="stylesheet" type="text/css" />
     </head>
     <body>
       <div id="box">
         <div id="sidebar"></div>
         <div id="main">
           <div id="display"></div>
           <div id="messages"></div>
         </div>
       </div>
       <script type="module" src="/src/app.ts"></script>
     </body>
   </html>
   ```

5. **Configure `package.json` scripts:**

   ```json
   "scripts": {
     "dev": "vite",
     "build": "tsc && vite build",
     "preview": "vite preview"
   }
   ```

---

## Automatic Deployment (GitHub Pages)

This repository uses an automated GitHub Actions workflow defined in `.github/workflows/deploy.yml`.

Every push to the `main` or `master` branch automatically triggers a build and deploys the generated site directly to GitHub Pages.
