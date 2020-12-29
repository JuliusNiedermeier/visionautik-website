<template>
  <va-mo--Form
    :fields="fields"
    :action="handleSubmit"
    :appearance="'light'"
    :state="state"
    @submit="handleSubmit"
  />
</template>

<script>
import Form from '@/components/molecules/Form.vue'
import { pages } from '@/assets/js/types.js'
import sendMail from '@/mixins/usecases/sendMail.js'
import axios from 'axios'
export default {
  name: 'va-mo--ContactForm',
  components: { 'va-mo--Form': Form },
  mixins: [sendMail],

  data() {
    return {
      state: 'default',
    }
  },

  computed: {
    fields() {
      return [
        {
          placeholder: this.getPlaceholder('name'),
          dataKey: 'name',
          type: 'text',
          grow: true,
          iconName: 'account',
          appearance: 'light',
          required: false,
        },
        {
          placeholder: this.getPlaceholder('email'),
          dataKey: 'email',
          type: 'email',
          grow: true,
          iconName: 'at',
          appearance: 'light',
        },
        {
          placeholder: this.getPlaceholder('subject'),
          dataKey: 'subject',
          type: 'text',
          grow: true,
          iconName: 'title',
          appearance: 'light',
          required: true,
        },
        {
          placeholder: this.getPlaceholder('message'),
          dataKey: 'body',
          type: 'textarea',
          rows: 10,
          grow: true,
          iconName: 'text',
          appearance: 'light',
          required: true,
        },
        {
          placeholder: this.getPlaceholder('submit'),
          type: 'submit',
          appearance: 'reduced',
        },
      ]
    },
  },

  methods: {
    getPlaceholder(key) {
      return this.$t(`types.${pages.about.typeName}.contactForm.${key}`)
    },

    async handleSubmit(data) {
      this.state = 'pending'
      const success = await this.sendMail(data)
      console.log(success)
      this.state = success ? 'success' : 'error'
    },
  },
}
</script>

<style>
</style>