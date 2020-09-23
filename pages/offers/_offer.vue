<template>
  <va-sidebar-layout>
    <template slot="header">
      <div class="offer-page__header">
        <img :src="offer.general__featured_image.url" v-if="offer.general__featured_image" />
      </div>
    </template>
    <div class="offer-page">
      {{courseSidebarOptions.selectedPricingTier}}
      <h2>{{offer.general__heading}}</h2>
      <i>{{offer.general__excerpt}}</i>
      <va-slice-section />
    </div>
    <template slot="sidebar">
      <va-sidebar-section />
    </template>
  </va-sidebar-layout>
</template>

<script>
import SidebarLayout from '@/components/SidebarLayout'
import Sidebar from '@/components/elements/Sidebar'
import SidebarSection from '@/components/page-sections/_offer/sidebarSection/SidebarSection'
import SliceSection from '@/components/page-sections/_offer/SliceSection'
export default {
  components: {
    'va-sidebar-layout': SidebarLayout,
    'va-sidebar': Sidebar,
    'va-slice-section': SliceSection,
    'va-sidebar-section': SidebarSection,
  },
  data() {
    return {
      offer: {},
      courseSidebarOptions: {
        selectedPricingTier: null,
      },
    }
  },

  validate({ params }) {
    if (
      params.type === 'course' ||
      params.type === 'event' ||
      params.type === 'product'
    ) {
      return true
    }
  },

  async fetch() {
    const type = this.$api.types.repeatables[this.$route.params.type]
    const query = new this.$api.Query(
      [this.$prismic.predicates.at(`my.${type}.uid`, this.$route.params.offer)],
      {
        fetch: [
          type + '.general__featured_image',
          type + '.general__heading',
          type + '.general__excerpt',
        ],
      }
    )

    const apiResponse = await query.get()

    if (!apiResponse) return
    this.offer = apiResponse.results[0].data
  },
}
</script>

<style lang="scss" scoped>
.offer-page {
  &__header {
    @include fill-screen-width;
    height: 40rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>