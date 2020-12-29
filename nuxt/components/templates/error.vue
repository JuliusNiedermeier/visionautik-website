<template>
  <va-at--PageSection padding="both">
    <main class="va-tp--error">
      <h1 class="va-tp--error__code">404</h1>
      <h2>{{ $t('layout.pageNotFound.heading') }}</h2>
      <p>{{ $t('layout.pageNotFound.body') }}</p>
      <va-at--Button
        iconName="backspace"
        iconPosition="left"
        @click="handleClick"
        >{{ $t('layout.pageNotFound.buttonLabel') }}</va-at--Button
      >
    </main>
  </va-at--PageSection>
</template>

<script>
import Button from '@/components/atoms/Button.vue'
import PageSection from '@/components/atoms/PageSection.vue'
export default {
  name: 'va-tp--error',
  components: { 'va-at--PageSection': PageSection, 'va-at--Button': Button },
  props: ['error'],

  methods: {
    handleClick() {
      window.history.back()
    },
  },
}
</script>

<style lang="scss" scoped>
.va-tp--error {
  &__code {
    font-size: 10rem;
    font-weight: bold;
    color: $color--blue--base;
    margin: 0;
  }
}
</style>