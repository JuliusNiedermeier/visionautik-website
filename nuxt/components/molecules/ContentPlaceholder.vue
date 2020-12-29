<template>
  <div
    class="va-mo--ContentPlaceholder"
    :class="{
      light: appearance === 'light',
      dark: appearance === 'dark',
      centered,
    }"
  >
    <h4 class="va-mo--ContentPlaceholder__heading">{{ heading }}</h4>
    <small class="va-mo--ContentPlaceholder__body">
      {{ body }}
    </small>
    <va-at--Button
      class="va-mo--ContentPlaceholder__button"
      v-if="buttonLabel || buttonIconName"
      :iconName="buttonIconName"
      :appearance="appearance"
      @click="$emit('click')"
    >
      {{ buttonLabel }}
    </va-at--Button>
  </div>
</template>

<script>
import Button from '@/components/atoms/Button.vue'
export default {
  name: 'va-mo--ContentPlaceholder',
  components: {
    'va-at--Button': Button,
  },

  props: {
    heading: String,
    body: String,
    buttonLabel: String,
    buttonIconName: String,
    appearance: String,
    centered: Boolean,
  },
}
</script>

<style lang="scss" scoped>
.va-mo--ContentPlaceholder {
  &__heading {
    margin: 0;
    margin-bottom: $spacing__micro--md;
  }

  &__body {
    display: block;
    margin: 0;
    margin-bottom: $spacing__micro--xl;
  }

  &.centered {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  &.light {
    color: $color--grey--dark;
  }
}
</style>