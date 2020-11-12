<template>
  <div class="press-quote-section" v-if="pressQuotes.length > 0">
    <va-carousel
      class="press-quote-section__carousel"
      randomize
      autoplayInterval="5000"
      loop
      gap
    >
      <div
        v-for="(pressQuote, index) in pressQuotes"
        :key="index"
        class="press-quote-section__carousel__quote"
      >
        <img :src="pressQuote.general__logo.url" />

        <p>
          <small>{{ pressQuote.general__text }}</small>
        </p>
        <p></p>
      </div>
    </va-carousel>
  </div>
</template>

<script>
import Carousel from '@/components/elements/Carousel'
export default {
  components: { 'va-carousel': Carousel, 'va-carousel': Carousel },

  data() {
    return {
      pressQuotes: [],
    }
  },

  async fetch() {
    const query = new this.$api.Query([
      this.$prismic.predicates.at(
        'document.type',
        this.$api.types.repeatables.pressQuote.typeName
      ),
    ])

    const apiResponse = await query.get()
    if (!apiResponse) return

    this.pressQuotes = []
    for (const result of apiResponse.results) {
      this.pressQuotes = [...this.pressQuotes, result.data]
    }
  },
}
</script>

<style lang="scss" scoped>
.press-quote-section {
  background-color: $color--grey--light;
  @include fill-screen-width;
  padding-top: 2rem;

  &__carousel {
    @include page-margin;

    &__quote {
      min-width: 100%;
      text-align: center;
      padding: 2rem;
      background-color: $color--grey--dark;

      @include desktops {
        min-width: 60%;
      }

      img {
        width: 100%;
        max-width: 300px;
        max-height: 80px;
        object-fit: contain;
      }
    }
  }
}
</style>