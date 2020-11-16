<template>
  <div class="va-ps--Vision">
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
          :src="imageUrl"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'va-ps--Vision',
  props: ['heading', 'text', 'imageUrl'],
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