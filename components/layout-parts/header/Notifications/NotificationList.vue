<template>
  <div class="notification-bar-component invert-color">
    <va-notification
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import Notification from './Notification'
export default {
  name: 'va-notification-bar',
  components: { 'va-notification': Notification },
  computed: {
    notifications() {
      return this.$store.state.notifications.stack
    },
  },
}
</script>