# Laboratory RL

A roguelike game built with TypeScript and the [rot.js](https://github.com/ondras/rot.js) library. **The game is currently in the planning and design phase**. It's not playable in it's current state, but if you're interested anyway follow this link [https://mizar999.github.io/laboratory-rl/](https://mizar999.github.io/laboratory-rl/)

## Resources

- [rot.js - Roguelike Toolkit](https://github.com/ondras/rot.js)

## Project setup

- Init npm and install necessary packages

    ```powershell
    git clone https://github.com/Mizar999/laboratory-rl.git
    npm install
    ```

- Create **Webpack** configuration `webpack.config.js`:

    ```javascript
    const path = require('path');

    module.exports = {
    entry: './src/app.ts',
    module: {
        rules:[{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development'
    };
    ```

- Webpack will get the sources from `src/app.ts` and collect everything in `dist/app.js` file
- Create **TypeScript** configuration `tsconfig.json`:

    ```json
    {
        "compilerOptions": {
            "target": "es5"
        },
        "include": [
            "src/*"
        ]
    }
    ```

- Update the **scripts**-section of the `package.json` file:

    ```json
    "scripts": {
        "build": "webpack",
        "watch": "webpack --watch",
        "serve": "http-server --port=8085 -c-1"
    }
    ```

- To build the application run:

    ```powershell
    npm run-script build
    ```

- To run multiple npm scripts cross platform in parallel run the following command:

    ```powershell
    # if globally installed
    concurrently npm:watch npm:serve

    # if locally installed
    npx concurrently npm:watch npm:serve
    ```
