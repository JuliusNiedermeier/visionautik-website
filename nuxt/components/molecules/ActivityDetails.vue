<template>
  <div class="va-ps--ActivityDetails">
    <div class="va-ps--ActivityDetails__item" v-if="startTime">
      <va-at--Icon
        class="va-ps--ActivityDetails__item__icon"
        name="date-range"
      />
      <small class="va-ps--ActivityDetails__item__text">
        {{ $d(new Date(startTime), 'shortDate') }}
        <span v-if="closingTime">
          {{ seperator }} {{ $d(new Date(closingTime), 'shortDate') }}
        </span>
      </small>
    </div>
    <div
      class="va-ps--ActivityDetails__item"
      v-if="showDetailedTimeframe && startTime"
    >
      <va-at--Icon class="va-ps--ActivityDetails__item__icon" name="clock" />
      <small class="va-ps--ActivityDetails__item__text">
        {{ $d(new Date(startTime), 'time') }}
        <span v-if="closingTime">
          {{ seperator }} {{ $d(new Date(closingTime), 'time') }}
        </span>
      </small>
    </div>
    <div class="va-ps--ActivityDetails__item">
      <va-at--Icon class="va-ps--ActivityDetails__item__icon" name="location" />
      <va-at--Link
        class="va-ps--ActivityDetails__item__text"
        :to="venueUrl"
        newTab
      >
        <small>{{ venueLabel }}</small>
      </va-at--Link>
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
import Link from '@/components/atoms/Link.vue'
export default {
  name: 'va-ps--ActivityDetails',

  components: {
    'va-at--Icon': Icon,
    'va-at--Link': Link,
  },

  data() {
    return { seperator: '-' }
  },

  props: {
    startTime: String,
    closingTime: String,
    venueLabel: String,
    venueUrl: String,
    maximumAttendance: Number,
    showDetailedTimeframe: Boolean,
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
