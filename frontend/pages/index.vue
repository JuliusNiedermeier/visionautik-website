<template>
  <div class="home-page">
    <welcome-section
      :videoUrl="prismicDocument.welcome_section_background_video.url"
      :heading="prismicDocument.welcome_section_heading"
      :subHeading="prismicDocument.welcome_section_sub_heading"
    />
    <press-quote-section />
    <featured-section :heading="prismicDocument.featured_section_heading" />
    <in-a-nutshell-section :heading="prismicDocument.in_a_nutshell_section_heading" />
  </div>
</template>

<script>
import WelcomeSection from '@/components/pages/index/WelcomeSection'
import PressQuoteSection from '@/components/pages/index/PressQuoteSection'
import FeaturedSection from '@/components/pages/index/FeaturedSection'
import InANutshell from '@/components/pages/index/InANutshell'
export default {
  name: 'home-page',
  components: {
    'welcome-section': WelcomeSection,
    'press-quote-section': PressQuoteSection,
    'featured-section': FeaturedSection,
    'in-a-nutshell-section': InANutshell,
  },

  data() {
    return {
      prismicDocument: null,
    }
  },

  async fetch() {
    this.prismicDocument = (
      await this.$prismic.api.query(
        this.$prismic.predicates.at('document.type', 'homepage'),
        { lang: this.localeIso }
      )
    ).results[0].data
  },
}
</script>