<template>
  <div class="va-mo--ContentPlaceholder">
    <h3 class="va-mo--ContentPlaceholder__heading">{{ heading }}</h3>
    <small class="va-mo--ContentPlaceholder__body">
      {{ body }}
    </small>
    <button
      class="va-mo--ContentPlaceholder__button"
      v-if="buttonLabel || buttonIconName"
      @click="$emit('click')"
    >
      <span>{{ buttonLabel }}</span
      ><va-at--Icon v-if="buttonIconName" :name="buttonIconName" />
    </button>
  </div>
</template>

<script>
import Icon from '@/components/atoms/Icon.vue'
export default {
  name: 'va-mo--ContentPlaceholder',
  components: {
    'va-at--Icon': Icon,
  },

  props: {
    heading: String,
    body: String,
    buttonLabel: String,
    buttonIconName: String,
  },
}
</script>

<style lang="scss" scoped>
.va-mo--ContentPlaceholder {
  margin: 0 $spacing__micro--xl;

  &__body {
    display: block;
    margin: $spacing__micro--md 0;
  }
}
</style>