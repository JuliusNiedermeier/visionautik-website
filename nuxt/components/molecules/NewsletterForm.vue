<template>
  <form class="va-mo--NewsletterForm" @submit.prevent>
    <input :placeholder="$t('layout.footer.newsletterForm.namePlaceholder')" />
    <input
      type="email"
      :placeholder="$t('layout.footer.newsletterForm.emailPlaceholder')"
      required
    />
    <div class="va-mo--NewsletterForm__gdpr-consent">
      <input
        class="va-mo--NewsletterForm__gdpr-consent__checkbox"
        type="checkbox"
        required
      />
      <label>
        <nuxt-link to="/privacy">
          <small>{{
            $t('layout.footer.newsletterForm.gdprConsentLabel')
          }}</small>
        </nuxt-link>
      </label>
    </div>
    <button type="submit" class="va-mo--NewsletterForm__submit-button">
      {{ $t('layout.footer.newsletterForm.submitButtonLabel') }}
    </button>
  </form>
</template>

<script>
export default {
  name: 'va-mo--NewsletterForm',
}
</script>

<style lang="scss" scoped>
.va-mo--NewsletterForm {
  display: flex;
  flex-direction: column;

  &__gdpr-consent {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: $spacing__micro--md $spacing__micro--lg;
    background-color: $color__blue--lighter;
    margin-top: $spacing__micro--sm;
    margin-bottom: $spacing__micro--sm;

    &__checkbox {
      margin-left: 0;
      margin-right: $spacing__micro--md;
    }
  }

  &__submit-button {
    background-color: $color__blue--lighter;
    align-self: flex-start;

    @include desktops {
      align-self: flex-end;
    }
  }
}
</style>