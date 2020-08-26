import Vue from 'vue'

Vue.mixin({
  watch: {
    '$i18n.locale'() {
      if (this.$fetch) this.$fetch()
    },
  },
  computed: {
    localeIso() {
      return this.$i18n.locales.find(
        (locale) => locale.code == this.$i18n.locale
      ).iso
    },
  },
})
