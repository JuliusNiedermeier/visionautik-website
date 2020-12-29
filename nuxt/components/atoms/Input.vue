<template>
  <div
    class="va-at--Input"
    :class="{
      [`icon-${iconPosition || 'left'}`]: iconName,
      light: appearance === 'light',
      big: big,
      grow: grow,
    }"
  >
    <component
      :is="computeComponent(type)"
      class="va-at--Input__input"
      :placeholder="placeholder"
      :type="type || 'text'"
      :required="required"
      :rows="rows"
      :cols="cols"
      :name="name"
    />
    <va-at--Icon class="va-at--Input__icon" v-if="iconName" :name="iconName" />
  </div>
</template>

<script>
import Icon from '@/components/atoms/Icon.vue'
export default {
  name: 'va-at--Input',
  components: { 'va-at--Icon': Icon },
  props: {
    placeholder: String,
    type: String,
    required: Boolean,
    rows: Number,
    cols: Number,
    name: String,

    iconName: String,
    iconPosition: String,
    appearance: String,
    big: Boolean,
    grow: Boolean,
  },

  methods: {
    computeComponent(type) {
      return type === 'textarea' ? 'textarea' : 'input'
    },
  },
}
</script>

<style lang="scss" scoped>
.va-at--Input {
  position: relative;
  display: inline-block;

  &__input {
    background-color: $color--blue--lighter;
    border: none;
    color: $color--grey--dark;
    outline: none;
    padding: $spacing--micro--md $spacing--micro--lg;
    font-family: 'Century Gothic', Arial, Helvetica, sans-serif;
    font-size: $font--size--md;

    resize: vertical;

    &::placeholder {
      color: $color--lilac--dark;
    }

    &:hover {
      background-color: $color--blue--light;
    }

    &:focus {
      background-color: $color--blue--light;
    }
  }

  &__icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: $color--lilac--base;
    pointer-events: none;
  }

  &.light &__input {
    background-color: $color--grey--light;
    border: 1px solid $color--lilac--base;
    color: $color--blue--base;

    &::placeholder {
      color: $color--lilac--dark;
    }

    &:hover {
      background-color: $color--grey--dark;
    }

    &:focus {
      background-color: $color--lilac--base;
    }
  }

  &.light &__icon {
    color: $color--blue--light;
  }

  &.big &__input {
    padding: $spacing__micro--lg;
  }

  &.grow {
    width: 100%;
  }

  &.grow &__input {
    width: 100%;
  }

  &.icon-left &__input {
    padding-left: $spacing__macro--xs;
  }

  &.icon-left &__icon {
    left: $spacing--micro--xl;
  }

  &.icon-right &__input {
    padding-right: $spacing__macro--xs;
  }

  &.icon-right &__icon {
    right: $spacing--micro--xl;
  }
}
</style>