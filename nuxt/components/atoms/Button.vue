<template>
  <button
    class="va-at--Button"
    @click="handleClick"
    :disabled="disabled"
    :class="{
      'icon-left': iconPosition === 'left',
      'icon-right': iconPosition === 'right',
      dark: appearance === 'dark',
      light: appearance === 'light',
      reduced: appearance === 'reduced',
      'align-left': align === 'left',
      'align-right': align === 'right',
      big: big,
      grow: grow,
      explode,
    }"
  >
    <span class="va-at--Button__text"><slot /></span>
    <va-at--Icon class="va-at--Button__icon" v-if="iconName" :name="iconName" />
  </button>
</template>

<script>
import Icon from '@/components/atoms/Icon.vue'
import isExternalLink from '@/assets/js/util/isExternalLink.js'
export default {
  name: 'va-at--Button',
  components: { 'va-at--Icon': Icon },
  props: {
    to: { type: String | Object },
    iconName: String,
    iconPosition: { type: String, default: () => 'right' },
    appearance: { type: String, default: () => 'dark' },
    disabled: Boolean,
    big: Boolean,
    grow: Boolean,
    explode: Boolean,
    align: String,
  },

  methods: {
    handleClick(clickEvent) {
      this.$emit('click', clickEvent)
      if (this.to && isExternalLink(this.to)) window.open(this.to)
      else if (this.to) this.$router.push(this.to)
    },
  },
}
</script>

<style lang="scss" scoped>
.va-at--Button {
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 0;
  outline: none;
  font-family: 'Century Gothic', Arial, Helvetica, sans-serif;
  font-size: 1.3rem;
  font-weight: bold;
  text-transform: uppercase;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background-color: $color__blue--base;
  color: white;

  &__icon {
    flex-shrink: 0;
  }

  &:hover {
    background-color: $color__blue--lighter;
  }

  &:active {
    background-color: $color__blue--light;
  }

  &.icon-left &__icon {
    margin-right: $spacing--micro--md;
  }

  &.icon-right &__icon {
    margin-left: $spacing--micro--md;
  }

  &:hover {
    cursor: pointer;
  }

  &.light {
    background-color: $color__grey--dark;
    color: $color__blue--base;

    &:hover {
      background-color: $color__grey--light;
    }

    &:active {
      background-color: white;
    }
  }

  &.reduced {
    background-color: $color__lilac--base;
    color: $color__blue--light;

    &:hover {
      background-color: $color--lilac--lighter;
    }
  }

  &.icon-left {
    flex-direction: row-reverse;
  }

  &.icon-right {
    flex-direction: row;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &.big {
    padding: $spacing--micro--xl;
  }

  &.grow {
    width: 100%;
    height: 100%;
  }

  &.explode {
    justify-content: space-between;
  }

  &.align-left {
    justify-content: flex-end;
  }

  &.align-left &.icon-left {
    justify-content: flex-start;
  }

  &.align-right {
    justify-content: flex-start;
  }

  &.align-right &.icon-left {
    justify-content: flex-end;
  }
}
</style>