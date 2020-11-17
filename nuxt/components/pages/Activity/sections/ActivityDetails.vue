<template>
  <div class="va-ps--ActivityDetails">
    <div class="va-ps--ActivityDetails__item">
      <va-at--Icon
        class="va-ps--ActivityDetails__item__icon"
        :name="typeCategory === 'course' ? 'date-range' : 'date'"
      />
      <small class="va-ps--ActivityDetails__item__text">{{
        $intlFormatter.date(new Date(startTime || null))
      }}</small>
      <small
        class="va-ps--ActivityDetails__item__text va-ps--ActivityDetails__item__text--seperator"
      >
        -
      </small>
      <small
        class="va-ps--ActivityDetails__item__text"
        v-if="typeCategory === 'course'"
      >
        {{ $intlFormatter.date(new Date(closingTime || null)) }}</small
      >
    </div>
    <div class="va-ps--ActivityDetails__item" v-if="typeCategory === 'event'">
      <va-at--Icon class="va-ps--ActivityDetails__item__icon" name="clock" />
      <small class="va-ps--ActivityDetails__item__text"
        >{{ $intlFormatter.time(new Date(startTime || null)) }}
      </small>
      <small
        class="va-ps--ActivityDetails__item__text va-ps--ActivityDetails__item__text--seperator"
      >
        -
      </small>
      <small class="va-ps--ActivityDetails__item__text">
        {{ $intlFormatter.time(new Date(closingTime || null)) }}</small
      >
    </div>
    <div class="va-ps--ActivityDetails__item">
      <va-at--Icon class="va-ps--ActivityDetails__item__icon" name="location" />
      <a
        class="va-ps--ActivityDetails__item__text"
        :href="venueUrl"
        target="_blank"
      >
        <small>{{ venueLabel }}</small>
      </a>
    </div>
    <div class="va-ps--ActivityDetails__item">
      <va-at--Icon class="va-ps--ActivityDetails__item__icon" name="people" />
      <small class="va-ps--ActivityDetails__item__text">
        Max. {{ maximumAttendance }} Teilnehmer
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

  props: [
    'startTime',
    'closingTime',
    'venueLabel',
    'venueUrl',
    'maximumAttendance',
    'typeCategory',
  ],
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
