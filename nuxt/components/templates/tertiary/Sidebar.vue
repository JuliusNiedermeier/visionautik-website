<template>
  <div class="va-te--Sidebar">
    <main class="va-te--Sidebar__main">
      <slot name="main" />
    </main>
    <aside class="va-te--Sidebar__sidebar">
      <slot name="sidebar" />
    </aside>
  </div>
</template>

<script>
export default {
  name: 'va-te--Sidebar',
}
</script>

<style lang="scss" scoped>
.va-te--Sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @include desktops {
    @include page-margin;
    flex-direction: row;
  }

  &__main {
    flex: 1;
    margin-top: $spacing__micro--xl;

    @include mobile {
      @include page-margin;
    }
  }

  &__sidebar {
    background-color: $color--lilac--base;
    // width: 100%;
    // height: calc(100vh - 18.5rem);
    // // min-height: min-content;
    // overflow: hidden;
    // background-color: $color__lilac--base;
    // display: flex;
    // flex-direction: column-reverse;

    @include desktops {
      margin-left: $spacing--micro--xl;
      margin-top: -$spacing__macro--xl;
      position: sticky;
      bottom: 0;
      align-self: flex-end;
      min-height: calc(
        100vh - 85px - #{$spacing--macro--xxl} + #{$spacing--macro--xl}
      );
    }

    // &__top {
    //   height: $spacing__macro--xl;
    //   @include background-gradient(45deg, 'blue');
    //   color: white;
    // }

    // &__bottom {
    //   padding: $spacing__micro--xl;
    // }
  }
}
</style>