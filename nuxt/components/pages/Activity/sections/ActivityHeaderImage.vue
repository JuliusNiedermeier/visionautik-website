<template>
  <img
    class="va-ps--ActivityHeaderImage"
    :src="offer.general__featured_image.url"
    v-if="offer.general__featured_image"
  />
</template>

<script>
export default {
  name: 'va-ps--ActivityHeaderImage',

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
.va-ps--ActivityHeaderImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>