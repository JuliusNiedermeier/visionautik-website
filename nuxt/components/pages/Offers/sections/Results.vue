<template>
  <div class="va-ps--Results">
    <div class="va-ps--Results__body">
      <div class="va-ps--Results__body__results">
        <div
          class="va-ps--Results__body__results__courses"
          v-if="results.courses.length > 0"
        >
          <h5>
            {{ results.courses.length }}
            {{
              $t(
                `types.${
                  $cms.types.repeatables.offer.typeName
                }.categories.course.${
                  results.courses.length > 1 ? 'plural' : 'singular'
                }`
              )
            }}
          </h5>
          <va-mo--Carousel gap displayPlaceholder>
            <va-mo--Offer
              v-for="(result, index) in results.courses"
              :key="index"
              :uid="result.uid"
              :image="result.data.general__featured_image.thumbnail.url"
              :title="result.data.general__heading"
              :description="result.data.general__excerpt"
              :type="result.type"
            />
            <template slot="placeholder">
              <va-mo--ContentPlaceholder
                :heading="
                  $t(
                    `types.${$cms.types.collections.offers.typeName}.courseResultsPlaceholder.heading`
                  )
                "
                :body="
                  $t(
                    `types.${$cms.types.collections.offers.typeName}.courseResultsPlaceholder.body`
                  )
                "
                :buttonLabel="
                  $t(
                    `types.${$cms.types.collections.offers.typeName}.courseResultsPlaceholder.buttonLabel`
                  )
                "
                buttonIconName="addNotification"
              />
            </template>
          </va-mo--Carousel>
        </div>
        <div
          class="va-ps--Results__body__results__events"
          v-if="results.events.length > 0"
        >
          <h5>
            {{ results.events.length }}
            {{
              $t(
                `types.${
                  $cms.types.repeatables.offer.typeName
                }.categories.event.${
                  results.events.length > 1 ? 'plural' : 'singular'
                }`
              )
            }}
          </h5>
          <va-mo--Carousel gap displayPlaceholder>
            <va-mo--Offer
              v-for="(result, index) in results.events"
              :key="index"
              :uid="result.uid"
              :image="result.data.general__featured_image.thumbnail.url"
              :title="result.data.general__heading"
              :description="result.data.general__excerpt"
              :type="result.type"
            />
            <template slot="placeholder">
              <va-mo--ContentPlaceholder
                :heading="
                  $t(
                    `types.${$cms.types.collections.offers.typeName}.eventResultsPlaceholder.heading`
                  )
                "
                :body="
                  $t(
                    `types.${$cms.types.collections.offers.typeName}.eventResultsPlaceholder.body`
                  )
                "
                :buttonLabel="
                  $t(
                    `types.${$cms.types.collections.offers.typeName}.eventResultsPlaceholder.buttonLabel`
                  )
                "
                buttonIconName="addNotification"
              />
            </template>
          </va-mo--Carousel>
        </div>
        <div
          class="va-ps--Results__body__results__products"
          v-if="results.products.length > 0"
        >
          <h5>
            {{ results.products.length }}
            {{
              $t(
                `types.${$cms.types.repeatables.product.typeName}.${
                  results.courses.length > 1 ? 'plural' : 'singular'
                }`
              )
            }}
          </h5>
          <va-mo--Carousel gap displayPlaceholder>
            <va-mo--Offer
              v-for="(result, index) in results.products"
              :key="index"
              :uid="result.uid"
              :image="result.data.general__featured_image.thumbnail.url"
              :title="result.data.general__heading"
              :description="result.data.general__excerpt"
              :type="result.type"
              :tag="
                $t(
                  `types.${$cms.types.repeatables.product.typeName}.categories.${result.data.general__category}.singular`
                )
              "
            />
            <template slot="placeholder">
              <va-mo--ContentPlaceholder
                :heading="
                  $t(
                    `types.${$cms.types.collections.offers.typeName}.productResultsPlaceholder.heading`
                  )
                "
                :body="
                  $t(
                    `types.${$cms.types.collections.offers.typeName}.productResultsPlaceholder.body`
                  )
                "
                :buttonLabel="
                  $t(
                    `types.${$cms.types.collections.offers.typeName}.productResultsPlaceholder.buttonLabel`
                  )
                "
                buttonIconName="addNotification"
              />
            </template>
          </va-mo--Carousel>
        </div>
        <div class="va-ps--Results__body__results__placeholder">
          <va-mo--ContentPlaceholder
            v-if="resultsCount === 0"
            :heading="
              $t(
                `types.${$cms.types.collections.offers.typeName}.resultsPlaceholder.heading`
              )
            "
            :body="
              $t(
                `types.${$cms.types.collections.offers.typeName}.resultsPlaceholder.body`
              )
            "
            :buttonLabel="
              $t(
                `types.${$cms.types.collections.offers.typeName}.resultsPlaceholder.buttonLabel`
              )
            "
            buttonIconName="addNotification"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Offer from '@/components/molecules/Offer'
