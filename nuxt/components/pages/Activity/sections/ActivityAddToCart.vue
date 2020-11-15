<template>
  <div class="va-ps--ActivityAddToCart">
    <va-mo--AddToCart
      v-if="!$fetchState.pending"
      :url="$route.path"
      :id="uid"
      :name="offer.general__heading"
      :description="offer.general__excerpt"
      :image="offer.general__featured_image.url"
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

  data() {
    return {
      offer: {},
      uid: null,
      pricingTiers: [],
    }
  },

  async fetch() {
    const type = this.$api.types.repeatables.offer.typeName
    const query = new this.$api.Query(
      [this.$prismic.predicates.at(`my.${type}.uid`, this.$route.params.offer)],
      {
        fetch: [
          type + '.general__heading',
          type + '.general__excerpt',
          type + '.general__featured_image',
          type + '.pricing_tiers__slices',
        ],
      }
    )

    const apiResponse = await query.get()

    if (!apiResponse) return
    this.offer = apiResponse.results[0].data
    this.uid = apiResponse.results[0].uid

    if (this.pricingTiers.length > 0) this.pricingTiers = []
    for (const pricingTier of this.offer.pricing_tiers__slices) {
      this.pricingTiers = [
        ...this.pricingTiers,
        {
          name: pricingTier.primary.heading,
          price: this.$api.payment.getCurrentPriceFromPricingTier(pricingTier),
        },
      ]
    }
  },

  computed: {
    pricingPlanFieldOptions() {
      const pricingPlanOptions = this.pricingTiers.map((pricingTier) => {
        return {
          name: pricingTier.name,
          priceDifference: pricingTier.price,
        }
      })
      return pricingPlanOptions
    },
  },
}
</script>