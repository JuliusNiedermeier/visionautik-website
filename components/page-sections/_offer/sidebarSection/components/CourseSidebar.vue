<template>
  <div class="course-sidebar-component">
    <va-sidebar>
      <template slot="top"></template>
      <template slot="bottom">
        <div class="course-sidebar-component__bottom">
          <div class="course-sidebar-component__bottom__course-detailes">
            <div>
              <va-icon name="date-range" />
              <small>{{offer.general__start_date}} - {{offer.general__closing_date}}</small>
            </div>
            <div>
              <va-icon name="location" />
              <a
                :href="offer.general__venue_link.url"
                target="_blank"
                v-if="offer.general__venue_link"
              >
                <small>{{offer.general__venue}}</small>
              </a>
            </div>
            <div>
              <va-icon name="people" />
              <small>Max. {{offer.general__maximum_attendance}} Teilnehmer</small>
            </div>
          </div>
          <div class="course-sidebar-component__bottom__pricing_tiers">
            <select @change="handlePricingTierSelected">
              <option disabled selected value hidden>Select a pricing plan</option>
              <option
                v-for="(tier, index) in offer.pricing_tiers__slices"
                :key="index"
                :selected="$route.query.plan === tier.primary.heading"
              >{{tier.primary.heading}}</option>
            </select>
          </div>
          <div class="course-sidebar-component__bottom__price">{{currentPrice}} €</div>
          <va-add-to-cart-button
            v-if="!$fetchState.pending"
            :disabled="!$route.query.plan"
            :name="offer.general__heading"
            :description="offer.general__excerpt"
            :image="offer.general__featured_image.thumbnail.url"
            basePrice="0"
            :customFields="[{name: 'Pricing plan', options: pricingPlanOptions}]"
          />
        </div>
      </template>
    </va-sidebar>
  </div>
</template>

<script>
import Sidebar from '@/components/elements/Sidebar'
import Icon from '@/components/elements/Icon'
import AddToCartButton from '@/components/elements/AddToCartButton'
export default {
  components: {
    'va-sidebar': Sidebar,
    'va-icon': Icon,
    'va-add-to-cart-button': AddToCartButton,
  },

  data() {
    return {
      offer: {},
      pricingTiers: [],
    }
  },

  computed: {
    pricingPlanOptions() {
      const pricingPlanOptions = this.pricingTiers.map((pricingTier) => {
        return {
          name: pricingTier.name,
          priceDifference: pricingTier.price,
        }
      })

      if (this.$route.query.plan) {
        const selectedPricingPlanOptionIndex = pricingPlanOptions.findIndex(
          (option) => option.name === this.$route.query.plan
        )
        if (selectedPricingPlanOptionIndex !== 0) {
          const selectedPricingPlanOption = pricingPlanOptions.splice(
            selectedPricingPlanOptionIndex,
            1
          )[0]
          pricingPlanOptions.unshift(selectedPricingPlanOption)
        }
      }

      return pricingPlanOptions
    },

    currentPrice() {
      const selectedPricingTier = this.pricingTiers.find(
        (pricingTier) => pricingTier.name === this.$route.query.plan
      )
      return selectedPricingTier ? selectedPricingTier.price : null
    },
  },

  methods: {
    handlePricingTierSelected(event) {
      this.$router.replace({ query: { plan: event.target.value } })
    },
  },

  async fetch() {
    const type = this.$api.types.repeatables[this.$route.params.type]
    const query = new this.$api.Query(
      [this.$prismic.predicates.at(`my.${type}.uid`, this.$route.params.offer)],
      {
        fetch: [
          type + '.general__start_date',
          type + '.general__closing_date',
          type + '.general__venue',
          type + '.general__venue_link',
          type + '.general__maximum_attendance',
          type + '.general__excerpt',
          type + '.general__heading',
          type + '.general__featured_image',
          type + '.pricing_tiers__slices',
        ],
      }
    )

    const apiResponse = await query.get()

    if (!apiResponse) return
    this.offer = apiResponse.results[0].data

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
}
</script>

<style lang="scss" scoped>
.course-sidebar-component {
  height: 100%;

  &__bottom {
    &__course-detailes {
      margin: 4rem 0;

      > div {
        display: flex;
        align-items: center;

        > * + * {
          margin-left: 1rem;
        }
      }

      > div + div {
        margin-top: 1rem;
      }
    }

    &__pricing_tiers {
      select {
        width: 100%;
      }
      &__tier {
        padding: 1rem;
        background-color: white;
      }
    }

    &__price {
      padding: 1rem 1.5rem;
      background-color: $color--blue--light;
      color: white;
      font-size: 1.6rem;
      text-align: center;
    }
  }
}

button {
  width: 100%;
}
</style>