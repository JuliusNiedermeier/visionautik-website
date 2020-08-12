import Vue from 'vue'

const nuxtI18nFetchMixin = {
  watch: {
    '$i18n.locale'() {
      if (this.$fetch) {
        this.$fetch()
      }
    },
  },
  computed: {
    localeIso() {
      return this.$i18n.locales.find(
        (locale) => locale.code == this.$i18n.locale
      ).iso
    },
  },
}

const nuxtI18nFetch = {
  install(Vue) {
    if (!Vue._installedPlugins.some((plugin) => plugin.name === 'VueI18n')) {
      return console.warn(
        'In order to use NuxtI18nFetch the NuxtI18n plugin must be installed!'
      )
    }
    Vue.mixin(nuxtI18nFetchMixin)
  },
}

Vue.use(nuxtI18nFetch)
