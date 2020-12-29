import axios from 'axios'
import { pages } from '@/assets/js/types.js'

export default {
  methods: {
    async sendMail(data) {
      return axios
        .post('/api/mailer/send', data)
        .then((res) => {
          this.$store.commit('notifications/add', {
            duration: 5000,
            message: this.$t(
              `types.${pages.about.typeName}.contactForm.successMessage`
            ),
          })
          return true
        })
        .catch((error) => {
          this.$store.commit('notifications/add', {
            duration: 5000,
            error: true,
            message: this.$t(
              `types.${pages.about.typeName}.contactForm.errorMessage`
            ),
          })
          return false
        })
    },
  },
}
