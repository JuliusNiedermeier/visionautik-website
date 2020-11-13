<template>
  <div class="carousel-component" :class="{ gap: gap }">
    <slot />
    <div
      class="carousel-component__placeholder invert-color"
      v-if="displayPlaceholder"
    >
      <slot name="placeholder" />
    </div>
  </div>
</template>

<script>
export default {
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

.carousel-component {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  display: flex;
  padding-bottom: $spacing__micro--xl;

  & > * {
    scroll-snap-align: start;
  }

  &.gap {
    > * + * {
      margin-left: $spacing__micro--xl;
    }
  }

  &__placeholder {
    height: $spacing__macro--xl;
    background-color: $color__blue--base;
    @include background-gradient(45deg, 'blue');
    flex: 1;
    min-width: $spacing__macro--xl;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>