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
.va-or--SliceContent {
  &__slice {
    &:not(.hidden) + & {
      margin-top: $spacing__micro--xl;
    }
  }
}
</style>