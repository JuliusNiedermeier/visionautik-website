<template>
  <div class="va-pa--Activity">
    <va-te--HeaderAndSidebar>
      <template slot="header-image">
        <va-ps--ActivityHeaderImage
          :type="$api.types.repeatables.offer.typeName"
        />
      </template>
      <template slot="header-body">
        <va-ps--ActivityHeaderBody
          :type="$api.types.repeatables.offer.typeName"
        />
      </template>
      <template slot="main"
        ><va-or--SliceContent
          :sliceZones="['content__slices', 'pricing_tiers__slices']"
          :documentType="$api.types.repeatables.offer.typeName"
          :documentUID="$route.params.offer"
      /></template>

      <template slot="sidebar-top"><va-mo--SectionAnchorList /></template>
      <template slot="sidebar-bottom"
        ><va-ps--ActivityDetails /><va-ps--ActivityAddToCart
      /></template>
    </va-te--HeaderAndSidebar>
  </div>
</template>

<script>
import HeaderAndSidebar from '@/components/templates/tertiary/HeaderAndSidebar'
import SliceContent from '@/components/organisms/SliceContent.vue'
import SectionAnchorList from '@/components/molecules/SectionAnchorList'
import ActivityDetails from './sections/ActivityDetails.vue'
import ActivityAddToCart from './sections/ActivityAddToCart.vue'
import ActivityHeaderBody from './sections/ActivityHeaderBody'
import ActivityHeaderImage from './sections/ActivityHeaderImage'
export default {
  name: 'va-pa--Activity',
  components: {
    'va-te--HeaderAndSidebar': HeaderAndSidebar,
    'va-or--SliceContent': SliceContent,
    'va-mo--SectionAnchorList': SectionAnchorList,
    'va-ps--ActivityDetails': ActivityDetails,
    'va-ps--ActivityAddToCart': ActivityAddToCart,
    'va-ps--ActivityHeaderBody': ActivityHeaderBody,
    'va-ps--ActivityHeaderImage': ActivityHeaderImage,
  },
}
</script>