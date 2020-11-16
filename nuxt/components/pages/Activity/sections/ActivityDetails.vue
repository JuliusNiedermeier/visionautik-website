<template>
  <div class="va-ps--ActivityDetails">
    <div class="va-ps--ActivityDetails__item">
      <va-at--Icon
        class="va-ps--ActivityDetails__item__icon"
        :name="offer.general__category === 'course' ? 'date-range' : 'date'"
      />
      <small class="va-ps--ActivityDetails__item__text">{{
        $intlFormatter.date(new Date(offer.general__start_time || null))
      }}</small>
      <small
        class="va-ps--ActivityDetails__item__text va-ps--ActivityDetails__item__text--seperator"
      >
        -
      </small>
      <small
        class="va-ps--ActivityDetails__item__text"
        v-if="offer.general__category === 'course'"
      >
        {{
          $intlFormatter.date(new Date(offer.general__closing_time || null))
        }}</small
      >
    </div>
    <div
      class="va-ps--ActivityDetails__item"
      v-if="offer.general__category === 'event'"
    >
      <va-at--Icon class="va-ps--ActivityDetails__item__icon" name="clock" />
      <small class="va-ps--ActivityDetails__item__text"
        >{{ $intlFormatter.time(new Date(offer.general__start_time || null)) }}
      </small>
      <small
        class="va-ps--ActivityDetails__item__text va-ps--ActivityDetails__item__text--seperator"
      >
        -
      </small>
      <small class="va-ps--ActivityDetails__item__text">
        {{
          $intlFormatter.time(new Date(offer.general__closing_time || null))
        }}</small
      >
    </div>
    <div class="va-ps--ActivityDetails__item">
      <va-at--Icon class="va-ps--ActivityDetails__item__icon" name="location" />
      <a
        class="va-ps--ActivityDetails__item__text"
        :href="offer.general__venue_link.url"
        target="_blank"
        v-if="offer.general__venue_link"
      >
        <small>{{ offer.general__venue }}</small>
      </a>
    </div>
    <div class="va-ps--ActivityDetails__item">
      <va-at--Icon class="va-ps--ActivityDetails__item__icon" name="people" />
      <small class="va-ps--ActivityDetails__item__text">
        Max. {{ offer.general__maximum_attendance }} Teilnehmer
      </small>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/atoms/Icon'
export default {
  name: 'va-ps--ActivityDetails',

  components: {
    'va-at--Icon': Icon,
  },

  data() {
    return {
      offer: {},
    }
  },

  async fetch() {
    const type = this.$cms.types.repeatables.offer.typeName
    const query = new this.$cms.Query(
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

    const cmsResponse = await query.get()

    if (!cmsResponse) return
    this.offer = cmsResponse.results[0].data
  },
}
</script>

<style lang="scss" scoped>
.va-ps--ActivityDetails {
  margin-bottom: $spacing__micro--xl;

  &__item {
    display: flex;
    align-items: center;

    &__icon {
      margin-right: $spacing__micro--md;
    }

    &__text--seperator {
      margin: 0 $spacing--micro--sm;
    }

    & + & {
      margin-top: $spacing__micro--md;
    }
  }
}
</style>
