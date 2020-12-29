import Vue from 'vue'

// This will be deprecated in the future!
// A better way to implement this behaviour would be to only import this mixin where the fetch hook is used.

export default () => {
  Vue.mixin({
    watch: {
      '$i18n.locale'() {
        if (this.$fetch) this.$fetch()
      },
    },
  })
}
