<template>
  <va-sidebar-layout>
    <template slot="header">
      <div class="offer-page__header">
        <img
          class="offer-page__header__image"
          :src="offer.general__featured_image.url"
          v-if="offer.general__featured_image"
        />
        <div class="offer-page__header__overlay">
          <div class="offer-page__header__overlay__body">
            <h2 class="offer-page__header__overlay__body__heading">
              {{ offer.general__heading }}
            </h2>
            <i class="offer-page__header__overlay__body__excerpt">{{
              offer.general__excerpt
            }}</i>
          </div>
        </div>
      </div>
    </template>
    <div class="offer-page">
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
  padding: 2rem 0;

  &__header {
    @include fill-screen-width;
    height: 40rem;
    position: relative;

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &__overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      @include background-gradient('dark-transparent');
      color: white;

      &__body {
        height: 100%;
        @include page-margin;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
      }
    }
  }
}
</style>