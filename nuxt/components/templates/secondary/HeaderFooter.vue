<template>
  <div class="va-tp--HeaderFooter">
    <va-or--Header />
    <slot />
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

  > :nth-child(2) {
    @include page-margin;
  }
}
</style>