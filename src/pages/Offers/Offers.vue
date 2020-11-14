<template>
  <div class="offers-page">
    <va-ps--Filter />
    <va-ps--Results />
  </div>
</template>

<script>
import Filter from './sections/Filter'
import Results from './sections/Results'
export default {
  name: 'va-pg--Offers',
  components: {
    'va-ps--Filter': Filter,
    'va-ps--Results': Results,
  },
}
</script>