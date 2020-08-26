# Pre deployment steps

## functions.predeploy

- npm run build
- clean functions/nuxt
- copy .nuxt to functions/nuxt
- copy nuxt.config.js to functions
- convert nuxt.config.js from ES6 to ES5 standard
- merge nuxt dependencies with functions dependencies
- npm install in functions directory

## hosting.predeploy

- clean public directory
- copy .nuxt/dist/client to public/_nuxt
- copy static directory to public directory
