import Vue from 'vue'

if (Vue._installedPlugins.some((plugin) => plugin.name === 'VueI18n')) {
  Vue.mixin({
    data() {
      return {
        fetchFromFallbackLanguage: false,
      }
    },
    watch: {
      '$i18n.locale'() {
        if (this.$fetch) this.$fetch()
      },
      fetchFromFallbackLanguage(value) {
        if (value === true) {
          console.log('Fetching fallback content...')
          this.$fetch()
          this.$store.dispatch('notifications/show', {
            error: false,
            id: 'fetchFallbackContent',
            message:
              'Diese Seite ist leider nicht vollständig in deiner Sprache verfügbar!',
          })
        }
      },
    },
    computed: {
      localeIso() {
        if (!this.fetchFromFallbackLanguage) {
          return this.$i18n.locales.find(
            (locale) => locale.code == this.$i18n.locale
          ).iso
        } else {
          return this.$i18n.locales.find(
            (locale) => locale.code == this.$i18n.defaultLocale
          ).iso
        }
      },
    },
    methods: {
      fetchFallbackContent() {
        // this.fetchFromFallbackLanguage = true
      },
    },
  })
}