import Carousel from '@/components/molecules/Carousel'
import ContentPlaceholder from '@/components/molecules/ContentPlaceholder'
export default {
  name: 'va-ps--Results',
  components: {
    'va-mo--Offer': Offer,
    'va-mo--Carousel': Carousel,
    'va-mo--ContentPlaceholder': ContentPlaceholder,
  },
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

    resultsCount() {
      let count = 0
      for (const key in this.results) {
        count += this.results[key].length
      }
      return count
    },
  },

  watchQuery: true,

  watch: {
    '$route.query'() {
      this.$fetch()
    },

    '$fetchState.pending'(pending) {
      if (pending) this.$nuxt.$loading.start()
      if (!pending) this.$nuxt.$loading.finish()
    },
  },

  methods: {
    getRequiredTypes() {
      const types = []
      let requiresOffer, requiresProduct

      if (this.query.exclude) {
        const offerCategories = [
          ...this.$cms.types.repeatables.offer.categories,
          ...this.$cms.types.repeatables.product.categories,
        ]

        const includedCategories = offerCategories.filter((category) => {
          return !this.query.exclude.includes(category)
        })

        requiresOffer = this.$cms.types.repeatables.offer.categories.some(
          (category) => includedCategories.includes(category)
        )

        requiresProduct = this.$cms.types.repeatables.product.categories.some(
          (category) => includedCategories.includes(category)
        )
      } else {
        requiresOffer = true
        requiresProduct = true
      }

      if (requiresOffer) {
        types.push(this.$cms.types.repeatables.offer.typeName)
      }
      if (requiresProduct)
        types.push(this.$cms.types.repeatables.product.typeName)

      return types
    },

    getPredicates() {
      const predicates = []

      if (!this.getRequiredTypes().length > 0) {
        return predicates
      }

      predicates.push(
        this.$prismic.predicates.any('document.type', this.getRequiredTypes())
      )

      if (this.query.exclude) {
        for (const type of this.getRequiredTypes()) {
          const typeKey = Object.keys(this.$cms.types.repeatables).find(
            (key) => this.$cms.types.repeatables[key].typeName === type
          )
          for (const category of this.$cms.types.repeatables[typeKey]
            .categories) {
            if (this.query.exclude.includes(category)) {
              predicates.push(
                this.$prismic.predicates.not(
                  `my.${type}.general__category`,
                  category
                )
              )
            }
          }
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
    if (!this.getPredicates().length > 0) {
      this.results.courses = []
      this.results.events = []
      this.results.products = []
      return
    }

    const query = new this.$cms.Query(this.getPredicates())

    const cmsResponse = await query.get()

    if (!cmsResponse) {
      this.results.courses = []
      this.results.events = []
      this.results.products = []
      return
    }

    this.results.courses = cmsResponse.results.filter((result) => {
      return (
        result.type === this.$cms.types.repeatables.offer.typeName &&
        result.data.general__category === 'course'
      )
    })
    this.results.events = cmsResponse.results.filter((result) => {
      return (
        result.type === this.$cms.types.repeatables.offer.typeName &&
        result.data.general__category === 'event'
      )
    })
    this.results.products = cmsResponse.results.filter(
      (result) => result.type === this.$cms.types.repeatables.product.typeName
    )
  },
}
</script>

<style lang="scss" scoped>
.va-ps--Results {
  @include fill-screen-width;
  background-color: $color__grey--dark;
  padding-top: $spacing__macro--xs;
  padding-bottom: $spacing__macro--xs;
  overflow: hidden;
  // min-height: 50vh;

  &__body {
    @include page-margin;

    &__results__products,
    &__results__events {
      margin-top: $spacing__macro--sm;
    }

    &__results__placeholder > * {
      margin-left: 0;
    }
  }
}
</style>