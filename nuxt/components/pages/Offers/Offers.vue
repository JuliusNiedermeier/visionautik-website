<template>
  <div class="va-pa--Offers">
    <va-at--PageSection class="va-pa--Offers__filters">
      <va-ps--CategoryFilter />
      <va-ps--SearchFilter />
      <va-ps--TargetGroupFilter />
    </va-at--PageSection>
    <va-at--PageSection
      class="va-pa--Offers__results"
      standout
      :padding="cms.results.length ? 'bottom' : 'both'"
    >
      <va-ps--ResultList
        class="va-pa--Offers__results__list"
        v-if="cms.results.length"
        :results="cms.results"
      />
      <va-ps--ResultsPlaceholder v-if="!cms.results.length" />
    </va-at--PageSection>
  </div>
</template>

<script>
import PageSection from '@/components/atoms/PageSection.vue'
import CategoryFilter from './sections/CategoryFilter.vue'
import SearchFilter from './sections/SearchFilter.vue'
import TargetGroupFilter from './sections/TargetGroupFilter.vue'
import ResultList from './sections/ResultList.vue'
import ResultsPlaceholder from './sections/ResultsPlaceholder.vue'
import getOfferCategories from '@/assets/js/util/getOfferCategories.js'
import targetGroups from '@/assets/js/targetGroups.js'
import queryCms from '@/mixins/util/queryCms'
import { repeatables } from '@/assets/js/types.js'
import formatCmsResultForProp from '@/assets/js/util/formatCmsResultForProp.js'

export default {
  name: 'va-pa--Offers',
  mixins: [queryCms],
  components: {
    'va-at--PageSection': PageSection,
    'va-ps--CategoryFilter': CategoryFilter,
    'va-ps--SearchFilter': SearchFilter,
    'va-ps--TargetGroupFilter': TargetGroupFilter,
    'va-ps--ResultList': ResultList,
    'va-ps--ResultsPlaceholder': ResultsPlaceholder,
  },

  data() {
    return { cms: { results: [] } }
  },

  async fetch() {
    if (!this.getRequiredTypes().length) {
      this.cms.results = []
      return
    }

    const response = await this.queryCms(this.getPredicates())

    if (!response) {
      this.cms.results = []
      return
    }

    this.cms.results = response.results.map((result) =>
      formatCmsResultForProp(result)
    )
  },

  watch: {
    '$route.query'() {
      this.$fetch()
    },
  },

  methods: {
    getRequiredTypes() {
      let categories = getOfferCategories()
      if (this.$route.query.exclude) {
        categories = categories.filter(
          (category) => !this.$route.query.exclude.includes(category.label)
        )
      }
      const types = []
      for (const category of categories) {
        if (!types.includes(category.parentType)) {
          types.push(category.parentType)
        }
      }
      return types
    },

    getTypePredicates() {
      if (this.getRequiredTypes().length === 0) return []
      return [
        this.$prismic.predicates.any('document.type', this.getRequiredTypes()),
      ]
    },

    getCategoryPredicates() {
      if (!this.$route.query.exclude) return []
      return getOfferCategories()
        .filter((category) =>
          this.$route.query.exclude.includes(category.label)
        )
        .map((category) => {
          return this.$prismic.predicates.not(
            `my.${category.parentType}.general__category`,
            category.label
          )
        })
    },

    getFulltextPredicates() {
      if (!this.$route.query.search) return []
      return [
        this.$prismic.predicates.fulltext('document', this.$route.query.search),
      ]
    },

    getTargetGroupPredicates() {
      if (!this.$route.query.targetGroup) return []
      const excludedTargetGroups = targetGroups
        .map((targetGroup) => targetGroup.id)
        .filter((targetGroup) => targetGroup !== this.$route.query.targetGroup)

      const predicates = []

      for (const type of this.getRequiredTypes()) {
        for (const excludedTargetGroup of excludedTargetGroups) {
          predicates.push(
            this.$prismic.predicates.not(
              `my.${type}.general__for_${excludedTargetGroup}`,
              true
            )
          )
        }
      }

      return predicates
    },

    getPredicates() {
      return [
        ...this.getTypePredicates(),
        ...this.getCategoryPredicates(),
        ...this.getFulltextPredicates(),
        // ...this.targetGroupPredicates,
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
.va-pa--Offers {
  &__filters {
    padding: $spacing--macro--xs 0;
  }

  &__results__list {
    padding-top: $spacing--macro--xs;
  }
}
</style>