<template>
  <va-at--PageSection padding="both">
    <div class="va-ps--Vision">
      <div class="va-ps--Vision__text">
        <h2 class="va-ps--Vision__text__heading">{{ heading }}</h2>
        <p>{{ text }}</p>
        <va-at--Button :to="{ name: 'about' }">{{ buttonLabel }}</va-at--Button>
      </div>
      <div class="va-ps--Vision__image-wrapper">
        <img class="va-ps--Vision__image-wrapper__image" :src="imageUrl" />
      </div>
    </div>
  </va-at--PageSection>
</template>

<script>
import PageSection from '@/components/atoms/PageSection.vue'
import Button from '@/components/atoms/Button.vue'
import { pages } from '@/assets/js/types.js'
export default {
  name: 'va-ps--Vision',
  components: { 'va-at--Button': Button, 'va-at--PageSection': PageSection },
  props: ['heading', 'text', 'imageUrl'],

  computed: {
    buttonLabel() {
      return this.$t(`types.${pages.index.typeName}.ourVisionSection.readMore`)
    },
  },
}
</script>

<style lang="scss" scoped>
.va-ps--Vision {
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
</style>