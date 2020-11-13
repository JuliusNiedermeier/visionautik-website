<template>
  <prismic-image :field="slice.primary.image" class="image-slice" />
</template>

<script>
export default {
  props: ['slice'],
}
</script>

<style scoped>
.image-slice {
  width: 100%;
}
</style>