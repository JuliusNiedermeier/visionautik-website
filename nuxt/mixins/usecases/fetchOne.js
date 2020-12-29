import queryCms from '@/mixins/util/queryCms.js'

export default {
  mixins: [queryCms],
  methods: {
    fetchOne(type) {
      return this.queryCms(
        [this.$prismic.predicates.at('document.type', type)],
        { pageSize: 1 },
        true
      )
    },
  },
}
