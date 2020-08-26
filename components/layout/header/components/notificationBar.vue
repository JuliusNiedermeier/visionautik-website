<template>
  <div class="notification-bar-component">
    <div
      v-for="notification in notifications"
      :key="notification.id"
      class="notification-bar-component__notification"
      :class="{hide: notification.hide, error: notification.error}"
    >
      <div class="notification-bar-component__notification__body">
        <p>{{notification.message}}</p>
        <va-icon name="play" />
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/global/Icon'
export default {
  name: 'va-notification-bar',
  components: { 'va-icon': Icon },
  computed: {
    notifications() {
      return this.$store.state.notifications.stack
    },
  },
}
</script>

<style lang="scss" scoped>
.notification-bar-component {
  &__notification {
    background-color: $color--blue--base;

    &.error {
      background-color: $color--red--base;
    }

    &.hide {
      animation-name: rollUp;
      transform: scaleY(0);
    }

    animation-name: rollDown;
    animation-duration: $duration--fast;
    animation-timing-function: ease;

    transform-origin: top;

    @keyframes rollDown {
      from {
        transform: scaleY(0);
      }
      to {
        transform: scaleY(1);
      }
    }

    @keyframes rollUp {
      from {
        transform: scaleY(1);
      }
      to {
        transform: scaleY(0);
      }
    }

    &__body {
      @include page-margin;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: $color--grey--light;
    }
  }
}
</style>