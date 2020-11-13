<template>
  <form class="newsletter-form-component" @submit.prevent>
    <input :placeholder="$t('layout.footer.newsletterForm.namePlaceholder')" />
    <input
      type="email"
      :placeholder="$t('layout.footer.newsletterForm.emailPlaceholder')"
      required
    />
    <div class="newsletter-form-component__gdpr-consent">
      <input type="checkbox" required />
      <label>
        <nuxt-link to="/privacy">
          <small>{{
            $t('layout.footer.newsletterForm.gdprConsentLabel')
          }}</small>
        </nuxt-link>
      </label>
    </div>
    <button type="submit" class>
      {{ $t('layout.footer.newsletterForm.submitButtonLabel') }}
    </button>
  </form>
</template>

<script>
export default {
  name: 'va-newsletter-form',
}
</script>

<style lang="scss" scoped>
.newsletter-form-component {
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

    input {
      margin-left: 0;
      margin-right: $spacing__micro--md;
    }
  }

  button {
    background-color: $color__blue--lighter;
    align-self: flex-start;

    @include desktops {
      align-self: flex-end;
    }
  }
}
</style>