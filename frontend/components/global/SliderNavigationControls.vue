<template>
  <div class="slider-navigation-controls-component">
    <va-icon
      name="chevron-left"
      class="slider-navigation-controls-component__nav-button prev"
      @click.native="$emit('prev')"
    />
    <div class="slider-navigation-controls-component__indicators">
      <div
        v-for="n in parseInt(number)"
        :key="n"
        class="slider-navigation-controls-component__indicators__indicator"
        @click="$emit('indicator-clicked', n - 1)"
      >
        <div
          class="slider-navigation-controls-component__indicators__indicator__body"
          :class="{'active': n - 1 == activeIndex}"
        />
      </div>
    </div>
    <va-icon
      name="chevron-right"
      class="slider-navigation-controls-component__nav-button next"
      @click.native="$emit('next')"
    />
  </div>
</template>

<script>
import Icon from '@/components/global/Icon'
export default {
  components: { 'va-icon': Icon },
  props: ['number', 'activeIndex', 'inactiveColor', 'activeColor'],
}
</script>

<style lang="scss" scoped>
.slider-navigation-controls-component {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  &__nav-button {
    cursor: pointer;
    color: $color--blue--base;
    opacity: 0.25;

    $touch-area-padding: 2rem;
    padding: $touch-area-padding;
    &.prev {
      transform: translateX(-$touch-area-padding);
    }
    &.next {
      transform: translateX($touch-area-padding);
    }

    &:hover {
      opacity: 1;
    }
  }

  &__indicators {
    display: flex;
    flex-direction: row;
    width: 50%;
    justify-content: center;

    &__indicator {
      max-width: 3rem;
      flex-grow: 1;

      padding: 1rem 0.5rem;

      &:hover {
        .slider-navigation-controls-component__indicators__indicator__body:not(.active) {
          background-color: darken($color--grey--dark, $amount: 5);
        }
      }

      &__body {
        height: 0.25rem;
        background-color: $color--grey--dark;

        &.active {
          background-color: $color--red--base;
        }
      }
    }
  }
}
</style>