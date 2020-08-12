<template>
  <div class="test-page" v-if="!$fetchState.pending">
    <div class="test-page__welcome-section">
      <h1>{{prismicDocument.welcome_section_heading}}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "test-page",

  data() {
    return {
      prismicDocument: null
    }
  },

  async fetch() {
    this.prismicDocument = (await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'homepage'), {lang: this.localeIso})).results[0].data
  }
}
</script>