<template>
  <div class="notification-bar-component">
    <div
      v-for="notification in notifications"
      :key="notification.id"
      class="notification-bar-component__notification"
      :class="{error: notification.error}"
    >
      <div class="notification-bar-component__notification__body">
        <small>{{notification.message}}</small>
        <va-icon name="close" />
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/elements/Icon'
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
  z-index: 1;
  position: fixed;
  display: flex;
  justify-content: strech;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;

  @include desktops {
    bottom: 2rem;
    justify-content: center;
  }

  &__notification {
    padding: 2rem;
    background-color: $color--lilac--base;

    &.error {
      background-color: $color--red--base;
    }

    &.hide {
      transform: translateY(-100%);
      opacity: 0;
    }

    &__body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: $color--blue--base;

      > * + * {
        margin-left: 2rem;
      }
    }
  }
}
</style>