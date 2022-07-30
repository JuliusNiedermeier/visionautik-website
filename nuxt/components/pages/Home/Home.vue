<template>
  <div class="va-pa--Home">
    <va-ps--Header
      :videoUrl="cms.page.welcome__background_video.url"
      :heading="cms.page.welcome__heading"
      :subHeading="cms.page.welcome__sub_heading"
    />
    <va-ps--TargetGroups />
    <va-ps--PressQuoteCarousel :pressQuotes="cms.pressQuotes" />
    <va-ps--RecommendationList
      :heading="cms.page.recommendations__heading"
      :recommendations="cms.recommendations"
    />
    <va-ps--InANutshell
      :heading="cms.page.in_a_nutshell__heading"
      :videoUrl="cms.page.in_a_nutshell__video.url"
      :videoThumbnailUrl="cms.page.in_a_nutshell__video_thumbnail.url"
      :textColumns="cms.page.in_a_nutshell__text_columns"
    />
    <va-ps--CourseCarousel
      :heading="cms.page.courses__heading"
      :courses="cms.courses"
    />

    <va-ps--Vision
      :heading="cms.page.our_vision__heading"
      :text="cms.page.our_vision__text"
      :imageUrl="cms.page.our_vision__image.url"
    />

    <va-ps--Team
      id="team"
      :heading="cms.page.team__heading"
      :coreTeamMembers="cms.teamMembers.core"
      :experts="cms.teamMembers.experts"
    />

    <va-ps--EventCarousel
      :heading="cms.page.events__heading"
      :events="cms.events"
    />

    <va-ps--Testimonials
      :heading="cms.page.testimonials__heading"
      :testimonials="cms.testimonials"
    />
  </div>
</template>

<script>
import Header from './sections/Header.vue'
import TargetGroups from './sections/TargetGroups.vue'
import PressQuoteCarousel from './sections/PressQuoteCarousel.vue'
import RecommendationList from './sections/RecommendationList.vue'
import InANutshell from './sections/InANutshell.vue'
import CourseCarousel from './sections/CourseCarousel.vue'
import Vision from './sections/Vision.vue'
import EventCarousel from './sections/EventCarousel.vue'
import Team from './sections/Team.vue'
import Testimonials from './sections/Testimonials.vue'

import formatCmsResultForProp from '@/mixins/util/formatCmsResultForProp.js'
import fetchOne from '@/mixins/usecases/fetchOne.js'
import fetchMany from '@/mixins/usecases/fetchMany.js'
// import queryCms from '@/mixins/util/queryCms.js'
import fetchRecommendations from '@/mixins/usecases/fetchRecommendations.js'
import fetchLatestCourses from '@/mixins/usecases/fetchLatestCourses.js'
import fetchLatestEvents from '@/mixins/usecases/fetchLatestEvents.js'

import { pages, repeatables } from '@/assets/js/types.js'

export default {
  name: 'va-pa--Home',
  mixins: [
    formatCmsResultForProp,
    fetchOne,
    fetchMany,
    // queryCms,
    fetchRecommendations,
    fetchLatestCourses,
    fetchLatestEvents,
  ],
  components: {
    'va-ps--Header': Header,
    'va-ps--TargetGroups': TargetGroups,
    'va-ps--PressQuoteCarousel': PressQuoteCarousel,
    'va-ps--RecommendationList': RecommendationList,
    'va-ps--InANutshell': InANutshell,
    'va-ps--CourseCarousel': CourseCarousel,
    'va-ps--Vision': Vision,
    'va-ps--EventCarousel': EventCarousel,
    'va-ps--Team': Team,
    'va-ps--Testimonials': Testimonials,
  },

  data() {
    return {
      cms: {
        page: {
          welcome__background_video: { url: null },
          in_a_nutshell__video: { url: null },
          in_a_nutshell__video_thumbnail: { url: null },
          our_vision__image: { url: null },
        },
        pressQuotes: [],
        recommendations: [],
        courses: [],
        events: [],
        teamMembers: {
          core: [],
          experts: [],
        },
        testimonials: [],
      },
    }
  },

  async fetch() {
    const page = await this.fetchOne(pages.index.typeName)
    if (!page) return

    this.$set(this.cms, 'page', page?.results[0].data)

    const pressQuotes = await this.fetchMany(repeatables.pressQuote.typeName)

    if (pressQuotes) {
      this.cms.pressQuotes = pressQuotes.results.map((pressQuote) =>
        this.formatCmsResultForProp(pressQuote)
      )
    }

    const recommendations = await this.fetchRecommendations()
    if (recommendations) {
      this.cms.recommendations = recommendations.map((recommendation) => {
        return {
          ...this.formatCmsResultForProp(recommendation),
          type: recommendation.type,
        }
      })
    }

    const courses = await this.fetchLatestCourses()
    if (courses) {
      this.cms.courses = courses.results.map((course) =>
        this.formatCmsResultForProp(course)
      )
    }

    const events = await this.fetchLatestEvents()
    if (events) {
      this.cms.events = events.results.map((event) =>
        this.formatCmsResultForProp(event)
      )
    }

    const teamMembers = await this.fetchMany(repeatables.teamMember.typeName, [
      'general__name',
      'general__occupation',
      'general__featured_image',
      'general__core',
    ])
    if (teamMembers) {
      this.cms.teamMembers.core = teamMembers.results
        .filter((result) => result.data.general__core)
        .map((result) => this.formatCmsResultForProp(result))
      this.cms.teamMembers.experts = teamMembers.results
        .filter((result) => !result.data.general__core)
        .map((result) => this.formatCmsResultForProp(result))
    }

    const testimonials = await this.fetchMany(repeatables.testimonial.typeName)
    if (testimonials) {
      this.cms.testimonials = testimonials.results.map((result) =>
        this.formatCmsResultForProp(result)
      )
    }
  },
}
</script>
