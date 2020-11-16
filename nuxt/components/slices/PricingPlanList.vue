<template>
  <div class="va-sl--PricingPlanList">
    <div
      class="va-sl--PricingPlanList__pricing-tier"
      v-for="(pricingTier, index) of pricingTierSlices"
      :key="index"
      :style="`border-top-color: ${pricingTier.primary.color}`"
    >
      <img
        class="va-sl--PricingPlanList__pricing-tier__icon"
        :src="pricingTier.primary.icon.url"
        v-if="pricingTier.primary.icon"
      />
      <h4 class="va-sl--PricingPlanList__pricing-tier__heading">
        {{ pricingTier.primary.heading }}
      </h4>
      <h3 class="va-sl--PricingPlanList__pricing-tier__price">
        {{
          $intlFormatter.currency(
            $api.payment.getCurrentPriceFromPricingTier(pricingTier)
          )
        }}
      </h3>
      <prismic-rich-text
        class="va-sl--PricingPlanList__pricing-tier__description"
        :field="pricingTier.primary.description"
      />
      <button
        class="va-sl--PricingPlanList__pricing-tier__button"
        @click="handleSelect(pricingTier.primary.heading)"
      >
        Diesen Plan auswählen
      </button>
      <!-- <p>Nach dem 23. März 2020:</p> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'va-sl--PricingPlanList',
  props: {
    pricingTierSlices: Array,
  },

  methods: {
    handleSelect(pricingTierName) {
      this.$router.replace({ query: { plan: pricingTierName } })
      // this.$store.commit('notifications/add', {
      //   message: 'Deine Auswahl wurde übernommen!',
      // })
    },
  },
}
</script>

<style lang="scss" scoped>
.va-sl--PricingPlanList {
  display: flex;
  flex-direction: column;
  justify-content: stretch;

  @include desktops {
    flex-direction: row;
    flex-wrap: wrap;
  }

  &__pricing-tier {
    padding: $spacing__micro--xl;
    background-color: $color__grey--light;
    border-top: $spacing__micro--sm solid $color__grey--dark;
    border-bottom: $spacing__micro--sm solid $color__grey--dark;
    text-align: center;
    display: flex;
    flex-direction: column;
    // align-items: center;
    min-width: $spacing__macro--xl;
    flex: 1;

    & + & {
      margin-top: $spacing__micro--xl;
    }

    @include desktops {
      & + & {
        margin-top: 0;
        margin-left: $spacing__micro--xl;
      }
    }

    &__icon {
      width: $spacing__macro--md;
      align-self: center;
      margin: $spacing__macro--xs 0;
    }

    &__heading {
      margin: 0;
      margin-bottom: $spacing__micro--md;
    }

    &__price {
      margin: 0;
      margin-bottom: $spacing__micro--xl;
      font-weight: bold;
    }

    &__button {
      align-self: strech;
    }
  }
}
</style>