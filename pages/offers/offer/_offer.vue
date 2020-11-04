<template>
  <div class="offer-page">
    <va-sidebar-layout>
      <template slot="header"
        ><va-offer-header :offerType="$api.types.repeatables.offer.typeName"
      /></template>
      <template slot="main"
        ><va-slice-content
          :sliceZones="['content__slices', 'pricing_tiers__slices']"
          :documentType="$api.types.repeatables.offer.typeName"
          :documentUID="$route.params.offer"
      /></template>

      <template slot="sidebar-top"><va-sections-overview /></template>
      <template slot="sidebar-bottom"
        ><va-offer-details /><va-offer-add-to-cart
      /></template>
    </va-sidebar-layout>
  </div>
</template>

<script>
import SidebarLayout from '@/layout/SidebarLayout/SidebarLayout'
import OfferHeader from '@/components/page-sections/_offer/OfferHeader'
import SliceContent from '@/components/elements/SliceContent'
import SectionsOverview from '@/layout/SidebarLayout/components/SectionsOverview'
import OfferDetails from '@/components/page-sections/offers/offer/OfferDetails'
import OfferAddToCart from '@/components/page-sections/offers/offer/OfferAddToCart'
export default {
  components: {
    'va-sidebar-layout': SidebarLayout,
    'va-offer-header': OfferHeader,
    'va-slice-content': SliceContent,
    'va-sections-overview': SectionsOverview,
    'va-offer-details': OfferDetails,
    'va-offer-add-to-cart': OfferAddToCart,
  },
}
</script>