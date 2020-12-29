<template>
  <div class="va-pa--About">
    <va-mo--PageHeader :imageUrl="cms.page.header__background_image.url">
      <h2>{{ cms.page.header__heading }}</h2>
    </va-mo--PageHeader>
    <va-ps--VisionAndTeam
      :visionHeading="cms.page.our_vision__heading"
      :visionSlices="cms.page.our_vision__slices"
      :teamHeading="cms.page.team__heading"
      :teamExpertsHeading="cms.page.team__experts_heading"
      :teamCoreTeamMembers="cms.teamMembers.core"
      :teamExperts="cms.teamMembers.experts"
    />
    <va-ps--Story
      :heading="cms.page.our_story__heading"
      :subHeading="cms.page.our_story__sub_heading"
      :text="cms.page.our_story__text"
    />
    <va-ps--Partner
      :heading="cms.page.partners_and_memberships__heading"
      :text="cms.page.partners_and_memberships__text"
      :membershipsHeading="
        cms.page.partners_and_memberships__memberships_heading
      "
      :memberships="cms.organizations.memberships"
      :partnersHeading="cms.page.partners_and_memberships__partnerships_heading"
      :partners="cms.organizations.partners"
    />
    <va-ps--Contact
      :heading="cms.page.contact__heading"
      :imageUrl="cms.page.contact__image.url"
    />
  </div>
</template>

<script>
import PageHeader from '@/components/molecules/PageHeader.vue'
import VisionAndTeam from './sections/VisionAndTeam.vue'
import Story from './sections/Story.vue'
import Partner from './sections/Partner.vue'
import Contact from './sections/Contact.vue'

import { pages, repeatables } from '@/assets/js/types.js'
import fetchOne from '@/mixins/usecases/fetchOne.js'
import fetchMany from '@/mixins/usecases/fetchMany.js'
import formatCmsResultForProp from '@/mixins/util/formatCmsResultForProp.js'

export default {
  name: 'va-pa--About',
  mixins: [fetchOne, formatCmsResultForProp, fetchMany],

  components: {
    'va-mo--PageHeader': PageHeader,
    'va-ps--VisionAndTeam': VisionAndTeam,
    'va-ps--Story': Story,
    'va-ps--Partner': Partner,
    'va-ps--Contact': Contact,
  },

  data() {
    return {
      cms: {
        page: {
          header__background_image: { url: null },
          contact__image: { url: null },
        },
        teamMembers: {
          core: [],
          experts: [],
        },
        organizations: {
          partners: [],
          memberships: [],
        },
        pressArticles: [],
      },
    }
  },

  async fetch() {
    const page = await this.fetchOne(pages.about.typeName)
    if (!page) return
    this.$set(this.cms, 'page', page?.results[0].data)

    const teamMembers = await this.fetchMany(repeatables.teamMember.typeName, [
      'general__name',
      'general__featured_image',
      'general__occupation',
      'general__excerpt',
      'general__core',
    ])
    if (teamMembers) {
      this.cms.teamMembers.core = teamMembers.results
        .filter((result) => result.data.general__core)
        .map((result) => this.formatCmsResultForProp(result))
      this.cms.teamMembers.experts = teamMembers.results
        .filter((result) => result.data.general__core === false)
        .map((result) => this.formatCmsResultForProp(result))
    }

    const organizations = await this.fetchMany(
      repeatables.organization.typeName
    )
    if (organizations) {
      this.cms.organizations.partners = organizations?.results
        .filter((result) => result.data.general__category === 'partner')
        .map((result) => this.formatCmsResultForProp(result))
      this.cms.organizations.memberships = organizations?.results
        .filter((result) => result.data.general__category === 'membership')
        .map((result) => this.formatCmsResultForProp(result))
    }

    const pressArticles = await this.fetchMany(
      repeatables.pressArticle.typeName
    )
    if (pressArticles) {
      this.cms.pressArticles = pressArticles.results.map((result) =>
        this.formatCmsResultForProp(result)
      )
    }
  },
}
</script>