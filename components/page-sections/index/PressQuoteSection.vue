<template>
  <div class="press-quote-section">
    <va-carousel class="press-quote-section__carousel" randomize autoplayInterval="5000" loop gap>
      <div
        v-for="(pressQuote, index) in pressQuotes"
        :key="index"
        class="press-quote-section__carousel__quote"
      >
        <img :src="pressQuote.general__logo.url" />
        <p>{{pressQuote.general__text}}</p>
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
        this.$api.types.repeatables.pressQuote
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
  overflow-x: hidden;
  padding: 2rem 0;

  &__carousel {
    @include page-margin;

    &__quote {
      width: 50vw;
      text-align: center;
      padding: 2rem;
      background-color: $color--grey--dark;

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