<template>
  <div class="va-sl--PricingPlanList">
    <div
      class="va-sl--PricingPlanList__pricing-plan"
      v-for="pricingPlan of pricingPlans"
      :key="pricingPlan.id"
      :style="`border-top-color: ${pricingPlan.color}`"
      :class="{
        selectable: pricingPlan.currentPrice,
        selected: pricingPlan.id === selectedPricingPlanId,
      }"
      @click="handleClick(pricingPlan)"
    >
      <h3 class="va-sl--PricingPlanList__pricing-plan__heading">
        {{ pricingPlan.heading }}
      </h3>

      <prismic-rich-text
        class="va-sl--PricingPlanList__pricing-plan__description"
        :field="pricingPlan.description"
      />
      <va-at--Price :price="pricingPlan.currentPrice">
        <h4
          class="va-sl--PricingPlanList__pricing-plan__price"
          slot-scope="{ priceLabel }"
        >
          {{ priceLabel || $t('slices.pricingPlanList.notAvailableYet') }}
        </h4>
      </va-at--Price>
      <va-at--Price :price="pricingPlan.nextPrice" v-if="pricingPlan.nextPrice">
        <i
          class="va-sl--PricingPlanList__pricing-plan__next-price"
          slot-scope="{ priceLabel }"
        >
          <small>
            {{ priceLabel }}
            {{ $t('slices.pricingPlanList.nextEffectiveDateLabel') }}
            {{ $d(new Date(pricingPlan.nextPriceEffectiveDate), 'longDate') }}
          </small>
        </i>
      </va-at--Price>
    </div>
  </div>
</template>

<script>
import Button from '@/components/atoms/Button.vue'
import Price from '@/components/atoms/Price.vue'
import parseCurrentPriceFromPricingPlanSlice from '@/assets/js/util/parseCurrentPriceFromPricingPlanSlice.js'
import parseNextPriceOptionFromPricingPlanSlice from '@/assets/js/util/parseNextPriceOptionFromPricingPlanSlice.js'
import parseLowestPriceFromPricingPlanSlices from '@/assets/js/util/parseLowestPriceFromPricingPlanSlices.js'
export default {
  name: 'va-sl--PricingPlanList',
  components: { 'va-at--Button': Button, 'va-at--Price': Price },
  props: {
    pricingPlanSlices: Array,
  },

  computed: {
    pricingPlans() {
      return this.pricingPlanSlices.map((pricingPlanSlice) => {
        const pricingPlan = {
          id: pricingPlanSlice.primary.id,
          heading: pricingPlanSlice.primary.heading,
          description: pricingPlanSlice.primary.description,
          color: pricingPlanSlice.primary.color,
          currentPrice: parseCurrentPriceFromPricingPlanSlice(pricingPlanSlice),
        }

        const nextPriceOption = parseNextPriceOptionFromPricingPlanSlice(
          pricingPlanSlice
        )

        return {
          ...pricingPlan,
          nextPrice: nextPriceOption.price,
          nextPriceEffectiveDate: nextPriceOption.effectiveDate,
        }
      })
    },

    selectedPricingPlanId() {
      return this.$route.query.ppid
    },

    lowestPrice() {
      return parseLowestPriceFromPricingPlanSlices(this.pricingPlanSlices)
    },
  },

  methods: {
    handleClick(pricingPlan) {
      if (pricingPlan.currentPrice)
        this.$router.replace({ query: { ppid: pricingPlan.id } })
    },
  },
}
</script>

<style lang="scss" scoped>
.va-sl--PricingPlanList {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  gap: $spacing--micro--xl;

  @include desktops {
    flex-direction: row;
    flex-wrap: wrap;
  }

  &__pricing-plan {
    flex: 1;
    padding: $spacing--macro--xs $spacing__micro--xl;
    background-color: $color--lilac--base;
    border-top: $spacing__micro--sm solid $color__grey--dark;
    min-width: $spacing__macro--xl;
    display: flex;
    flex-direction: column;

    text-align: left;

    &.selectable {
      cursor: pointer;

      &:hover {
        background-color: $color--lilac--lighter;
      }
    }

    &.selected.selectable {
      @include background-gradient(90deg, 'blue');
      color: $color--grey--dark;
    }

    &__heading {
      margin: 0;
    }

    &__description {
      flex: 1;
      margin-bottom: $spacing--micro--xl;
    }

    &__price {
      margin: 0;
    }

    &.selected.selectable &__price {
      color: $color--grey--dark;
    }

    &__next-price {
      margin: 0;
    }
  }
}
</style>