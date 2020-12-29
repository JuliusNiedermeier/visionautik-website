<template>
  <div class="va-at--Sidebar">
    <div class="va-at--Sidebar__top">
      <div class="va-at--Sidebar__top__content">
        <slot name="top" />
      </div>
    </div>
    <div class="va-at--Sidebar__bottom">
      <div class="va-at--Sidebar__bottom__content">
        <slot name="bottom" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'va-at--Sidebar',
}
</script>

<style lang="scss" scoped>
.va-at--Sidebar {
  display: flex;
  flex-direction: column-reverse;

  @include desktops {
    width: $spacing__macro--xl;
    flex-direction: column;
  }

  &__top {
    padding-top: $spacing__micro--xl;
    padding-bottom: $spacing__micro--xl;

    @include background-gradient(45deg, 'blue');
    color: white;

    @include desktops {
      height: $spacing__macro--xl;
      padding-left: $spacing__micro--xl;
      padding-right: $spacing__micro--xl;
    }

    &__content {
      height: 100%;
      @include mobile {
        @include page-margin;
      }
    }
  }

  &__bottom {
    padding-top: $spacing__micro--xl;
    padding-bottom: $spacing__micro--xl;

    @include desktops {
      padding-left: $spacing__micro--xl;
      padding-right: $spacing__micro--xl;
    }

    &__content {
      @include mobile {
        @include page-margin;
      }
    }
  }
}
</style>
      