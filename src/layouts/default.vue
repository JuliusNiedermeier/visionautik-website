<template>
  <div class="default-layout">
    <va-header-footer-layout>
      <!-- <Nuxt class="default-layout__page-content" keep-alive :keep-alive-props="{max: 5}" /> -->
      <Nuxt class="default-layout__page-content" />
    </va-header-footer-layout>
    <div
      class="default-layout__backdrop"
      :class="{ active: $store.state.modalBackdrop.active }"
      :style="{ 'z-index': $store.state.modalBackdrop.zIndex }"
    />
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

<style lang="scss" scoped>
.default-layout__backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: transparent;
  transition: background-color $duration--fast ease;
  pointer-events: none;

  &.active {
    background-color: transparentize($color: black, $amount: 0.25);
  }
}
</style>