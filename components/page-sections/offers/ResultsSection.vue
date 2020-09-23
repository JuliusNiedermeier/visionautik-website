<template>
  <div class="results-section">
    <div class="results-section__body">
      <div class="results-section__body__results">
        <div class="results-section__body__results__courses">
          <h4>{{$t('types.collections.offers.resultSections.courses')}}</h4>
          <va-carousel gap>
            <va-offer
              v-for="(result, index) in results.courses"
              :key="index"
              :uid="result.uid"
              :image="result.data.general__featured_image.thumbnail.url"
              :title="result.data.general__heading"
              :description="result.data.general__excerpt"
              :type="result.type"
            />
          </va-carousel>
        </div>
        <div class="results-section__body__results__courses">
          <h4>{{$t('types.collections.offers.resultSections.events')}}</h4>
          <va-carousel gap>
            <va-offer
              v-for="(result, index) in results.events"
              :key="index"
              :uid="result.uid"
              :image="result.data.general__featured_image.thumbnail.url"
              :title="result.data.general__heading"
              :description="result.data.general__excerpt"
              :type="result.type"
            />
          </va-carousel>
        </div>
        <div class="results-section__body__results__courses">
          <h4>{{$t('types.collections.offers.resultSections.products')}}</h4>
          <va-carousel gap>
            <va-offer
              v-for="(result, index) in results.products"
              :key="index"
              :uid="result.uid"
              :image="result.data.general__featured_image.thumbnail.url"
              :title="result.data.general__heading"
              :description="result.data.general__excerpt"
              :type="result.type"
              :tag="$t(`types.collections.offers.tags.${result.data.general__type}`)"
            />
          </va-carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Offer from '@/components/elements/Offer'
import Carousel from '@/components/elements/Carousel'
import { getOfferCategories } from './offerCategories'
export default {
  name: 'va-results-section',
  components: { 'va-offer': Offer, 'va-carousel': Carousel },
  data() {
    return {
      results: {
        courses: [],
        events: [],
        products: [],
      },
    }
  },

  computed: {
    query() {
      return this.$route.query
    },
  },

  watch: {
    '$route.query'() {
      this.$fetch()
    },

    '$fetchState.pending'(pending) {
      console.log(pending)
      if (pending) this.$nuxt.$loading.start()
      if (!pending) this.$nuxt.$loading.finish()
    },
  },

  methods: {
    getRequiredTypes() {
      const types = []
      for (const offerCategory in getOfferCategories()) {
        if (types.includes(getOfferCategories()[offerCategory])) {
          continue
        }
        if (this.query.exclude && this.query.exclude.includes(offerCategory)) {
          continue
        }
        types.push(getOfferCategories()[offerCategory])
      }
      return types
    },

    getPredicates() {
      const predicates = []

      if (this.getRequiredTypes().length > 0) {
        predicates.push(
          this.$prismic.predicates.any('document.type', this.getRequiredTypes())
        )
      }

      if (this.query.exclude) {
        for (const excludedType of this.query.exclude) {
          predicates.push(
            this.$prismic.predicates.not(
              `my.${this.$api.types.repeatables.product}.general__type`,
              excludedType
            )
          )
        }
      }

      if (this.query.search) {
        predicates.push(
          this.$prismic.predicates.fulltext('document', this.query.search)
        )
      }

      if (this.query.targetGroup && !(this.query.targetGroup === 'all')) {
        predicates.push(
          this.$prismic.predicates.any('document.tags', [
            this.query.targetGroup,
          ])
        )
      }

      return predicates
    },
  },

  async fetch() {
    if (!this.getPredicates().length > 0) return

    const query = new this.$api.Query(this.getPredicates())

    const apiResponse = await query.get()

    if (!apiResponse) {
      this.results.courses = []
      this.results.events = []
      this.results.products = []
      return
    }

    this.results.courses = apiResponse.results.filter(
      (result) => result.type === this.$api.types.repeatables.course
    )
    this.results.events = apiResponse.results.filter(
      (result) => result.type === this.$api.types.repeatables.event
    )
    this.results.products = apiResponse.results.filter(
      (result) => result.type === this.$api.types.repeatables.product
    )
  },
}
</script>

<style lang="scss" scoped>
.results-section {
  @include fill-screen-width;
  background-color: $color--grey--light;
  padding-top: 5rem;
  padding-bottom: 5rem;
  overflow: hidden;

  &__body {
    @include page-margin;

    li + li {
      margin-left: 2rem;
    }
  }
}
</style>