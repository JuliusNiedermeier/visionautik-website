<template>
  <div class="va-or--NotificationList invert-color">
    <va-mo--Notification
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import Notification from '@/components/molecules/Notification'
export default {
  name: 'va-or--NotificationList',
  components: { 'va-mo--Notification': Notification },
  computed: {
    notifications() {
      return this.$store.state.notifications.stack
    },
  },
}
</script>