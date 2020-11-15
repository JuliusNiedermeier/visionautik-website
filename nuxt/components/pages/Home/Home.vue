<template>
  <div class="va-pa--Home">
    <va-ps--Header />
    <va-ps--PressQuoteCarousel />
    <va-ps--RecommendationList />
    <va-ps--InANutshell />
    <va-ps--CourseCarousel />
    <va-ps--Vision />
  </div>
</template>

<script>
import Header from './sections/Header.vue'
import PressQuoteCarousel from './sections/PressQuoteCarousel.vue'
import RecommendationList from './sections/RecommendationList.vue'
import InANutshell from './sections/InANutshell.vue'
import CourseCarousel from './sections/CourseCarousel.vue'
import Vision from './sections/Vision.vue'
export default {
  name: 'va-pa--Home',
  components: {
    'va-ps--Header': Header,
    'va-ps--PressQuoteCarousel': PressQuoteCarousel,
    'va-ps--RecommendationList': RecommendationList,
    'va-ps--InANutshell': InANutshell,
    'va-ps--CourseCarousel': CourseCarousel,
    'va-ps--Vision': Vision,
  },
}
</script>