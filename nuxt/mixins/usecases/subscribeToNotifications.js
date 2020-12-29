import axios from 'axios'

export default {
  methods: {
    async subscribeToNotifications(categories = []) {
      try {
        const sw = await navigator.serviceWorker.ready
        const subscription = await sw.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this.$config.webPushPublicKey,
        })

        const currentLocaleIso = this.$i18n.locales.find(
          (locale) => locale.code === this.$i18n.locale
        ).iso

        const response = await axios.post('/api/notifications/subscribe', {
          subscription,
          recieve: categories,
          lang: currentLocaleIso,
        })

        if (response.status === 200) {
          this.$store.commit('notifications/add', {
            message: 'Benachrichtigungen wurden erfolgreich eingerichtet',
            duration: 5000,
          })
        } else {
          this.$store.commit('notifications/add', {
            error: true,
            message: 'Etwas lief schief',
            duration: 5000,
          })
          throw new Error("The server couldn't handle the subcription request")
        }
      } catch (error) {
        return error
      }
    },
  },
}
