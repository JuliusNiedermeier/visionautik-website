<template>
  <aside class="sidebar-component">
    <div class="sidebar-component__top-section">
      <slot name="top" />
    </div>
    <div class="sidebar-component__bottom-section">
      <slot name="bottom" />
    </div>
  </aside>
</template>

<script>
export default {}
</script>

<style lang="scss">
.sidebar-component {
  width: 100%;
  height: 100%;
  background-color: $color--lilac--base;

  &__top-section {
    height: 30rem;
    background-color: $color--blue--base;
    color: white;
  }

  &__bottom-section {
    padding: 2rem;
  }
}
</style>