<template>
  <div class="va-ps--Vision" v-if="heading && text && image.url">
    <div class="va-ps--Vision__body">
      <div class="va-ps--Vision__body__text">
        <h2 class="va-ps--Vision__body__text__heading">{{ heading }}</h2>
        <p>{{ text }}</p>
        <button>
          {{
            $t(
              `types.${$cms.types.pages.index.typeName}.ourVisionSection.readMore`
            )
          }}
        </button>
      </div>
      <div class="va-ps--Vision__body__image-wrapper">
        <img
          class="va-ps--Vision__body__image-wrapper__image"
          :src="image.url"
          :alt="image.alt"
        />
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
    const type = this.$cms.types.pages.index.typeName

    const query = new this.$cms.Query(
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

    @include desktops {
      display: flex;
      flex-direction: row;
    }

    &__text {
      flex: 1;

      @include desktops {
        margin-right: $spacing__micro--xl;
      }

      &__heading {
        margin-top: 0;
      }
    }

    &__image-wrapper {
      position: relative;
      flex: 1;
      height: $spacing--macro--md;
      margin-top: $spacing--micro--xl;

      @include desktops {
        height: initial;
        margin-top: initial;
      }

      &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;

        @include desktops {
          position: absolute;
          object-fit: cover;
        }
      }
    }
  }
}
</style>