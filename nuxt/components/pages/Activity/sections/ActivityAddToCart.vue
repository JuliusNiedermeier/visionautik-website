<template>
  <div class="va-ps--ActivityAddToCart">
    <va-mo--AddToCart
      :url="$route.path"
      :id="$route.params.uid"
      :name="heading"
      :description="excerpt"
      :image="featuredImage"
      basePrice="0"
      :customFields="[
        {
          label: 'Pricing plan',
          key: 'plan',
          options: pricingPlanFieldOptions,
        },
      ]"
    />
  </div>
</template>

<script>
import AddToCart from '@/components/molecules/AddToCart'
export default {
  name: 'va-ps--ActivityAddToCart',

  components: { 'va-mo--AddToCart': AddToCart },

  props: {
    heading: String,
    excerpt: String,
    featuredImage: String,
    pricingTierSlices: {
      default: () => [],
    },
  },

  computed: {
    pricingPlanFieldOptions() {
      return this.pricingTierSlices.map((pricingTier) => {
        return {
          name: pricingTier.primary.heading,
          priceDifference: this.$cms.payment.getCurrentPriceFromPricingTier(
            pricingTier
          ),
        }
      })
    },
  },
}
</script>