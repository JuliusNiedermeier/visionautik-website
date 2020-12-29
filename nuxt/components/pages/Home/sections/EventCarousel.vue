<template>
  <va-at--PageSection standout padding="both">
    <div class="va-ps--EventCarousel">
      <div class="va-ps--EventCarousel__head-section">
        <h2 class="va-ps--EventCarousel__head-section__heading">
          {{ heading }}
        </h2>
        <va-at--Button
          class="va-ps--EventCarousel__head-section__button"
          iconName="chevron-right"
          :to="allEventsRoute"
        >
          {{ buttonLabel }}
        </va-at--Button>
      </div>
      <div class="va-ps--EventCarousel__carousel">
        <va-mo--Carousel gap displayPlaceholder>
          <va-mo--Offer
            v-for="(event, index) in events"
            :key="index"
            :uid="event.uid"
            :image="event.general__featured_image.thumbnail.url"
            :title="event.general__heading"
            :description="event.general__excerpt"
            :type="eventType"
            fixedWidth
            :price="parseLowestPrice(event.pricing__slices)"
          />
          <template slot="placeholder">
            <va-mo--ContentPlaceholder
              :heading="placeholderData.heading"
              :body="placeholderData.body"
              :buttonLabel="placeholderData.buttonLabel"
              buttonIconName="addNotification"
              centered
              @click="handlePlaceholderClick"
            />
          </template>
        </va-mo--Carousel>
      </div>
    </div>
  </va-at--PageSection>
</template>

<script>
import PageSection from '@/components/atoms/PageSection.vue'
import Button from '@/components/atoms/Button.vue'
import Carousel from '@/components/molecules/Carousel'
import Offer from '@/components/molecules/Offer'
import Icon from '@/components/atoms/Icon'
import ContentPlaceholder from '@/components/molecules/ContentPlaceholder'
import parseLowestPriceFromPricingPlanSlices from '@/assets/js/util/parseLowestPriceFromPricingPlanSlices.js'
import getOfferCategories from '@/assets/js/util/getOfferCategories.js'
import { pages, repeatables } from '@/assets/js/types.js'
import subscribeToNotifications from '@/mixins/usecases/subscribeToNotifications.js'
export default {
  name: 'va-ps--EventCarousel',
  mixins: [subscribeToNotifications],
  components: {
    'va-at--PageSection': PageSection,
    'va-mo--Offer': Offer,
    'va-mo--Carousel': Carousel,
    'va-at--Icon': Icon,
    'va-mo--ContentPlaceholder': ContentPlaceholder,
    'va-at--Button': Button,
  },

  props: {
    heading: String,
    events: {
      default: () => [],
    },
  },

  data() {
    return {
      allEventsRoute: {
        name: 'offers',
        query: {
          exclude: getOfferCategories({ exclude: ['event'] }).map(
            (category) => category.label
          ),
        },
      },

      eventType: repeatables.activity.typeName,
    }
  },

  computed: {
    buttonLabel() {
      return this.$t(`types.${pages.index.typeName}.eventsSection.allEvents`)
    },

    placeholderData() {
      return {
        heading: this.$t(`global.placeholders.events.heading`),
        body: this.$t(`global.placeholders.events.body`),
        buttonLabel: this.$t(`global.placeholders.events.buttonLabel`),
      }
    },
  },

  methods: {
    parseLowestPrice(prcingPlanSlices) {
      return parseLowestPriceFromPricingPlanSlices.call(this, ...arguments)
    },

    handlePlaceholderClick() {
      this.subscribeToNotifications([
        repeatables.activity.categories.find((cat) => cat === 'event'),
      ])
    },
  },
}
</script>

<style lang="scss" scoped>
.va-ps--EventCarousel {
  &__heading {
    text-align: center;
    margin-top: 0;
    margin-bottom: $spacing__macro--xs;
  }

  &__head-section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
</style>