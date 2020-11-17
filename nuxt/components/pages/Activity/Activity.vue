<template>
  <div class="va-pa--Activity">
    <va-te--HeaderAndSidebar>
      <template slot="header">
        <va-mo--PageHeader :imageUrl="document.general__featured_image.url"
          ><h2>{{ document.general__heading }}</h2>
          <i>{{ document.general__excerpt }}</i></va-mo--PageHeader
        >
      </template>
      <template slot="main"
        ><va-or--SliceContent
          :slices="[
            ...document.content__slices,
            ...document.pricing_tiers__slices,
          ]"
      /></template>

      <template slot="sidebar-top"><va-mo--SectionAnchorList /></template>
      <template slot="sidebar-bottom"
        ><va-ps--ActivityDetails
          :startTime="document.general__start_time"
          :closingTime="document.general__closing_time"
          :venueLabel="document.general__venue"
          :venueUrl="document.general__venue_link.url"
          :maximumAttendance="document.general__maximum_attendance"
          :typeCategory="document.general__category"
        />
        <va-ps--ActivityAddToCart
          :pricingTierSlices="document.pricing_tiers__slices"
          :heading="document.general__heading"
          :excerpt="document.general__excerpt"
          :featuredImage="document.general__featured_image.url"
        />
      </template>
    </va-te--HeaderAndSidebar>
  </div>
</template>

<script>
import HeaderAndSidebar from '@/components/templates/tertiary/HeaderAndSidebar'
import SliceContent from '@/components/organisms/SliceContent.vue'
import SectionAnchorList from '@/components/molecules/SectionAnchorList'
import ActivityDetails from './sections/ActivityDetails.vue'
import ActivityAddToCart from './sections/ActivityAddToCart.vue'
import PageHeader from '@/components/molecules/PageHeader'
export default {
  name: 'va-pa--Activity',
  components: {
    'va-te--HeaderAndSidebar': HeaderAndSidebar,
    'va-or--SliceContent': SliceContent,
    'va-mo--SectionAnchorList': SectionAnchorList,
    'va-ps--ActivityDetails': ActivityDetails,
    'va-ps--ActivityAddToCart': ActivityAddToCart,
    'va-mo--PageHeader': PageHeader,
  },

  data() {
    return {
      document: {
        general__featured_image: { url: null },
        general__venue_link: { url: null },
        content__slices: [],
        pricing_tiers__slices: [],
      },
    }
  },

  async fetch() {
    const type = this.$cms.types.repeatables.offer.typeName

    const query = new this.$cms.Query([
      this.$prismic.predicates.at(`my.${type}.uid`, this.$route.params.uid),
    ])

    const cmsResponse = await query.get({ redirectOnError: true })

    if (!cmsResponse) return
    this.document = cmsResponse.results[0].data
  },
}
</script>