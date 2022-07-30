<template>
  <div class="va-tp--default">
    <va-tp--HeaderFooter>
      <!-- <Nuxt
        class="va-tp--default__page-content"
        keep-alive
        :keep-alive-props="{ max: 5 }"
      />-->

      <Nuxt class="va-tp--default__page-content" />
    </va-tp--HeaderFooter>

    <div
      class="va-tp--default__backdrop"
      :class="{ active: $store.state.modalBackdrop.active }"
      :style="{ 'z-index': $store.state.modalBackdrop.zIndex }"
    />
  </div>
</template>

<script>
import HeaderFooter from '@/components/templates/secondary/HeaderFooter'
export default {
  name: 'va-tp--default',
  components: { 'va-tp--HeaderFooter': HeaderFooter },

  // For better performance with i18n SEO
  head() {
    return this.$nuxtI18nSeo()
  },
}
</script>

//
<style lang="scss" scoped>
.va-tp--default__backdrop {
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
