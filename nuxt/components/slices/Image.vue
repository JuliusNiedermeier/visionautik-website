<template>
  <prismic-image :field="slice.primary.image" class="va-sl--Image" />
</template>

<script>
export default {
  name: 'va-sl--Image',
  props: ['slice'],
}
</script>

<style scoped>
.va-sl--Image {
  width: 100%;
}
</style>