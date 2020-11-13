<template>
  <div class="slice-content-component" data-component-name="sliceContent">
    <div
      v-for="(slice, index) of slices"
      :key="index"
      class="slice-content-component__slice"
      :class="{ hidden: slice.slice_type === 'section_anchor' }"
      :data-slice-type="slice.slice_type"
    >
      <!-- Text slice -->
      <va-text-slice v-if="slice.slice_type === 'text'" :slice="slice" />
      <!-- Image gallery slice -->
      <va-image-gallery-slice
        v-if="slice.slice_type === 'image_gallery'"
        :slice="slice"
      />
      <!-- Pricing section slice -->
      <va-pricing-section-slice
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
      <va-section-anchor
        v-if="slice.slice_type === 'section_anchor'"
        :slice="slice"
      />
    </div>
  </div>
</template>

<script>
import Text from '@/components/slices/Text'
import ImageGallery from '@/components/slices/ImageGallery'
import PricingSection from '@/components/slices/PricingSection'
import Image from '@/components/slices/Image'
import SectionAnchor from '@/components/slices/SectionAnchor'
export default {
  components: {
    'va-text-slice': Text,
    'va-image-gallery-slice': ImageGallery,
    'va-pricing-section-slice': PricingSection,
    'va-image-slice': Image,
    'va-section-anchor': SectionAnchor,
  },
  props: {
    documentType: String,
    documentUID: String,
    sliceZones: Array,
  },

  data() {
    return {
      slices: [],
    }
  },

  async fetch() {
    const fetch = this.sliceZones.map(
      (sliceZone) => `${this.documentType}.${sliceZone}`
    )

    if (!fetch.length > 0) return

    let predicates = []

    if (this.documentUID) {
      predicates.push(
        this.$prismic.predicates.at(
          `my.${this.documentType}.uid`,
          this.documentUID
        )
      )
    } else {
      predicates.push(
        this.$prismic.predicates.at('document.type', this.documentType)
      )
    }
    const query = new this.$api.Query(predicates, { fetch })

    const apiResponse = await query.get()

    if (!apiResponse) return

    this.slices = []

    for (const sliceZone of this.sliceZones) {
      this.slices = [...this.slices, ...apiResponse.results[0].data[sliceZone]]
    }

    // const sectionAnchors = this.slices
    //   .filter((slice) => slice.slice_type === 'section_anchor')
    //   .map((slice) => {
    //     return {
    //       label: slice.primary.label,
    //       id: slice.primary.id,
    //       color: slice.primary.color,
    //     }
    //   })

    // this.$store.commit('sliceContent/setSectionAnchors', sectionAnchors)
  },
}
</script>

<style lang="scss" scoped>
.slice-content-component {
  &__slice {
    &:not(.hidden) + & {
      margin-top: $spacing__micro--xl;
    }
  }
}
</style>