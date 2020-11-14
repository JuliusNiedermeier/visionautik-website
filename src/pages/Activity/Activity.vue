<template>
  <div class="offer-page">
    <va-sidebar-layout>
      <template slot="header-image">
        <va-offer-header-image :type="$api.types.repeatables.offer.typeName" />
      </template>
      <template slot="header-body">
        <va-offer-header-body :type="$api.types.repeatables.offer.typeName" />
      </template>
      <template slot="main"
        ><va-slice-content
          :sliceZones="['content__slices', 'pricing_tiers__slices']"
          :documentType="$api.types.repeatables.offer.typeName"
          :documentUID="$route.params.offer"
      /></template>

      <template slot="sidebar-top"><va-sections-overview /></template>
      <template slot="sidebar-bottom"
        ><va-activity-details /><va-activity-add-to-cart
      /></template>
    </va-sidebar-layout>
  </div>
</template>

<script>
import SidebarLayout from '@/layout/SidebarLayout/SidebarLayout'
import SliceContent from '@/components/elements/SliceContent'
import SectionsOverview from '@/layout/SidebarLayout/components/SectionsOverview'
import ActivityDetails from './components/ActivityDetails'
import ActivityAddToCart from './components/ActivityAddToCart'
import OfferHeaderBody from '@/components/layout-parts/OfferHeaderBody'
import OfferHeaderImage from '@/components/layout-parts/OfferHeaderImage'
export default {
  components: {
    'va-sidebar-layout': SidebarLayout,
    'va-slice-content': SliceContent,
    'va-sections-overview': SectionsOverview,
    'va-activity-details': ActivityDetails,
    'va-activity-add-to-cart': ActivityAddToCart,
    'va-offer-header-body': OfferHeaderBody,
    'va-offer-header-image': OfferHeaderImage,
  },
}
</script>