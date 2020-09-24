<template>
  <div class="carousel-component" :class="{ gap: gap }">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    gap: Boolean,
  },
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  height: 0.25rem;
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
  display: flex;
  padding-bottom: 2rem;

  /* width */

  &.gap {
    * + * {
      margin-left: 2rem;
    }
  }
}
</style>