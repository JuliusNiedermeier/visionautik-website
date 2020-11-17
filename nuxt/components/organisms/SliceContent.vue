<template>
  <div class="va-or--SliceContent" data-component-name="sliceContent">
    <div
      v-for="(slice, index) of slices"
      :key="index"
      class="va-or--SliceContent__slice"
      :class="{ hidden: slice.slice_type === 'section_anchor' }"
      :data-slice-type="slice.slice_type"
    >
      <!-- Text slice -->
      <va-sl--Text v-if="slice.slice_type === 'text'" :slice="slice" />
      <!-- Image gallery slice -->
      <va-sl--ImageGallery
        v-if="slice.slice_type === 'image_gallery'"
        :slice="slice"
      />
      <!-- Pricing section slice -->
      <va-sl--PricingPlanList
        v-if="
          slice.slice_type === 'pricing_section' &&
          slices.find((slice) => slice.slice_type === 'pricing_tier')
        "
        :pricingTierSlices="
          slices.filter((slice) => slice.slice_type === 'pricing_tier')
        "
      />
      <!-- Image slice -->
      <va-image-slice :slice="slice" v-if="slice.slice_type === 'image'" />
      <!-- Section anchor slice -->
      <va-sl--SectionAnchor
        v-if="slice.slice_type === 'section_anchor'"
        :slice="slice"
      />
    </div>
  </div>
</template>

<script>
import Text from '@/components/slices/Text'
import ImageGallery from '@/components/slices/ImageGallery'
import PricingPlanList from '@/components/slices/PricingPlanList'
import Image from '@/components/slices/Image'
import SectionAnchor from '@/components/slices/SectionAnchor'
export default {
  name: 'va-or--SliceContent',

  components: {
    'va-sl--Text': Text,
    'va-sl--ImageGallery': ImageGallery,
    'va-sl--PricingPlanList': PricingPlanList,
    'va-sl--Image': Image,
    'va-sl--SectionAnchor': SectionAnchor,
  },
  props: {
    slices: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.va-or--SliceContent {
  &__slice {
    &:not(.hidden) + & {
      margin-top: $spacing__micro--xl;
    }
  }
}
</style>