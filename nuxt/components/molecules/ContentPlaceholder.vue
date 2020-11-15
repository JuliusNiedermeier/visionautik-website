<template>
  <div class="va-mo--ContentPlaceholder">
    <h3>{{ heading }}</h3>
    <small>
      {{ body }}
    </small>
    <button v-if="buttonLabel || buttonIconName" @click="$emit('click')">
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

  small {
    display: block;
    margin: $spacing__micro--md 0;
  }
}
</style>