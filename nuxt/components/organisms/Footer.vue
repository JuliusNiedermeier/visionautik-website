<template>
  <footer class="va-or--Footer invert-color">
    <div class="va-or--Footer__body">
      <div class="va-or--Footer__body__contact-area">
        <h3 class="va-or--Footer__body__contact-area__heading">
          Visionautik Akademie
        </h3>
        <p class="va-or--Footer__body__contact-area__address">
          {{ $t('layout.footer.address') }}
        </p>
        <va-at--Button
          appearance="light"
          class="va-or--Footer__body__contact-area__contact-button"
        >
          {{ $t('layout.footer.contactButton') }}
        </va-at--Button>
      </div>
      <div class="va-or--Footer__body__link-area">
        <va-at--Link to="/terms-of-use" appearance="light">
          <small>{{ $t('layout.footer.termsOfUse') }}</small>
        </va-at--Link>
        <va-at--Link to="/privacy" appearance="light">
          <small>{{ $t('layout.footer.privacyPolicy') }}</small>
        </va-at--Link>
        <va-at--Link to="/legal-notice" appearance="light">
          <small>{{ $t('layout.footer.legalNotice') }}</small>
        </va-at--Link>
      </div>
      <va-mo--NewsletterForm class="va-or--Footer__body__newsletter-area" />
    </div>
    <div class="va-or--Footer__legal-bar">
      <div class="va-or--Footer__legal-bar__body">
        <small>&copy; 2020 Visionautik e.V.</small>
        <va-mo--LanguageSwitcher
          dropDownPosition="top"
          appearance="reduced"
          class="va-or--Footer__legal-bar__body__language-switcher"
        />
      </div>
    </div>
  </footer>
</template>

<script>
import Button from '@/components/atoms/Button.vue'
import Link from '@/components/atoms/Link.vue'
import NewsletterForm from '@/components/organisms/NewsletterForm'
import LanguageSwitcher from '@/components/molecules/LanguageSwitcher'
export default {
  name: 'va-or--Footer',
  components: {
    'va-mo--NewsletterForm': NewsletterForm,
    'va-mo--LanguageSwitcher': LanguageSwitcher,
    'va-at--Button': Button,
    'va-at--Link': Link,
  },
}
</script>

<style lang="scss" scoped>
.va-or--Footer {
  background-color: $color__blue--base;
  color: lightgray;
  &__body {
    @include page-margin;
    padding-top: $spacing__macro--sm;
    padding-bottom: $spacing__macro--xs;
    display: grid;
    grid-gap: $spacing__micro--xl;
    grid-template-areas:
      'contact-area'
      'newsletter-area'
      'link-area';

    @include desktops {
      padding-top: $spacing__macro--sm;
      padding-bottom: $spacing__macro--sm;

      grid-template-areas:
        'contact-area newsletter-area'
        'link-area newsletter-area';
    }

    &__contact-area {
      grid-area: contact-area;

      &__heading {
        margin-top: 0;
        margin-bottom: $spacing__micro--sm;
      }

      &__address {
        margin-top: 0;
      }
    }

    &__link-area {
      grid-area: link-area;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    &__newsletter-area {
      grid-area: newsletter-area;
      justify-self: stretch;
      align-self: center;
    }
  }
  &__legal-bar {
    background-color: $color__blue--lighter;

    &__body {
      @include page-margin;
      padding-top: $spacing__micro--md;
      padding-bottom: $spacing__micro--md;

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>