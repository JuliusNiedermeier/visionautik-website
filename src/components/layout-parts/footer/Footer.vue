<template>
  <footer class="global-footer invert-color">
    <div class="global-footer__body">
      <div class="global-footer__body__contact-area">
        <h3>Visionautik Akademie</h3>
        <p>{{ $t('layout.footer.address') }}</p>
        <button>{{ $t('layout.footer.contactButton') }}</button>
      </div>
      <div class="global-footer__body__link-area">
        <nuxt-link to="/terms-of-use">
          <small>{{ $t('layout.footer.termsOfUse') }}</small>
        </nuxt-link>
        <nuxt-link to="/privacy">
          <small>{{ $t('layout.footer.privacyPolicy') }}</small>
        </nuxt-link>
        <nuxt-link to="/legal-notice">
          <small>{{ $t('layout.footer.legalNotice') }}</small>
        </nuxt-link>
      </div>
      <va-newsletter-form class="global-footer__body__newsletter-area" />
    </div>
    <div class="global-footer__legal-bar">
      <div class="global-footer__legal-bar__body">
        <small>&copy; 2020 Visionautik e.V.</small>
        <va-language-switcher
          class="global-footer__legal-bar__body__language-switcher"
        />
      </div>
    </div>
  </footer>
</template>

<script>
import NewsletterForm from './components/NewsletterForm'
import LanguageSwitcher from '@/components/layout-parts/LanguageSwitcher'
export default {
  name: 'va-footer',
  components: {
    'va-newsletter-form': NewsletterForm,
    'va-language-switcher': LanguageSwitcher,
  },
}
</script>

<style lang="scss" scoped>
.global-footer {
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
      h3 {
        margin-top: 0;
        margin-bottom: $spacing__micro--sm;
      }

      p {
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