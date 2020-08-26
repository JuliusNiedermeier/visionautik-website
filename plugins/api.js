import Vue from 'vue'

// Plugin getters
const $prismic = () => Vue.prototype.$nuxt.$prismic
const $i18n = () => Vue.prototype.$nuxt.$i18n
const $store = () => Vue.prototype.$nuxt.$store

// i18n related utils
const convertLocaleCodeToLocaleIso = (localeCode) => {
  return $i18n().locales.find((locale) => locale.code == localeCode).iso
}

const getCurrentLocaleIso = () => {
  return convertLocaleCodeToLocaleIso($i18n().locale)
}
const getFallbackLocaleIso = () => {
  return convertLocaleCodeToLocaleIso($i18n().defaultLocale)
}

Vue.use({
  install(Vue) {
    Vue.prototype.$api = {
      Query: class {
        constructor(predicates, options) {
          if (!predicates) {
            throw new Error('Missing argument in Query contrutor: predicates')
          }
          this.predicates = predicates
          this.options = {
            lang: getCurrentLocaleIso(),
            fetch: [],
            ...options,
          }
        }

        async get(options = {}) {
          const apiResponse = await $prismic().api.query(this.predicates, {
            ...this.options,
            lang: options.fallback ? getFallbackLocaleIso() : this.options.lang,
          })

          const valid = this.validate(apiResponse, this.options.fetch)

          if (!valid && options.fallback) {
            if (options.critical) {
              Vue.prototype.$nuxt.error({
                statusCode: 404,
                message: 'Missing content',
              })
            }
            return null
          }

          if (!valid) {
            return this.get({ ...options, fallback: true })
          }

          if (options.fallback) {
            $store().dispatch('notifications/show', {
              message:
                'Diese Seite ist leider nicht vollständig in deiner Sprache verfügbar!',
              id: 'fallback-content-fetched',
            })
          }

          return apiResponse
        }

        validate(apiResponse, requiredFields = this.options.fetch) {
          if (apiResponse.results_size < 1) return false

          for (let result of apiResponse.results) {
            for (let requiredField of requiredFields) {
              requiredField = requiredField.split('.')[1]
              if (!result.data[requiredField]) return false
            }
          }

          return true
        }
      },
    }
  },
})
