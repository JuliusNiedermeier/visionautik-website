import queryCms from '@/mixins/util/queryCms.js'
import { repeatables } from '@/assets/js/types.js'

export default {
  mixins: [queryCms],
  methods: {
    async fetchLatestCourses() {
      const typeName = repeatables.activity.typeName
      const predicate = this.$prismic.predicates.at(
        `my.${typeName}.general__category`,
        'course'
      )
      const options = {
        pageSize: 6,
        fetch: [
          typeName + '.general__heading',
          typeName + '.general__featured_image',
          typeName + '.general__excerpt',
          typeName + '.pricing__slices',
        ],
      }
      return this.queryCms([predicate], options, false)
    },
  },
}
