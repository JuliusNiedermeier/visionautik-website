<template>
  <div class="offer-header-body-component">
    <h2 class="offer-header-body-component__heading">
      {{ offer.general__heading }}
    </h2>
    <i class="offer-header-body-component__excerpt">
      {{ offer.general__excerpt }}
    </i>
  </div>
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
        fetch: [
          this.type + '.general__heading',
          this.type + '.general__excerpt',
        ],
      }
    )

    const apiResponse = await query.get()

    if (!apiResponse) return
    this.offer = apiResponse.results[0].data
  },
}
</script>

<style>
</style>