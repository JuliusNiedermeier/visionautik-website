<template>
  <div class="va-pa--Home">
    <va-ps--Header
      :videoUrl="document.welcome__background_video.url"
      :heading="document.welcome__heading"
      :subHeading="document.welcome__sub_heading"
    />
    <va-ps--PressQuoteCarousel />
    <va-ps--RecommendationList :heading="document.recommendations__heading" />
    <va-ps--InANutshell
      :heading="document.in_a_nutshell__heading"
      :videoUrl="document.in_a_nutshell__video.url"
      :videoThumbnailUrl="document.in_a_nutshell__video_thumbnail.url"
      :textColumns="document.in_a_nutshell__text_columns"
    />
    <va-ps--CourseCarousel :heading="document.courses__heading" />
    <va-ps--Vision
      :heading="document.our_vision__heading"
      :text="document.our_vision__text"
      :imageUrl="document.our_vision__image.url"
    />
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

  data() {
    return {
      document: {
        welcome__background_video: { url: null },
        in_a_nutshell__video: { url: null },
        in_a_nutshell__video_thumbnail: { url: null },
        our_vision__image: { url: null },
      },
    }
  },

  async fetch() {
    const pageType = this.$cms.types.pages.index.typeName
    const query = new this.$cms.Query([
      this.$prismic.predicates.at('document.type', pageType),
    ])
    const queryResult = await query.get({ redirectOnError: true })

    this.document = queryResult.results[0].data
  },
}
</script>