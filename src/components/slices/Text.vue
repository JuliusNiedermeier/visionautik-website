<template>
  <div class="text-slice">
    <prismic-rich-text :field="slice.primary.text" />
  </div>
</template>

<script>
export default {
  props: {
    slice: Object,
  },
}
</script>

<style>
</style>