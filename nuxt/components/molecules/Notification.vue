<template>
  <div class="va-mo--Notification" :class="{ hidden }">
    <div class="va-mo--Notification__body">
      <small class="va-mo--Notification__body__message">{{
        notification.message
      }}</small>
      <button class="va-mo--Notification__body__close-button" @click="hide">
        {{ $t('notifications.close') }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'va-mo--Notification',

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

  watch: {
    '$i18n.locale'() {
      this.hide()
    },
  },

  mounted() {
    if (this.notification.duration) {
      setTimeout(this.hide, this.notification.duration)
    }
  },
}
</script>

<style lang="scss" scoped>
.va-mo--Notification {
  $max-height: 25vh;

  background-color: $color__blue--base;
  max-height: $max-height;
  overflow: hidden;

  &.hidden {
    max-height: 0;
    animation-name: slide-up;
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
  animation-duration: 1s;
  animation-timing-function: ease;

  &__body {
    @include page-margin;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: $spacing__micro--md 0;

    &__button {
      margin-left: $spacing__micro--xl;
    }
  }
}
</style>