<template>
  <div class="sidebar-layout">
    <div class="sidebar-layout__header">
      <slot name="header" />
    </div>
    <div class="sidebar-layout__body">
      <div class="sidebar-layout__body__sidebar">
        <slot name="sidebar" />
      </div>
      <div class="sidebar-layout__body__page">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.sidebar-layout {
  &__body {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;

    @include desktops {
      flex-direction: row-reverse;
    }

    &__page {
      flex: 1;
    }

    &__sidebar {
      width: 100%;
      height: calc(100vh - 9rem - 10rem);
      min-height: min-content;
      overflow: hidden;

      @include mobile {
        @include fill-screen-width;
      }

      @include desktops {
        position: sticky;
        bottom: 0;
        align-self: flex-end;
        margin-left: 2rem;
        margin-top: -30rem;
        width: 30rem;
      }
    }
  }
}
</style>