<template>
  <div class="offers-page">
    <filter-section />
    <results-section />
  </div>
</template>

<script>
import FilterSection from '@/components/page-sections/offers/FilterSection'
import ResultsSection from '@/components/page-sections/offers/ResultsSection'
export default {
  name: 'home-page',
  components: {
    'filter-section': FilterSection,
    'results-section': ResultsSection,
  },
}
</script>