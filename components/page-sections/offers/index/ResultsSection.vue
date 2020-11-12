<template>
  <div class="results-section">
    <div class="results-section__body">
      <div class="results-section__body__results">
        <div
          class="results-section__body__results__courses"
          v-if="results.courses.length > 0"
        >
          <h5>
            {{ results.courses.length }}
            {{ $t('types.collections.offers.resultSections.courses') }}
          </h5>
          <va-carousel gap displayPlaceholder>
            <va-offer
              v-for="(result, index) in results.courses"
              :key="index"
              :uid="result.uid"
              :image="result.data.general__featured_image.thumbnail.url"
              :title="result.data.general__heading"
              :description="result.data.general__excerpt"
              :type="result.type"
            />
            <template slot="placeholder">
              <va-carousel-placeholder-content
                heading="Kein passender Kurs dabei?"
                body="Wir benachrichtigen dich gerne sobald neue Kurse verfügbar sind!"
                buttonLabel="Benachrichtigen"
                buttonIconName="addNotification"
              />
            </template>
          </va-carousel>
        </div>
        <div
          class="results-section__body__results__events"
          v-if="results.events.length > 0"
        >
          <h5>{{ $t('types.collections.offers.resultSections.events') }}</h5>
          <va-carousel gap displayPlaceholder>
            <va-offer
              v-for="(result, index) in results.events"
              :key="index"
              :uid="result.uid"
              :image="result.data.general__featured_image.thumbnail.url"
              :title="result.data.general__heading"
              :description="result.data.general__excerpt"
              :type="result.type"
            />
            <template slot="placeholder">
              <va-carousel-placeholder-content
                heading="Kein passendes Event dabei?"
                body="Wir benachrichtigen dich gerne sobald neue Events geplant sind!"
                buttonLabel="Benachrichtigen"
                buttonIconName="addNotification"
              />
            </template>
          </va-carousel>
        </div>
        <div
          class="results-section__body__results__products"
          v-if="results.products.length > 0"
        >
          <h5>{{ $t('types.collections.offers.resultSections.products') }}</h5>
          <va-carousel gap displayPlaceholder>
            <va-offer
              v-for="(result, index) in results.products"
              :key="index"
              :uid="result.uid"
              :image="result.data.general__featured_image.thumbnail.url"
              :title="result.data.general__heading"
              :description="result.data.general__excerpt"
              :type="result.type"
              :tag="
                $t(
                  `types.collections.offers.tags.${result.data.general__category}`
                )
              "
            />
            <template slot="placeholder">
              <va-carousel-placeholder-content
                heading="Kein passendes Produkt gefunden?"
                body="Wir benachrichtigen dich gerne sobald unser wir neue Produkte anbieten!"
                buttonLabel="Benachrichtigen"
                buttonIconName="addNotification"
              />
            </template>
          </va-carousel>
        </div>
        <div class="results-section__body__results__placeholder">
          <va-carousel-placeholder-content
            v-if="resultsCount === 0"
            heading="Deine Suche ergab keine Ergebnisse..."
            body="Komm später nochmal!"
            buttonLabel="Benachrichtigung einrichten"
            buttonIconName="addNotification"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Offer from '@/components/elements/Offer'
import Carousel from '@/components/elements/Carousel'
import CarouselPlaceholderContent from '@/components/elements/CarouselPlaceholderContent'
export default {
  name: 'va-results-section',
  components: {
    'va-offer': Offer,
    'va-carousel': Carousel,
    'va-carousel-placeholder-content': CarouselPlaceholderContent,
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
          ...this.$api.types.repeatables.offer.categories,
          ...this.$api.types.repeatables.product.categories,
        ]

        const includedCategories = offerCategories.filter((category) => {
          return !this.query.exclude.includes(category)
        })

        requiresOffer = this.$api.types.repeatables.offer.categories.some(
          (category) => includedCategories.includes(category)
        )

        requiresProduct = this.$api.types.repeatables.product.categories.some(
          (category) => includedCategories.includes(category)
        )
      } else {
        requiresOffer = true
        requiresProduct = true
      }

      if (requiresOffer) {
        types.push(this.$api.types.repeatables.offer.typeName)
      }
      if (requiresProduct)
        types.push(this.$api.types.repeatables.product.typeName)

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
          const typeKey = Object.keys(this.$api.types.repeatables).find(
            (key) => this.$api.types.repeatables[key].typeName === type
          )
          for (const category of this.$api.types.repeatables[typeKey]
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

    const query = new this.$api.Query(this.getPredicates())

    const apiResponse = await query.get()

    if (!apiResponse) {
      this.results.courses = []
      this.results.events = []
      this.results.products = []
      return
    }

    this.results.courses = apiResponse.results.filter((result) => {
      return (
        result.type === this.$api.types.repeatables.offer.typeName &&
        result.data.general__category === 'course'
      )
    })
    this.results.events = apiResponse.results.filter((result) => {
      return (
        result.type === this.$api.types.repeatables.offer.typeName &&
        result.data.general__category === 'event'
      )
    })
    this.results.products = apiResponse.results.filter(
      (result) => result.type === this.$api.types.repeatables.product.typeName
    )
  },
}
</script>

<style lang="scss" scoped>
.results-section {
  @include fill-screen-width;
  background-color: $color--grey--dark;
  padding-top: 5rem;
  padding-bottom: 5rem;
  overflow: hidden;
  // min-height: 50vh;

  &__body {
    @include page-margin;

    &__results {
      > div + div {
        margin-top: 10rem;
      }

      &__placeholder {
        * {
          margin-left: 0;
        }
      }
    }
  }
}
</style>