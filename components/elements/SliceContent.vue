<template>
  <div class="slice-content-component">
    <div v-for="(slice, index) of slices" :key="index">
      <va-text-slice v-if="slice.slice_type === 'text'" :slice="slice" />
      <va-image-gallery-slice v-if="slice.slice_type === 'image_gallery'" :slice="slice" />
      <va-pricing-section-slice
        v-if="slice.slice_type === 'pricing_section' && slices.find((slice) => slice.slice_type === 'pricing_tier')"
        :pricingTierSlices="slices.filter((slice) => slice.slice_type === 'pricing_tier')"
      />
      <va-image-slice :slice="slice" v-if="slice.slice_type === 'image'" />
    </div>
  </div>
</template>

<script>
import Text from '@/components/slices/Text'
import ImageGallery from '@/components/slices/ImageGallery'
import PricingSection from '@/components/slices/PricingSection'
import Image from '@/components/slices/Image'
export default {
  components: {
    'va-text-slice': Text,
    'va-image-gallery-slice': ImageGallery,
    'va-pricing-section-slice': PricingSection,
    'va-image-slice': Image,
  },
  props: {
    slices: Array,
  },
}
</script>

<style lnag="scss" scoped>
.slice-content-component > * + * {
  margin-top: 5rem;
}
</style>