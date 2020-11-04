<template>
  <div class="carousel-placeholder-content-component">
    <h3>{{ heading }}</h3>
    <small>
      {{ body }}
    </small>
    <button v-if="buttonLabel || buttonIconName" @click="$emit('click')">
      <span>{{ buttonLabel }}</span
      ><va-icon v-if="buttonIconName" :name="buttonIconName" />
    </button>
  </div>
</template>

<script>
import Icon from '@/components/elements/Icon'
export default {
  components: {
    'va-icon': Icon,
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
.carousel-placeholder-content-component {
  margin: 0 2rem;

  small {
    display: block;
    margin: 1rem 0;
  }
}
</style>