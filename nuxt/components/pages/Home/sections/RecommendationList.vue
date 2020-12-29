<template>
  <va-at--PageSection
    padding="bottom"
    standout
    v-if="recommendations.length >= 3"
  >
    <div class="va-ps--RecommendationList">
      <div class="va-ps--RecommendationList__items">
        <va-mo--Offer
          class="va-ps--RecommendationList__items__recommendation"
          v-for="recommendation in recommendations"
          :key="recommendation.uid"
          :uid="recommendation.uid"
          :image="recommendation.general__featured_image.thumbnail.url"
          :title="recommendation.general__heading"
          :description="recommendation.general__excerpt"
          :type="recommendation.type"
          :tag="getRecommendationTag(recommendation)"
          :price="parsePriceFromPricingSlices(recommendation.pricing__slices)"
        />
      </div>
    </div>
  </va-at--PageSection>
</template>

<script>
import PageSection from '@/components/atoms/PageSection.vue'
import Offer from '@/components/molecules/Offer'
import parseLowestPriceFromPricingPlanSlices from '@/assets/js/util/parseLowestPriceFromPricingPlanSlices.js'
import { repeatables } from '@/assets/js/types.js'
export default {
  name: 'va-ps--RecommendationList',
  components: { 'va-mo--Offer': Offer, 'va-at--PageSection': PageSection },
  props: {
    heading: String,
    recommendations: {
      default: () => [],
    },
  },

  methods: {
    getRecommendationTag(recommendation) {
      if (recommendation.type === repeatables.activity.typeName) {
        return this.$tc(
          `types.${recommendation.type}.categories.${recommendation.general__category}`, 0
        )
      } else if (recommendation.type === repeatables.blogPost.typeName) {
        return this.$tc(`types.${recommendation.type}`, 0)
      }
    },

    parsePriceFromPricingSlices(pricingSlices) {
      return parseLowestPriceFromPricingPlanSlices.call(this, ...arguments)
    },
  },
}
</script>

<style lang="scss" scoped>
.va-ps--RecommendationList {
  padding-top: $spacing--micro--xl;
  &__heading {
    text-align: center;
    margin-top: 0;
    margin-bottom: $spacing__macro--xs;
  }

  &__items {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: stretch;

    @include desktops {
      flex-direction: row;
    }

    &__recommendation {
      @include desktops {
        flex: 1;
      }

      & + & {
        margin-top: $spacing__micro--xl;

        @include desktops {
          margin-left: $spacing__micro--xl;
          margin-top: 0;
        }
      }
    }
  }
}
</style>