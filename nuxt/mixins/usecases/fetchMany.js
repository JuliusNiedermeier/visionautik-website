import queryCms from '@/mixins/util/queryCms.js'

export default {
  mixins: [queryCms],
  methods: {
    fetchMany(type, fields, pageSize = 100) {
      const fetch = fields?.map((field) => `${type}.${field}`)
      return this.queryCms(
        [this.$prismic.predicates.at('document.type', type)],
        { fetch, pageSize }
      )
    },
  },
}
