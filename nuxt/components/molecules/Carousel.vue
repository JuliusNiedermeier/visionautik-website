<template>
  <div class="va-mo--Carousel" :class="{ gap }">
    <slot />
    <div
      class="va-mo--Carousel__placeholder invert-color"
      v-if="displayPlaceholder"
    >
      <slot name="placeholder" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'va-mo--Carousel',
  props: {
    gap: Boolean,
    displayPlaceholder: Boolean,
  },
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  height: $spacing__micro--xs;
  // display: none;
}

::-webkit-scrollbar-track {
  background: $color__lilac--base;
  margin-top: $spacing__micro--xl;
}

::-webkit-scrollbar-thumb {
  background: $color__red--base;
}

::-webkit-scrollbar-thumb:hover {
  background: $color__red--light;
}

.va-mo--Carousel {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  display: flex;
  align-items: stretch;
  padding-bottom: $spacing__micro--xl;

  > * {
    scroll-snap-align: start;
  }

  &.gap > * + * {
    margin-left: $spacing__micro--xl;
  }

  &__placeholder {
    flex: 1;
    // height: $spacing__macro--xl;
    min-width: $spacing__macro--xl;
    // background-color: $color__blue--base;
    background-color: $color__grey--light;
    // @include background-gradient(45deg, 'blue');
    box-sizing: border-box;
    padding: $spacing--micro--xl;

    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>