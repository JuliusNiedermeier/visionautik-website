<template>
  <va-at--PageSection>
    <div class="va-ps--PressQuoteCarousel" v-if="pressQuotes.length > 0">
      <va-mo--Carousel
        class="va-ps--PressQuoteCarousel__carousel"
        randomize
        autoplayInterval="5000"
        gap
        loop
      >
        <div
          v-for="(pressQuote, index) in pressQuotes"
          :key="index"
          class="va-ps--PressQuoteCarousel__carousel__quote"
        >
          <img
            class="va-ps--PressQuoteCarousel__carousel__quote__press-logo"
            :src="pressQuote.general__logo.url"
          />
          <p class="va-ps--PressQuoteCarousel__carousel__quote__body">
            <small>{{ pressQuote.general__text }}</small>
          </p>
        </div>
      </va-mo--Carousel>
    </div>
  </va-at--PageSection>
</template>

<script>
import PageSection from '@/components/atoms/PageSection'
import Carousel from '@/components/molecules/Carousel'
export default {
  name: 'va-ps--PressQuoteCarousel',
  components: {
    'va-at--PageSection': PageSection,
    'va-mo--Carousel': Carousel,
  },
  props: { pressQuotes: { default: () => [] } },
}
</script>

<style lang="scss" scoped>
.va-ps--PressQuoteCarousel {
  background-color: $color__grey--light;
  padding-top: $spacing__micro--xl;

  &__carousel {
    // @include page-margin;

    &__quote {
      text-align: center;
      padding: $spacing__micro--xl;
      background-color: $color__grey--dark;

      min-width: 100%;
      max-width: 100%;

      @include desktops {
        min-width: 66%;
        max-width: 66%;
      }

      &__press-logo {
        width: 100%;
        max-width: 300px;
        max-height: 80px;
        object-fit: contain;
      }
    }
  }
}
</style>