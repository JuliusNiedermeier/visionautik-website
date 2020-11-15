<template>
  <div class="va-ps--Vision" v-if="heading && text && image.url">
    <div class="va-ps--Vision__body">
      <div class="va-ps--Vision__body__text">
        <h2 class="va-ps--Vision__body__text__heading">{{ heading }}</h2>
        <p>{{ text }}</p>
        <button>
          {{
            $t(
              `types.${$api.types.pages.index.typeName}.ourVisionSection.readMore`
            )
          }}
        </button>
      </div>
      <div class="va-ps--Vision__body__image">
        <img :src="image.url" :alt="image.alt" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'va-ps--Vision',
  data() {
    return {
      heading: null,
      text: null,
      image: {},
    }
  },

  async fetch() {
    const type = this.$api.types.pages.index.typeName

    const query = new this.$api.Query(
      [this.$prismic.predicates.at('document.type', type)],
      {
        fetch: [
          type + '.our_vision__heading',
          type + '.our_vision__text',
          type + '.our_vision__image',
        ],
      }
    )

    const response = await query.get()
    if (!response) return

    const data = response.results[0].data

    this.heading = data.our_vision__heading
    this.text = data.our_vision__text
    this.image = data.our_vision__image
  },
}
</script>

<style lang="scss" scoped>
.va-ps--Vision {
  @include fill-screen-width;
  background-color: $color__grey--dark;
  padding: $spacing__macro--lg 0;

  &__body {
    @include page-margin;
    display: flex;
    justify-content: space-between;
    align-items: stretch;

    &__text {
      margin-right: $spacing__micro--xl;

      &__heading {
        margin-top: 0;
      }
    }

    &__image {
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