import path from 'path'

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'Visionautik Akademie',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: 'blue' },

  router: {
    extendRoutes(routes, resolve) {
      // Configure type param before offer single page
      // routes = routes.map((route) => {
      //   console.log(route)
      //   if (route.name === 'offers-offer') {
      //     route.name = 'offers-type-offer'
      //     route.path = '/offers/:type/:offer'
      //   }
      //   return route
      // })
    },

    scrollBehavior(to) {
      if (to.hash) {
        return window.scrollTo({
          top:
            document.querySelector(to.hash).offsetTop - window.innerHeight / 4,
          behavior: 'smooth',
        })
      }
      return window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/scss/main.scss',
    '@/assets/scss/classes.scss',
    '@/assets/scss/fonts.scss',
    '@/assets/scss/snipcart.scss',
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '@/plugins/nuxt-i18n-fetch',
    '@/plugins/api',
    '@/plugins/intlFormatter',
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/snipcart'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // modules for full static before `nuxt export` (coming in v2.12)
    // '@/modules/static',
    // '@/modules/crawler',
    // Prismic
    '@nuxtjs/prismic',
    // Global styles
    '@nuxtjs/style-resources',
    // i18n
    'nuxt-i18n',
  ],

  // Prismic - configuration
  prismic: {
    endpoint: 'https://visionautikde.cdn.prismic.io/api/v2',
    linkResolver: '@/plugins/link-resolver',
    htmlSerializer: '@/plugins/html-serializer',
  },

  // Global styles - configuration
  styleResources: {
    scss: ['@/assets/scss/variables.scss', '@/assets/scss/mixins.scss'],
  },

  // i18n - configuration
  i18n: {
    locales: [
      {
        code: 'de',
        iso: 'de-DE',
        name: 'Deutsch',
        file: 'de-DE.js',
      },
      {
        code: 'en',
        iso: 'en-GB',
        name: 'English',
        file: 'en-GB.js',
      },
    ],
    langDir: './lang/',
    lazy: true,
    defaultLocale: 'de',
    // vueI18nLoader: true,
    parsePages: false,
    seo: false,
    strategy: 'no_prefix',
    vueI18n: {
      fallbackLocale: 'de',
    },
  },

  snipcart: {
    // Options available
    key:
      'ZjIyODZjN2ItZTc2Yi00YTYwLWFkZTgtNmI1MzgwNGI0M2E5NjM3MzQ5ODk2MDgwNzk1MTA4',
    addProductBehavior: true,
    locales: {} /* not required */,
    snipcartCustomize: path.join(__dirname, './snipcart/customize'),
  },

  build: {
    // Watch changes in snipcart directory and rebuild the application
    watch: ['snipcart'],
  },

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */

  buildDir: '.nuxt',
  // build: {
  //   publicPath: '/assets/',
  //   extractCss: true,
  // },
  globalName: 'nuxt',
}
