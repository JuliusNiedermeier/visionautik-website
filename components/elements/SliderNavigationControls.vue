<template>
  <div class="slider-navigation-controls-component">
    <va-icon
      name="chevron-left"
      class="slider-navigation-controls-component__nav-button prev"
      @click.native="$emit('prev')"
    />
    <div class="slider-navigation-controls-component__progress-bar">
      <div
        class="slider-navigation-controls-component__progress-bar__indicator"
        :style="`margin-left: calc(${progress}% - 5rem);`"
      />
    </div>
    <va-icon
      name="chevron-right"
      class="slider-navigation-controls-component__nav-button next"
      @click.native="$emit('next')"
    />
  </div>
</template>

<script>
import Icon from './Icon'
export default {
  components: { 'va-icon': Icon },
  props: ['progress', 'activeIndex', 'inactiveColor', 'activeColor'],
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

  &__progress-bar {
    width: 50%;
    background-color: $color--grey--dark;
    display: flex;

    &__indicator {
      transition: margin-left $duration--medium ease;
      height: 0.25rem;
      width: 5rem;
      background-color: $color--red--base;
    }
  }
}
</style>