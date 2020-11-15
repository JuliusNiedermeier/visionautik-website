<template>
  <div class="va-sl--Text">
    <prismic-rich-text :field="slice.primary.text" />
  </div>
</template>

<script>
export default {
  name: 'va-sl--Text',
  props: {
    slice: Object,
  },
}
</script>

<style>
</style>