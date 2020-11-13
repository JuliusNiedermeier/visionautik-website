<template>
  <div class="home-page">
    <welcome-section />
    <press-quote-section />
    <featured-section />
    <in-a-nutshell-section />
    <courses-section />
    <our-vision />
  </div>
</template>

<script>
import WelcomeSection from '@/components/page-sections/index/WelcomeSection'
import PressQuoteSection from '@/components/page-sections/index/PressQuoteSection'
import FeaturedSection from '@/components/page-sections/index/FeaturedSection'
import InANutshell from '@/components/page-sections/index/InANutshell'
import CoursesSection from '@/components/page-sections/index/CoursesSection'
import OurVision from '@/components/page-sections/index/OurVision'
export default {
  name: 'home-page',
  components: {
    'welcome-section': WelcomeSection,
    'press-quote-section': PressQuoteSection,
    'featured-section': FeaturedSection,
    'in-a-nutshell-section': InANutshell,
    'courses-section': CoursesSection,
    'our-vision': OurVision,
  },
}
</script>