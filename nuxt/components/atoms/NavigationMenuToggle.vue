<template>
  <div class="va-at--NavigationMenuToggle" :class="toggleState">
    <div
      class="va-at--NavigationMenuToggle__line va-at--NavigationMenuToggle__line--top"
    />
    <div
      class="va-at--NavigationMenuToggle__line va-at--NavigationMenuToggle__line--center"
    />
    <div
      class="va-at--NavigationMenuToggle__line va-at--NavigationMenuToggle__line--bottom"
    />
  </div>
</template>

<script>
export default {
  name: 'va-at--NavigationMenuToggle',
  props: {
    toggleState: {
      type: String,
      required: true,
      validator(prop) {
        return /^collapsed$|^expanded$|^expanded--mega-menu$/.test(prop)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.va-at--NavigationMenuToggle {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: $spacing__micro--xl;
  width: $spacing__micro--xl + $spacing__micro--md;
  cursor: pointer;

  &__line {
    height: 1px;
    width: 100%;
    transform-origin: right;
    background-color: $color__blue--base;
    transition-timing-function: ease;
    transition-property: width transform;
    transition-duration: $duration--fast;
  }

  &.expanded &__line--top {
    width: 33%;
  }

  &.expanded &__line--center {
    width: 66%;
  }

  &.expanded--mega-menu &__line--top {
    transform: rotate(-45deg);
    width: 90%;
  }

  &.expanded--mega-menu &__line--center {
    width: 0;
  }

  &.expanded--mega-menu &__line--bottom {
    transform: rotate(45deg);
    width: 90%;
  }
}
</style>