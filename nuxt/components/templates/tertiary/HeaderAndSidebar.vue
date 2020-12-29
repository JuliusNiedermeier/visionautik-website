<template>
  <div class="va-tp--HeaderAndSidebar">
    <div class="va-tp--HeaderAndSidebar__header">
      <slot name="header" />
    </div>
    <div class="va-tp--HeaderAndSidebar__body">
      <aside class="va-tp--HeaderAndSidebar__body__sidebar">
        <div class="va-tp--HeaderAndSidebar__body__sidebar__top">
          <slot name="sidebar-top" />
        </div>
        <div class="va-tp--HeaderAndSidebar__body__sidebar__bottom">
          <slot name="sidebar-bottom" />
        </div>
      </aside>
      <div class="va-tp--HeaderAndSidebar__body__main">
        <slot name="main" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'va-tp--HeaderAndSidebar',
}
</script>

<style lang="scss" scoped>
.va-tp--HeaderAndSidebar {
  &__header {
    height: $spacing__macro--xxl;
    position: relative;
    overflow: hidden;
  }

  &__body {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;

    @include desktops {
      @include page-margin;
      flex-direction: row-reverse;
    }

    &__main {
      flex: 1;
      margin-top: $spacing__micro--xl;

      @include mobile {
        @include page-margin;
      }
    }

    &__sidebar {
      width: 100%;
      height: calc(100vh - 18.5rem);
      // min-height: min-content;
      overflow: hidden;
      background-color: $color__lilac--base;
      display: flex;
      flex-direction: column-reverse;

      @include desktops {
        flex-direction: column;
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