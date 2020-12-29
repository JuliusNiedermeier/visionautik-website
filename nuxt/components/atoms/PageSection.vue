<template>
  <div
    class="va-at--PageSection"
    :class="{
      standout,
      'padding-top': padding === 'top' || padding === 'both',
      'padding-bottom': padding === 'bottom' || padding === 'both',
      fullwidth: fullwidth === true,
      'fullwidth-mobile': fullwidth === 'mobile',
    }"
  >
    <div class="va-at--PageSection__content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'va-at--PageSection',
  props: { standout: Boolean, padding: String, fullwidth: Boolean | String },
}
</script>

<style lang="scss" scoped>
.va-at--PageSection {
  &.standout {
    background-color: $color--grey--dark;
  }

  &.padding-top {
    padding-top: $spacing--macro--sm;

    @include desktops {
      padding-top: $spacing--macro--lg;
    }
  }

  &.padding-bottom {
    padding-bottom: $spacing--macro--sm;

    @include desktops {
      padding-bottom: $spacing--macro--lg;
    }
  }

  &:not(.fullwidth):not(.fullwidth-mobile) &__content {
    @include page-margin;
  }

  &.fullwidth-mobile &__content {
    @include desktops {
      @include page-margin;
    }
  }
}
</style>