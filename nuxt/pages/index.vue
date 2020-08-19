<template>
  <div class="home-page">
    <welcome-section />
    <press-quote-section />
    <featured-section />
    <in-a-nutshell-section />
    <courses-section />
  </div>
</template>

<script>
import WelcomeSection from '@/components/pages/index/WelcomeSection'
import PressQuoteSection from '@/components/pages/index/PressQuoteSection'
import FeaturedSection from '@/components/pages/index/FeaturedSection'
import InANutshell from '@/components/pages/index/InANutshell'
import CoursesSection from '@/components/pages/index/CoursesSection'
export default {
  name: 'home-page',
  components: {
    'welcome-section': WelcomeSection,
    'press-quote-section': PressQuoteSection,
    'featured-section': FeaturedSection,
    'in-a-nutshell-section': InANutshell,
    'courses-section': CoursesSection,
  },
}
</script>