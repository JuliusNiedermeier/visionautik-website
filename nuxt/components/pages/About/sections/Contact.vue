<template>
  <va-at--PageSection padding="both">
    <div class="va-ps--Contact">
      <va-mo--PageSectionHeader :heading="heading" />
      <div class="va-ps--Contact__main">
        <div class="va-ps--Contact__main__contact">
          <va-or--ContactForm class="va-ps--Contact__main__contact__form" />
        </div>
        <div class="va-ps--Contact__main__image-wrapper">
          <img
            class="va-ps--Contact__main__image-wrapper__image"
            :src="imageUrl"
          />
        </div>
      </div></div
  ></va-at--PageSection>
</template>

<script>
import PageSection from '@/components/atoms/PageSection.vue'
import PageSectionHeader from '@/components/molecules/PageSectionHeader.vue'
import ContactForm from './ContactForm.vue'
export default {
  name: 'va-ps--Contact',
  components: {
    'va-at--PageSection': PageSection,
    'va-mo--PageSectionHeader': PageSectionHeader,
    'va-or--ContactForm': ContactForm,
  },
  props: {
    heading: String,
    imageUrl: String,
  },
}
</script>

<style lang="scss" scoped>
.va-ps--Contact {
  &__heading {
    margin-bottom: $spacing--macro--xs;
  }

  &__main {
    display: flex;
    flex-direction: column;

    @include desktops {
      flex-direction: row-reverse;
    }

    &__contact {
      flex: 1;
      margin-bottom: $spacing--micro--xl;

      @include desktops {
        margin: 0 $spacing--micro--xl;
      }
    }

    &__image-wrapper {
      flex: 1;
      position: relative;

      &__image {
        width: 100%;
        object-fit: cover;

        @include desktops {
          position: absolute;
          height: 100%;
        }
      }
    }
  }
}
</style>