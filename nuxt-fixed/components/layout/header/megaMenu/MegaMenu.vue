<template>
  <div class="mega-menu-component" :class="{'mega-menu-component--expanded': expand}">
    <div class="mega-menu-component__body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
name: "va-mega-menu",
props: {
    expand: {
        type: Boolean,
        required: true,
        default: false,
    }
}
}
</script>

<style lang="scss" scoped>
.mega-menu-component {
  background-color: inherit;
  overflow: hidden;
  height: 0;
  transition: all $duration--fast ease;

  &--expanded {
    height: 300px;
    transition: all $duration--fast ease;
  }

  &__body {
    @include page-margin;
  }
}
</style>