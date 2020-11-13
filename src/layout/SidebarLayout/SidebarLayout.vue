<template>
  <div class="sidebar-layout">
    <div class="sidebar-layout__header">
      <div class="sidebar-layout__header__image">
        <!-- <slot name="header" /> -->
        <slot name="header-image" />
      </div>
      <div class="sidebar-layout__header__overlay">
        <div class="sidebar-layout__header__overlay__body">
          <slot name="header-body" />
        </div>
      </div>
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
    @include fill-screen-width;
    height: $spacing__macro--xxl;
    position: relative;
    overflow: hidden;

    &__image {
      height: 100%;
    }

    &__overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      @include background-gradient(90deg, 'dark-transparent');
      color: white;

      &__body {
        height: 100%;
        @include page-margin;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        > * {
          @include desktops {
            padding-right: $spacing__macro--xl + $spacing__micro--xl;
          }
        }
      }
    }
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
      margin-top: $spacing__micro--xl;
    }

    &__sidebar {
      width: 100%;
      height: calc(100vh - 18.5rem);
      // min-height: min-content;
      overflow: hidden;
      background-color: $color__lilac--base;

      @include mobile {
        @include fill-screen-width;
      }

      @include desktops {
        position: sticky;
        bottom: 0;
        align-self: flex-end;
        margin-left: $spacing__micro--xl;
        margin-top: -$spacing__macro--xl;
        width: $spacing__macro--xl;
      }

      &__top {
        height: $spacing__macro--xl;
        @include background-gradient(45deg, 'blue');
        color: white;
      }

      &__bottom {
        padding: $spacing__micro--xl;
      }
    }
  }
}
</style>