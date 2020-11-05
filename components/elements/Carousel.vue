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
  height: 0.25rem;
  // display: none;
}

::-webkit-scrollbar-track {
  background: $color--lilac--base;
  margin-top: 2rem;
}

::-webkit-scrollbar-thumb {
  background: $color--red--base;
}

::-webkit-scrollbar-thumb:hover {
  background: $color--red--light;
}

.carousel-component {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  display: flex;
  padding-bottom: 2rem;

  & > * {
    scroll-snap-align: start;
  }

  &.gap {
    > * + * {
      margin-left: 2rem;
    }
  }

  &__placeholder {
    height: 30rem;
    background-color: $color--blue--base;
    @include background-gradient(45deg, 'blue');
    flex: 1;
    min-width: 30rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>