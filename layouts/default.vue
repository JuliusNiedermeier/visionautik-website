<template>
  <div class="default-layout">
    <va-header />
    <!-- <Nuxt class="default-layout__page-content" keep-alive :keep-alive-props="{max: 5}" /> -->
    <Nuxt class="default-layout__page-content" />
    <va-footer />
  </div>
</template>

<script>
import Header from '@/components/layout-parts/header/Header'
import Footer from '@/components/layout-parts/footer/Footer'
export default {
  name: 'default-layout',

  // For better performance with i18n SEO
  head() {
    return this.$nuxtI18nSeo()
  },

  components: {
    'va-header': Header,
    'va-footer': Footer,
  },
}
</script>

<style lang="scss" scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  &__page-content {
    @include page-margin;
  }
}
</style>