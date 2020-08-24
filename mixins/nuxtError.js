exports.missingContent = {
  methods: {
    missingContent() {
      this.$nuxt.error({ statusCode: 404, message: 'Missing content' })
    },
  },
}

exports.pageNotFound = {
  methods: {
    pageNoFund() {
      this.$nuxt.error({ statusCode: 404, message: 'Page not found!' })
    },
  },
}
