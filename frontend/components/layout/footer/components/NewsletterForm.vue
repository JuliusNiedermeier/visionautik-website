<template>
  <form class="newsletter-form-component" @submit.prevent>
    <input :placeholder="$t('namePlaceholder')" />
    <input type="email" :placeholder="$t('emailPlaceholder')" required />
    <div class="newsletter-form-component__gdpr-consent">
      <input type="checkbox" required />
      <label>
        <nuxt-link to="/privacy">
          <small>{{$t('gdprConsentMessage')}}</small>
        </nuxt-link>
      </label>
    </div>
    <button type="submit" class>{{$t('submitButtonMessage')}}</button>
  </form>
</template>

<script>
export default {
name: 'va-newsletter-form'
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
    padding: 1rem 1.5rem;
    background-color: $color--blue--lighter;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;

    input {
      margin-left: 0;
      margin-right: 1rem;
    }
  }

  button {
    background-color: $color--blue--lighter;
    align-self: flex-start;

    @include desktops {
      align-self: flex-end;
    }
  }
}
</style>

<i18n>
{
    "de": {
        "namePlaceholder": "Name",
        "emailPlaceholder": "Deine Email-Adresse",
        "gdprConsentMessage": "Ich bin mit dem Datenschutz einverstanden.",
        "submitButtonMessage": "Newsletter abonieren"
    },
    "en": {
        "namePlaceholder": "Name",
        "emailPlaceholder": "Your email address",
        "gdprConsentMessage": "I agree with your privacy policy.",
        "submitButtonMessage": "Subscribe to our newsletter"
    }
}
</i18n>