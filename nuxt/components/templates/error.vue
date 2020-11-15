<template>
  <main class="va-tp--error">
    <h1>🔎{{ error.statusCode }}</h1>
    <h3>{{ error.message }}</h3>
    <nuxt-link to="/">Back to Home</nuxt-link>
  </main>
</template>

<script>
export default {
  name: 'va-tp--error',
  props: ['error'],
}
</script>

<style lang="scss" scoped>
.va-tp--error {
  margin-bottom: $spacing__macro--xs !important;
}
</style>