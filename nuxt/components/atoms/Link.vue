<template>
  <component
    :is="isExternal() ? 'a' : 'nuxt-link'"
    class="va-at--Link"
    :class="{ light: appearance === 'light', broken: !to }"
    :target="newTab ? '_blank' : '_self'"
    v-bind="linkAttribute"
  >
    <slot />
  </component>
</template>

<script>
import isInternalLink from '@/assets/js/util/isExternalLink.js'
export default {
  name: 'va-at--Link',
  props: {
    to: { type: String | Object },
    appearance: String,
    newTab: Boolean,
  },

  methods: {
    isExternal() {
      return isInternalLink(this.to)
    },
  },

  computed: {
    linkAttribute() {
      return this.isExternal() ? { href: this.to } : { to: this.to || '' }
    },
  },
}
</script>

<style lang="scss" scoped>
.va-at--Link {
  font-size: 1.8rem;
  color: $color__blue--lighter;
  font-style: normal;
  transition: all $duration--fast ease;

  &:hover {
    color: white;
    @include background-gradient(90deg, 'red');
  }

  &.broken {
    text-decoration: line-through;
    pointer-events: none;
  }

  &.light {
    color: $color--grey--dark;
  }
}
</style>