<template>
  <va-slice-content :slices="slices" v-if="slices.length > 0" />
</template>

<script>
import SliceContent from '@/components/elements/SliceContent'
export default {
  components: { 'va-slice-content': SliceContent },

  data() {
    return {
      slices: [],
    }
  },

  async fetch() {
    const type = this.$api.types.repeatables[this.$route.params.type]
    let fetch = [type + '.content__slices']
    if (
      type === this.$api.types.repeatables.course ||
      type === this.$api.types.repeatables.event
    ) {
      fetch.push(type + '.pricing_tiers__slices')
    }

    const query = new this.$api.Query(
      [
        this.$prismic.predicates.at(
          `my.${this.$api.types.repeatables[this.$route.params.type]}.uid`,
          this.$route.params.offer
        ),
      ],
      { fetch }
    )

    const apiResponse = await query.get()

    if (!apiResponse) return

    const slices = apiResponse.results[0].data.content__slices
    if (apiResponse.results[0].data.pricing_tiers__slices) {
      slices.push(...apiResponse.results[0].data.pricing_tiers__slices)
    }

    this.slices = slices
  },
}
</script>


<style>
</style>