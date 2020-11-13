<template>
  <main class="error-page">
    <h1>🔎{{ error.statusCode }}</h1>
    <h3>{{ error.message }}</h3>
    <nuxt-link to="/">Back to Home</nuxt-link>
  </main>
</template>

<script>
export default {
  props: ['error'],
}
</script>

<style lang="scss" scoped>
.error-page {
  margin-bottom: $spacing__macro--xs !important;
}
</style>