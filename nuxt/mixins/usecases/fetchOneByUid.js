import queryCms from '@/mixins/util/queryCms.js'

export default {
  mixins: [queryCms],
  methods: {
    fetchOneByUid(type, uid) {
      return this.queryCms(
        [this.$prismic.predicates.at(`my.${type}.uid`, uid)],
        { pageSize: 1 },
        true
      )
    },
  },
}
