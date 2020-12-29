<template>
  <div
    class="va-mo--Notification"
    :class="{ hidden, error: notification.error }"
  >
    <div class="va-mo--Notification__body">
      <small class="va-mo--Notification__body__message">{{
        notification.message
      }}</small>
      <va-at--Button
        class="va-mo--Notification__body__close-button"
        @click="hide"
        :appearance="notification.error ? 'light' : 'dark'"
      >
        {{ $t('notifications.close') }}
      </va-at--Button>
    </div>
  </div>
</template>

<script>
import Button from '@/components/atoms/Button.vue'
export default {
  name: 'va-mo--Notification',
  components: { 'va-at--Button': Button },

  props: { notification: Object },

  data() {
    return {
      hidden: false,
    }
  },

  methods: {
    hide() {
      this.hidden = true
      setTimeout(
        () => this.$store.commit('notifications/remove', this.notification.id),
        1000
      )
    },
  },

  mounted() {
    if (this.notification.duration) {
      setTimeout(this.hide, this.notification.duration)
    }
    if (this.notification.destroyOnLocaleChange) {
      this.$watch('$i18n.locale', this.hide)
    }
    if (this.notification.destroyOnRouteChange) {
      this.$watch('$route', this.hide)
    }
  },
}
</script>

<style lang="scss" scoped>
.va-mo--Notification {
  $max-height: 25vh;

  background-color: $color__blue--base;
  border-top: $color--blue--lighter 1px solid;
  transition: border-top-width $duration--medium linear;
  max-height: $max-height;
  overflow: hidden;

  &.error {
    background-color: $color__red--base;
  }

  &.hidden {
    max-height: 0;
    animation-name: slide-up;
    border-top-width: 0;
  }

  @keyframes slide-down {
    from {
      max-height: 0;
    }
    to {
      max-height: $max-height;
    }
  }

  @keyframes slide-up {
    from {
      max-height: $max-height;
    }
    to {
      max-height: 0;
    }
  }

  animation-name: slide-down;
  animation-duration: $duration--medium;
  animation-timing-function: linear;

  &__body {
    @include page-margin;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $spacing__micro--md 0;

    &__message {
      color: $color--grey--dark;
    }

    &__button {
      margin-left: $spacing__micro--xl;
    }
  }
}
</style>