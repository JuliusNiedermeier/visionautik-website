<template>
  <div class="offer-details-component">
    <div>
      <va-icon
        :name="offer.general__category === 'course' ? 'date-range' : 'date'"
      />
      <small>{{
        $intlFormatter.date(new Date(offer.general__start_time || null))
      }}</small>
      <small v-if="offer.general__category === 'course'">
        {{
          $intlFormatter.date(new Date(offer.general__closing_time || null))
        }}</small
      >
    </div>
    <div v-if="offer.general__category === 'event'">
      <va-icon name="clock" />
      <small
        >{{ $intlFormatter.time(new Date(offer.general__start_time || null)) }}
        -
        {{
          $intlFormatter.time(new Date(offer.general__closing_time || null))
        }}</small
      >
    </div>
    <div>
      <va-icon name="location" />
      <a
        :href="offer.general__venue_link.url"
        target="_blank"
        v-if="offer.general__venue_link"
      >
        <small>{{ offer.general__venue }}</small>
      </a>
    </div>
    <div>
      <va-icon name="people" />
      <small>Max. {{ offer.general__maximum_attendance }} Teilnehmer</small>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/elements/Icon'
export default {
  components: {
    'va-icon': Icon,
  },

  data() {
    return {
      offer: {},
    }
  },

  async fetch() {
    const type = this.$api.types.repeatables.offer.typeName
    const query = new this.$api.Query(
      [this.$prismic.predicates.at(`my.${type}.uid`, this.$route.params.offer)],
      {
        fetch: [
          type + '.general__start_time',
          type + '.general__closing_time',
          type + '.general__venue',
          type + '.general__venue_link',
          type + '.general__maximum_attendance',
          type + '.general__category',
        ],
      }
    )

    const apiResponse = await query.get()

    if (!apiResponse) return
    this.offer = apiResponse.results[0].data
  },
}
</script>

<style lang="scss" scoped>
.offer-details-component {
  margin-bottom: $spacing__micro--xl;

  > div {
    display: flex;
    align-items: center;

    > * + * {
      margin-left: $spacing__micro--md;
    }
  }

  > div + div {
    margin-top: $spacing__micro--md;
  }
}
</style>