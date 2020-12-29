<template>
  <va-mo--ContentPlaceholder
    class="va-ps--ResultsPlaceholder"
    appearance="dark"
    :heading="heading"
    :body="body"
    :buttonLabel="buttonLabel"
    buttonIconName="addNotification"
    @click="handleClick"
  />
</template>

<script>
import ContentPlaceholder from '@/components/molecules/ContentPlaceholder.vue'
import { collections, repeatables } from '@/assets/js/types.js'
import subscribeToNotifications from '@/mixins/usecases/subscribeToNotifications.js'
export default {
  name: 'va-ps--ResultsPlaceholder',
  components: { 'va-mo--ContentPlaceholder': ContentPlaceholder },
  mixins: [subscribeToNotifications],

  computed: {
    heading() {
      return this.$t('global.placeholders.searchResults.heading')
    },
    body() {
      return this.$t('global.placeholders.searchResults.body')
    },
    buttonLabel() {
      return this.$t('global.placeholders.searchResults.buttonLabel')
    },
  },

  methods: {
    handleClick() {
      this.subscribeToNotifications([
        ...repeatables.activity.categories,
        ...repeatables.product.categories,
      ])
    },
  },
}
</script>