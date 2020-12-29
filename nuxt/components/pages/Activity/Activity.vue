<template>
  <div class="va-pa--Activity">
    <!-- TODO: Hide AddToCart when category is event. Instead display 'Purchase at Eventbrite' button -->

    <va-mo--PageHeader
      sidebarPadding
      :imageUrl="document.general__featured_image.url"
    >
      <h2>{{ document.general__heading }}</h2>
      <i>{{ document.general__excerpt }}</i>
    </va-mo--PageHeader>

    <va-te--Sidebar>
      <template slot="main"
        ><va-or--SliceContent
          :slices="[...document.content__slices, ...document.pricing__slices]"
      /></template>
      <template slot="sidebar">
        <va-at--Sidebar>
          <template slot="top">
            <va-mo--SectionAnchorList />
          </template>
          <template slot="bottom"
            ><va-ps--ActivityDetails
              :startTime="document.general__start_time"
              :closingTime="document.general__closing_time"
              :venueLabel="document.general__venue"
              :venueUrl="document.general__venue_link.url"
              :maximumAttendance="document.general__maximum_attendance" />
            <va-mo--AddToCart
              :product="product"
              :customFields="[customPricingPlanField]"
          /></template>
        </va-at--Sidebar>
      </template>
    </va-te--Sidebar>
  </div>
</template>

<script>
import { repeatables } from '@/assets/js/types.js'
import HeaderAndSidebar from '@/components/templates/tertiary/HeaderAndSidebar'
import SidebarTemplate from '@/components/templates/tertiary/Sidebar'
import SliceContent from '@/components/organisms/SliceContent.vue'
import Sidebar from '@/components/atoms/Sidebar.vue'
import SectionAnchorList from '@/components/molecules/SectionAnchorList'
import ActivityDetails from '@/components/molecules/ActivityDetails.vue'
// import ActivityAddToCart from './sections/ActivityAddToCart.vue'
import AddToCart from '@/components/molecules/AddToCart.vue'
import PageHeader from '@/components/molecules/PageHeader'
import parseCurrentPriceFromPricingPlanSlice from '@/assets/js/util/parseCurrentPriceFromPricingPlanSlice.js'
import formatCmsResultForProp from '@/assets/js/util/formatCmsResultForProp.js'
import queryCms from '@/mixins/util/queryCms.js'
import fetchOneByUid from '@/mixins/usecases/fetchOneByUid.js'
export default {
  name: 'va-pa--Activity',
  mixins: [queryCms, fetchOneByUid],
  components: {
    'va-te--HeaderAndSidebar': HeaderAndSidebar,
    'va-te--Sidebar': SidebarTemplate,
    'va-or--SliceContent': SliceContent,
    'va-at--Sidebar': Sidebar,
    'va-mo--SectionAnchorList': SectionAnchorList,
    'va-ps--ActivityDetails': ActivityDetails,
    'va-mo--AddToCart': AddToCart,
    'va-mo--PageHeader': PageHeader,
  },

  data() {
    return {
      document: {
        general__featured_image: { url: null },
        general__venue_link: { url: null },
        content__slices: [],
        pricing__slices: [],
      },
    }
  },

  async fetch() {
    const response = this.fetchOneByUid(
      repeatables.offer.typeName,
      this.$route.params.uid
    )
    if (!response) return
    this.document = formatCmsResultForProp(response.results[0])

    const trainerSectionSliceIndex = this.document.content__slices.findIndex(
      (slice) => slice.slice_type === 'trainer_section'
    )

    if (trainerSectionSliceIndex !== -1) {
      const trainerIDs = this.document.trainers__list.map(
        (trainerRef) => trainerRef.trainer.id
      )

      const trainerResponse = await this.queryCms([
        this.$prismic.predicates.any('document.id', trainerIDs),
      ])

      if (!trainerResponse) return
      this.$set(this.document.content__slices, trainerSectionSliceIndex, {
        ...this.document.content__slices[trainerSectionSliceIndex],
        trainers: trainerResponse.results.map(formatCmsResultForProp),
      })
    }
  },

  computed: {
    product() {
      const product = {
        id: this.document.uid,
        name: this.document.general__heading,
        description: this.document.general__excerpt,
        price: 0,
        category: this.document.general__category,
      }
      if (product.category === 'event') {
        product.sellerLink = this.document.general__third_party_seller_link
      }
      return product
    },

    customPricingPlanField() {
      const options = this.document.pricing__slices.map((pricingPlanSlice) => {
        return {
          label: pricingPlanSlice.primary.heading,
          id: pricingPlanSlice.primary.id,
          priceDifference: parseCurrentPriceFromPricingPlanSlice(
            pricingPlanSlice
          ),
        }
      })
      return {
        label: this.$t(
          `types.${repeatables.activity.typeName}.choosePricingPlan`
        ),
        queryKey: 'ppid',
        required: true,
        options,
      }
    },
  },
}
</script>