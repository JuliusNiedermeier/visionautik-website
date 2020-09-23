<template>
  <div class="pricing-section-slice">
    <div
      class="pricing-section-slice__pricing-tier"
      v-for="(pricingTier, index) of pricingTierSlices"
      :key="index"
      :style="`border-top-color: ${pricingTier.primary.color}`"
    >
      <img :src="pricingTier.primary.icon.url" v-if="pricingTier.primary.icon" />
      <h3>{{pricingTier.primary.heading}}</h3>
      <h2>{{$api.payment.getCurrentPriceFromPricingTier(pricingTier)}}€</h2>
      <prismic-rich-text :field="pricingTier.primary.description" />
      <button @click="handleSelect(pricingTier.primary.heading)">Diesen Plan auswählen</button>
      <!-- <p>Nach dem 23. März 2020:</p> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pricingTierSlices: Array,
  },

  methods: {
    handleSelect(pricingTierName) {
      this.$store.commit('courseSidebar/selectPricingTier', pricingTierName)
      this.$router.replace({ query: { plan: pricingTierName } })
      this.$store.dispatch('notifications/show', {
        message: 'Deine Auswahl wurde übernommen!',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.pricing-section-slice {
  display: flex;
  flex-direction: column;
  justify-content: stretch;

  @include desktops {
    flex-direction: row;
    flex-wrap: wrap;
  }

  &__pricing-tier {
    padding: 2rem;
    background-color: $color--grey--light;
    border-top: 0.5rem solid $color--grey--dark;
    border-bottom: 0.5rem solid $color--grey--dark;
    text-align: center;
    display: flex;
    flex-direction: column;
    // align-items: center;
    min-width: 30rem;
    flex: 1;

    & + & {
      margin-top: 2rem;
    }

    @include desktops {
      & + & {
        margin-top: 0;
        margin-left: 2rem;
      }
    }

    img {
      width: 15rem;
      align-self: center;
    }

    button {
      align-self: strech;
    }
  }
}
</style>