<template>
  <div class="va-ps--ActivityHeaderBody">
    <h2 class="va-ps--ActivityHeaderBody__heading">
      {{ offer.general__heading }}
    </h2>
    <i class="va-ps--ActivityHeaderBody__excerpt">
      {{ offer.general__excerpt }}
    </i>
  </div>
</template>

<script>
export default {
  name: 'va-ps--ActivityHeaderBody',

  data() {
    return {
      offer: {},
    }
  },

  props: ['type'],

  async fetch() {
    const query = new this.$cms.Query(
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

    const cmsResponse = await query.get()

    if (!cmsResponse) return
    this.offer = cmsResponse.results[0].data
  },
}
</script>