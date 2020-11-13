<template>
  <div class="navigation-menu-toggle-component">
    <div class="navigation-menu-toggle-component__toggle" :class="toggleState">
      <div />
      <div />
      <div />
    </div>
  </div>
</template>

<script>
export default {
  name: 'va-navigation-menu-toggle',
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
.navigation-menu-toggle-component__toggle {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: $spacing__micro--xl;
  width: $spacing__micro--xl + $spacing__micro--md;
  cursor: pointer;

  div {
    height: 1px;
    width: 100%;
    transform-origin: right;
    background-color: $color__blue--base;
    transition-timing-function: ease;
    transition-property: width transform;
    transition-duration: $duration--fast;
  }

  &.expanded {
    :nth-child(1) {
      width: 33%;
    }

    :nth-child(2) {
      width: 66%;
    }
  }

  &.expanded--mega-menu {
    :nth-child(1) {
      transform: rotate(-45deg);
      width: 90%;
    }

    :nth-child(2) {
      width: 0;
    }

    :nth-child(3) {
      transform: rotate(45deg);
      width: 90%;
    }
  }
}
</style>