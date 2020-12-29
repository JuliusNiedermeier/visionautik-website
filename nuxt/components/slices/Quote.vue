<template>
  <div class="va-sl--Quote">
    <va-at--Icon class="va-sl--Quote__icon" name="quote" size="5rem" />
    <prismic-rich-text
      class="va-sl--Quote__quote"
      :field="slice.primary.quote"
    />
    <small class="va-sl--Quote__source">
      <b>{{ slice.primary.source }}</b>
    </small>
  </div>
</template>

<script>
import Icon from '@/components/atoms/Icon.vue'
export default {
  name: 'va-sl--Quote',
  components: { 'va-at--Icon': Icon },
  props: {
    slice: Object,
  },
}
</script>

<style lang="scss" scoped>
.va-sl--Quote {
  &__icon {
    color: $color--red--base;
  }

  &__quote {
    color: $color--blue--base;
  }

  &__source {
    color: $color--blue--base;
  }
}
</style>