const convertLocaleCodeToLocaleIso = function (localeCode) {
  return this.$i18n.locales.find((locale) => locale.code == localeCode).iso
}

const getLocaleIso = function () {
  return convertLocaleCodeToLocaleIso.apply(this, [this.$i18n.locale])
}
const getFallbackLocaleIso = function () {
  return convertLocaleCodeToLocaleIso.apply(this, [this.$i18n.defaultLocale])
}

const makeRequest = function (predicates, options) {
  return this.$prismic.api.query(predicates, options)
}

const validateResponse = function (response) {
  if (response && response?.results_size > 0) {
    return true
  } else {
    return false
  }
}

export default {
  methods: {
    async queryCms(predicates, options = {}, redirectOnError) {
      if (!options.lang) options.lang = getLocaleIso.call(this)
      let response = await makeRequest.apply(this, [predicates, options])
      let valid = validateResponse(response)
      if (!valid && options.lang != getFallbackLocaleIso.call(this)) {
        const _options = { ...options, lang: getFallbackLocaleIso.call(this) }
        response = await makeRequest.apply(this, [predicates, _options])
        valid = validateResponse(response)
      }

      if (!valid) {
        if (redirectOnError) {
          this.$nuxt.error({ statusCode: 404, message: 'Missing content' })
        } else {
          this.$store.commit('notifications/add', {
            message: this.$i18n.messages[this.$i18n.locale].notifications
              .messages.missingContent,
            id: 'missing-content',
            destroyOnRouteChange: true,
            destroyOnLocaleChange: true,
          })
        }
        return null
      } else {
        if (
          response.results[0].lang.toUpperCase() != options.lang.toUpperCase()
        ) {
          this.$store.commit('notifications/add', {
            message: this.$i18n.messages[this.$i18n.locale].notifications
              .messages.languageNotAvailable,
            id: 'missing-translation',
            destroyOnRouteChange: true,
            destroyOnLocaleChange: true,
          })
        }
        return response
      }
    },
  },
}
