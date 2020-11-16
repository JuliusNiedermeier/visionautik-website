<template>
  <div class="va-ps--PressQuoteCarousel" v-if="pressQuotes.length > 0">
    <va-mo--Carousel
      class="va-ps--PressQuoteCarousel__carousel"
      randomize
      autoplayInterval="5000"
      loop
      gap
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
        <p></p>
      </div>
    </va-mo--Carousel>
  </div>
</template>

<script>
import Carousel from '@/components/molecules/Carousel'
export default {
  name: 'va-ps--PressQuoteCarousel',
  components: { 'va-mo--Carousel': Carousel },
  data() {
    return {
      pressQuotes: [],
    }
  },

  async fetch() {
    const query = new this.$cms.Query([
      this.$prismic.predicates.at(
        'document.type',
        this.$cms.types.repeatables.pressQuote.typeName
      ),
    ])

    const cmsResponse = await query.get()
    if (!cmsResponse) return

    this.pressQuotes = []
    for (const result of cmsResponse.results) {
      this.pressQuotes = [...this.pressQuotes, result.data]
    }
  },
}
</script>

<style lang="scss" scoped>
.va-ps--PressQuoteCarousel {
  background-color: $color__grey--light;
  @include fill-screen-width;
  padding-top: $spacing__micro--xl;

  &__carousel {
    @include page-margin;

    &__quote {
      min-width: 100%;
      text-align: center;
      padding: $spacing__micro--xl;
      background-color: $color__grey--dark;

      @include desktops {
        min-width: 60%;
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