<template>
  <div class="home-page">
    <va-ps--Header />
    <va-ps--PressQuotesCarousel />
    <va-ps--Recommendations />
    <va-ps--InANutshell />
    <va-ps--CoursesCarousel />
    <va-ps--Vision />
  </div>
</template>

<script lang="ts">
import Header from './sections/Header.vue'
import PressQuotesCarousel from './sections/PressQuotesCarousel.vue'
import Recommendations from './sections/Recommendations.vue'
import InANutshell from './sections/InANutshell.vue'
import CoursesCarousel from './sections/CoursesCarousel.vue'
import Vision from './sections/Vision.vue'
export default {
  name: 'va-pg--Home',
  components: {
    'va-ps--Header': Header,
    'va-ps--PressQuotesCarousel': PressQuotesCarousel,
    'va-ps--Recommendations': Recommendations,
    'va-ps--InANutshell': InANutshell,
    'va-ps--CoursesCarousel': CoursesCarousel,
    'va-ps--Vision': Vision,
  },
}
</script>