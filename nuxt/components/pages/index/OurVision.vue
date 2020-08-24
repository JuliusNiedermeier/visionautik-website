<template>
  <div class="our-vision-section">
    <div class="our-vision-section__body">
      <div class="our-vision-section__body__text">
        <h2>{{heading}}</h2>
        <p>{{text}}</p>
        <button>Mehr erfahren</button>
      </div>
      <div class="our-vision-section__body__image">
        <img :src="image.url" :alt="image.alt" />
      </div>
    </div>
  </div>
</template>

<script>
import { missingContent } from '@/mixins/nuxtError'
export default {
  mixins: [missingContent],
  data() {
    return {
      heading: null,
      text: null,
      image: {},
    }
  },

  async fetch() {
    try {
      const dataResponse = (
        await this.$prismic.api.query(
          this.$prismic.predicates.at('document.type', 'homepage'),
          {
            lang: this.localeIso,
            fetch: [
              'homepage.our_vision__heading',
              'homepage.our_vision__text',
              'homepage.our_vision__image',
            ],
          }
        )
      ).results[0].data

      this.heading = dataResponse.our_vision__heading
      this.text = dataResponse.our_vision__text
      this.image = dataResponse.our_vision__image
    } catch {
      this.missingContent()
    }
  },
}
</script>

<style lang="scss" scoped>
.our-vision-section {
  @include fill-screen-width;
  background-color: $color--grey--dark;
  padding: 20rem 0;

  &__body {
    @include page-margin;
    display: flex;
    justify-content: space-between;
    align-items: stretch;

    &__text {
      margin-right: 2rem;
      h2 {
        margin-top: 0;
      }
    }

    &__image {
      background-color: black;
      position: relative;
      overflow: hidden;

      img {
        object-fit: cover;
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }

    > * {
      flex: 1;
    }
  }
}
</style>