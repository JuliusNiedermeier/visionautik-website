import queryCms from '@/mixins/util/queryCms.js'

export default {
  mixins: [queryCms],
  methods: {
    fetchOne(type, fields = []) {
      return this.queryCms(
        [this.$prismic.predicates.at('document.type', type)],
        { pageSize: 1, fetch: fields },
        true
      )
    },
  },
}
