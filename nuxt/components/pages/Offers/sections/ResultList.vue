<template>
  <div class="va-ps--ResultList">
    <div
      class="va-ps--ResultList__result-row"
      v-for="row of resultsSortedByRows"
      :key="row.key"
    >
      <h2>{{ row.heading }}</h2>
      <va-mo--Carousel gap displayPlaceholder>
        <va-mo--Offer
          v-for="result of row.results"
          :key="result.uid"
          :image="result.general__featured_image.thumbnail.url"
          :title="result.general__heading"
          :description="result.general__excerpt"
          :hosts="result.hosts || []"
          :price="parsePrice(result)"
          :type="result.type"
          :uid="result.uid"
          fixedWidth
        />
        <template slot="placeholder">
          <va-mo--ContentPlaceholder
            :heading="row.placeholder.heading"
            :body="row.placeholder.body"
            :buttonLabel="row.placeholder.buttonLabel"
            buttonIconName="addNotification"
            centered
            @click="handlePlaceholderClick(row.categories)"
          />
        </template>
      </va-mo--Carousel>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/molecules/Carousel.vue'
import Offer from '@/components/molecules/Offer.vue'
import ContentPlaceholder from '@/components/molecules/ContentPlaceholder.vue'
import parseLowestPriceFromPricingPlanSlices from '@/assets/js/util/parseLowestPriceFromPricingPlanSlices.js'
import { repeatables, collections } from '@/assets/js/types'
import subscribeToNotifications from '@/mixins/usecases/subscribeToNotifications.js'
export default {
  name: 'va-ps--ResultList',
  mixins: [subscribeToNotifications],
  components: {
    'va-mo--Offer': Offer,
    'va-mo--Carousel': Carousel,
    'va-mo--ContentPlaceholder': ContentPlaceholder,
  },

  props: { results: Array },

  computed: {
    courses() {
      return this.results.filter(
        (result) =>
          result.type === repeatables.activity.typeName &&
          result.general__category === 'course'
      )
    },

    events() {
      return this.results.filter(
        (result) =>
          result.type === repeatables.activity.typeName &&
          result.general__category === 'event'
      )
    },

    products() {
      return this.results.filter(
        (result) => result.type === repeatables.product.typeName
      )
    },

    resultsSortedByRows() {
      const rows = []

      if (this.courses.length)
        rows.push({
          key: 'courses',
          results: this.courses,
          heading: this.$tc(
            `types.${repeatables.activity.typeName}.categories.course`,
            this.courses.length
          ),
          categories: [
            repeatables.activity.categories.find((cat) => cat === 'course'),
          ],
        })

      if (this.events.length)
        rows.push({
          key: 'events',
          results: this.events,
          heading: this.$tc(
            `types.${repeatables.activity.typeName}.categories.event`,
            this.events.length
          ),
          categories: [
            repeatables.activity.categories.find((cat) => cat === 'event'),
          ],
        })

      if (this.products.length)
        rows.push({
          key: 'products',
          results: this.products,
          heading: this.$tc(
            `types.${repeatables.product.typeName}.label`,
            this.products.length
          ),
          categories: repeatables.product.categories,
        })

      return rows.map((row) => {
        row.placeholder = {
          heading: this.$t(`global.placeholders.${row.key}.heading`),
          body: this.$t(`global.placeholders.${row.key}.body`),
          buttonLabel: this.$t(`global.placeholders.${row.key}.buttonLabel`),
        }
        return row
      })
    },
  },

  methods: {
    parsePrice(result) {
      if (result.pricing__slices) {
        return parseLowestPriceFromPricingPlanSlices(result.pricing__slices)
      }

      if (result.general__price) {
        return result.general__price
      }
    },

    handlePlaceholderClick(categories) {
      this.subscribeToNotifications(categories)
    },
  },
}
</script>

<style lang="scss" scoped>
.va-ps--ResultList {
  &__result-row + &__result-row {
    margin-top: $spacing--macro--sm;
  }
}
</style>