<template>
  <div class="home-page">
    <va-ps--Header />
    <press-quote-section />
    <featured-section />
    <in-a-nutshell-section />
    <courses-section />
    <our-vision />
  </div>
</template>

<script>
import Header from './sections/Header'
import PressQuotesCarousel from './sections/PressQuotesCarousel'
import Recommendations from './sections/Recommendations'
import InANutshell from './sections/InANutshell'
import CoursesCarousel from './sections/CoursesCarousel'
import Vision from './sections/Vision'
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