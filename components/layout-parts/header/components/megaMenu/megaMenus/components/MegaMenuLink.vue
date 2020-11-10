<template>
  <nuxt-link :to="to" class="mega-menu-link-component">
    <strong class="mega-menu-link-component__label">{{ label }}</strong>
    <va-icon name="chevron-right" class="mega-menu-link-component__icon" />
  </nuxt-link>
</template>

<script>
import Icon from '@/components/elements/Icon'
export default {
  components: { 'va-icon': Icon },
  props: {
    to: String | Object,
    label: String,
  },
}
</script>

<style lang="scss" scoped>
.mega-menu-link-component {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: $color--blue--base;

  &__label {
    text-transform: uppercase;
  }

  &:hover {
    background: none;
    color: $color--blue--base;

    .mega-menu-link-component__icon {
      color: $color--red--base;
    }
  }
}
</style>