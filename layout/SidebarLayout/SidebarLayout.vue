<template>
  <div class="sidebar-layout">
    <div class="sidebar-layout__header">
      <slot name="header" />
    </div>
    <div class="sidebar-layout__body">
      <aside class="sidebar-layout__body__sidebar">
        <div class="sidebar-layout__body__sidebar__top">
          <slot name="sidebar-top" />
        </div>
        <div class="sidebar-layout__body__sidebar__bottom">
          <slot name="sidebar-bottom" />
        </div>
      </aside>
      <div class="sidebar-layout__body__main">
        <slot name="main" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-layout {
  &__header {
  }

  &__body {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;

    @include desktops {
      flex-direction: row-reverse;
    }

    &__main {
      flex: 1;
      margin-top: 2rem;
    }

    &__sidebar {
      width: 100%;
      height: calc(100vh - 18.5rem);
      // min-height: min-content;
      overflow: hidden;
      background-color: $color--lilac--base;

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

      &__top {
        height: 30rem;
        @include background-gradient(45deg, 'blue');
        color: white;
      }

      &__bottom {
        padding: 2rem;
      }
    }
  }
}
</style>