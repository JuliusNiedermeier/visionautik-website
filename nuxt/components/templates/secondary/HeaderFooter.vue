<template>
  <div class="va-tp--HeaderFooter">
    <va-or--Header />
    <div class="va-tp--HeaderFooter__page">
      <slot />
    </div>
    <va-or--Footer />
  </div>
</template>

<script>
import Header from '@/components/organisms/Header'
import Footer from '@/components/organisms/Footer'
export default {
  name: 'va-tp--HeaderFooter',
  components: {
    'va-or--Header': Header,
    'va-or--Footer': Footer,
  },
}
</script>

<style lang="scss" scoped>
.va-tp--HeaderFooter {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;

  &__page {
    @include page-margin;
  }
}
</style>