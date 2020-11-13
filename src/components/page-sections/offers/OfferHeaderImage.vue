<template>
  <img
    class="offer-header-image-component"
    :src="offer.general__featured_image.url"
    v-if="offer.general__featured_image"
  />
</template>

<script>
export default {
  data() {
    return {
      offer: {},
    }
  },

  props: ['type'],

  async fetch() {
    const query = new this.$api.Query(
      [
        this.$prismic.predicates.at(
          `my.${this.type}.uid`,
          this.$route.params.offer
        ),
      ],
      {
        fetch: [this.type + '.general__featured_image'],
      }
    )

    const apiResponse = await query.get()

    if (!apiResponse) return
    this.offer = apiResponse.results[0].data
  },
}
</script>

<style lang="scss" scoped>
.offer-header-image-component {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>