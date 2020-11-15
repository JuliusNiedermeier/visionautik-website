<template>
  <nuxt-link :to="to" class="va-mo--MegaMenuLink">
    <strong class="va-mo--MegaMenuLink__label">{{ label }}</strong>
    <va-at--Icon name="chevron-right" class="va-mo--MegaMenuLink__icon" />
  </nuxt-link>
</template>

<script>
import Icon from '@/components/atoms/Icon'
export default {
  name: 'va-mo--MegaMenuLink',
  components: { 'va-at--Icon': Icon },
  props: {
    to: String | Object,
    label: String,
  },
}
</script>

<style lang="scss" scoped>
.va-mo--MegaMenuLink {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: $color__blue--base;

  &__label {
    text-transform: uppercase;
  }

  &:hover {
    background: none;
    color: $color__blue--base;

    .va-mo--MegaMenuLink__icon {
      color: $color__red--base;
    }
  }
}
</style>