export default (context) => {
  const $i18n = context.app.i18n
  const $prismic = context.app.$prismic
  const $store = context.store

  const convertLocaleCodeToLocaleIso = (localeCode) => {
    return $i18n.locales.find((locale) => locale.code == localeCode).iso
  }

  const getCurrentLocaleIso = () => {
    return convertLocaleCodeToLocaleIso($i18n.locale)
  }
  const getFallbackLocaleIso = () => {
    return convertLocaleCodeToLocaleIso($i18n.defaultLocale)
  }

  return class Query {
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
      const apiResponse = await $prismic.api.query(this.predicates, {
        ...this.options,
        lang: options.fallback ? getFallbackLocaleIso() : this.options.lang,
      })

      const valid = this.validate(apiResponse, this.options.fetch)

      if (!valid && options.fallback) {
        if (options.critical) {
          context.error({
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
        $store.commit('notifications/add', {
          message:
            $i18n.messages[$i18n.locale].notifications.messages
              .languageNotAvailable,
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
  }
}
