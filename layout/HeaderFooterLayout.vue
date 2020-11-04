<template>
  <div class="static-layout-wrapper">
    <va-header />
    <slot />
    <va-footer />
  </div>
</template>

<script>
import Header from '@/components/layout-parts/header/Header'
import Footer from '@/components/layout-parts/footer/Footer'
export default {
  components: {
    'va-header': Header,
    'va-footer': Footer,
  },
}
</script>

<style lang="scss" scoped>
.static-layout-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;

  > :nth-child(2) {
    @include page-margin;
  }
}
</style>