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
          slices.find((slice) => slice.slice_type === 'pricing_plan')
        "
        :pricingPlanSlices="
          slices.filter((slice) => slice.slice_type === 'pricing_plan')
        "
      />
      <!-- Image slice -->
      <va-sl--Image :slice="slice" v-if="slice.slice_type === 'image'" />
      <!-- Section anchor slice -->
      <va-sl--SectionAnchor
        v-if="slice.slice_type === 'section_anchor'"
        :slice="slice"
      />
      <va-sl--Quote v-if="slice.slice_type === 'quote'" :slice="slice" />
      <va-sl--TrainerList
        v-if="slice.slice_type === 'trainer_section'"
        :trainers="slice.trainers"
      />
      <va-sl--CallToAction
        v-if="slice.slice_type === 'call_to_action'"
        :slice="slice"
      />
      <va-sl--Accordion
        v-if="slice.slice_type === 'accordion'"
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
import Quote from '@/components/slices/Quote.vue'
import TrainerList from '@/components/slices/TrainerList.vue'
import CallToAction from '@/components/slices/CallToAction.vue'
import Accordion from '@/components/slices/Accordion.vue'
export default {
  name: 'va-or--SliceContent',

  components: {
    'va-sl--Text': Text,
    'va-sl--ImageGallery': ImageGallery,
    'va-sl--PricingPlanList': PricingPlanList,
    'va-sl--Image': Image,
    'va-sl--SectionAnchor': SectionAnchor,
    'va-sl--Quote': Quote,
    'va-sl--TrainerList': TrainerList,
    'va-sl--CallToAction': CallToAction,
    'va-sl--Accordion': Accordion,
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
      margin-top: $spacing__macro--xs;
    }
  }
}
</style>