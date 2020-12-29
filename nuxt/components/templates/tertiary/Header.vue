<template>
  <div class="va-tp--Header">
    <div class="va-tp--Header__header">
      <slot name="header" />
    </div>
    <div class="va-tp--Header__body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'va-tp--Header',
}
</script>

<style lang="scss" scoped>
.va-tp--Header {
  &__header {
    height: $spacing__macro--xxl;
    position: relative;
    overflow: hidden;
  }
}
</style>