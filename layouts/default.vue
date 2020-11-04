<template>
  <div class="default-layout">
    <va-header-footer-layout>
      <!-- <Nuxt class="default-layout__page-content" keep-alive :keep-alive-props="{max: 5}" /> -->
      <Nuxt class="default-layout__page-content" />
    </va-header-footer-layout>
  </div>
</template>

<script>
import HeaderFooterLayout from '@/layout/HeaderFooterLayout'
export default {
  components: { 'va-header-footer-layout': HeaderFooterLayout },

  name: 'default-layout',

  // For better performance with i18n SEO
  head() {
    return this.$nuxtI18nSeo()
  },
}
</script>