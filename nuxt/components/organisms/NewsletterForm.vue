<template>
  <va-mo--Form :fields="fields" :action="push" />
</template>

<script>
import Form from '@/components/molecules/Form.vue'
export default {
  components: { 'va-mo--Form': Form },

  data() {
    return {
      fields: [
        {
          placeholder: 'Name',
          type: 'text',
          grow: true,
          iconName: 'account',
          required: true,
        },
        {
          placeholder: 'Email',
          type: 'email',
          grow: true,
          iconName: 'at',
          required: true,
        },
        {
          placeholder: 'Newsletter abnonieren',
          type: 'submit',
          iconName: 'check',
          appearance: 'light',
        },
      ],
    }
  },

  methods: {
    push() {
      this.$router.push('/')
    },
  },
}
</script>

<style>
</style>