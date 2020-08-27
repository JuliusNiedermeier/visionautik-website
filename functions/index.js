const functions = require('firebase-functions')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const { Nuxt } = require('nuxt-start')

const nuxtConfig = require('./nuxt.config')

const config = {
  ...nuxtConfig,
  dev: false,
  debug: false,
  buildDir: '.nuxt',
}
const nuxt = new Nuxt(config)

exports.nuxtApp = functions
  .region('us-central1') // Default - Also the only region for hosting rewrites to functions
  .https.onRequest(async (req, res) => {
    // res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
    await nuxt.ready()
    nuxt.render(req, res)
  })
