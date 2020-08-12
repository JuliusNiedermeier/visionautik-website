<template>
  <div class="navigation-menu-toggle-component" :class="toggleState">
    <div />
    <div />
    <div />
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
      return /^collapsed$|^expanded$/.test(prop)
    }
  }
},
}
</script>

<style lang="scss" scoped>
.navigation-menu-toggle-component {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 2rem;
  width: 3rem;
  cursor: pointer;

  div {
    height: 1px;
    width: 100%;
    background-color: $color--blue--base;
    transition: width $duration--fast ease;
  }

  &.expanded {
    :nth-child(1) {
      width: 33%;
    }

    :nth-child(2) {
      width: 66%;
    }
  }
}
</style>