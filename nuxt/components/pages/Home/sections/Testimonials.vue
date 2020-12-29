<template>
  <va-at--PageSection padding="both">
    <div class="va-ps--Testimonials">
      <va-mo--PageSectionHeader :heading="heading" />
      <va-mo--Carousel class="va-ps--Testimonials__carousel" gap>
        <div
          class="va-ps--Testimonials__carousel__item"
          v-for="(testimonial, index) of testimonials"
          :key="index"
        >
          <p class="va-ps--Testimonials__carousel__item__body">
            {{ testimonial.testimonial__text }}
          </p>
          <div class="va-ps--Testimonials__carousel__item__author">
            <img
              class="va-ps--Testimonials__carousel__item__author__image"
              :src="testimonial.author__image.url"
            />
            <div class="va-ps--Testimonials__carousel__item__author__details">
              <h4
                class="va-ps--Testimonials__carousel__item__author__details__name"
              >
                {{ testimonial.author__name }}
              </h4>
              <small
                class="va-ps--Testimonials__carousel__item__author__details__occupation"
              >
                {{ testimonial.author__occupation }}
              </small>
            </div>
          </div>
        </div>
      </va-mo--Carousel>
    </div>
  </va-at--PageSection>
</template>

<script>
import PageSection from '@/components/atoms/PageSection.vue'
import PageSectionHeader from '@/components/molecules/PageSectionHeader.vue'
import Carousel from '@/components/molecules/Carousel.vue'
export default {
  name: 'va-ps--Testimonials',
  components: {
    'va-at--PageSection': PageSection,
    'va-mo--PageSectionHeader': PageSectionHeader,
    'va-mo--Carousel': Carousel,
  },

  props: {
    heading: String,
    testimonials: Array,
  },
}
</script>

<style lang="scss" scoped>
.va-ps--Testimonials {
  &__carousel {
    &__item {
      padding: $spacing--micro--xl;
      background-color: $color--grey--dark;
      display: flex;
      flex-direction: column;

      @include mobile {
        min-width: 100%;
        max-width: 100%;
      }

      @include desktops {
        min-width: 66%;
        max-width: 66%;
      }

      &__body {
        flex: 1;
      }

      &__author {
        display: flex;
        flex-direction: row;
        align-items: center;

        &__image {
          max-width: $spacing--macro--xs;
          margin-right: $spacing--micro--xl;
        }

        &__details {
          white-space: nowrap;
          &__name {
            margin: 0;
            margin-bottom: $spacing--micro--md;
          }
        }
      }
    }
  }
}
</style>