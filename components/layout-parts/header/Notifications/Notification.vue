<template>
  <div class="notification-component" :class="{ hidden }">
    <div class="notification-component__body">
      <small class="notification-component__body__message">{{
        notification.message
      }}</small>
      <button class="notification-component__body__close-button" @click="hide">
        Close
      </button>
    </div>
  </div>
</template>

<script>
export default {
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
.notification-component {
  $max-height: 25vh;

  background-color: $color--blue--base;
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

    padding: 1rem 0;

    &__button {
      margin-left: 2rem;
    }
  }
}
</style>