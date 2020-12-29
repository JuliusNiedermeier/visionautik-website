<template>
  <div
    class="va-mo--LanguageSwitcher"
    :class="{
      expanded,
      light: appearance === 'light',
      dark: appearance === 'dark',
      reduced: appearance === 'reduced',
      'drop-down-top': dropDownPosition === 'top',
    }"
    @click="expanded = !expanded"
  >
    <va-at--Button
      class="va-mo--LanguageSwitcher__button"
      iconName="language"
      iconPosition="right"
      :appearance="appearance"
    >
      {{ activeLocaleLabel }}
    </va-at--Button>
    <div class="va-mo--LanguageSwitcher__modal" v-if="expanded">
      <va-at--Button
        class="va-mo--LanguageSwitcher__modal__item"
        v-for="locale in availableLocales"
        :key="locale.code"
        @click="$i18n.setLocale(locale.code)"
        :appearance="appearance"
        >{{ short ? locale.code : locale.name }}</va-at--Button
      >
    </div>
  </div>
</template>

<script>
import Button from '@/components/atoms/Button.vue'
export default {
  name: 'va-mo--LanguageSwitcher',
  components: { 'va-at--Button': Button },
  props: { short: Boolean, appearance: String, dropDownPosition: String },

  data() {
    return { expanded: false }
  },

  computed: {
    activeLocaleLabel() {
      if (this.short) {
        return this.$i18n.locale
      } else {
        return this.$i18n.locales.find(
          (locale) => locale.code === this.$i18n.locale
        ).name
      }
    },

    availableLocales() {
      return this.$i18n.locales.filter(
        (locale) => locale.code !== this.$i18n.locale
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.va-mo--LanguageSwitcher {
  position: relative;

  &.expanded &__button {
    box-shadow: inset 0 -1px $color--blue--light;
  }

  &.expanded.drop-down-top &__button {
    box-shadow: inset 0 1px $color--blue--light;
  }

  &.light &__modal {
    background-color: $color--grey--dark;
  }

  &.reduced &__modal {
    background-color: $color--lilac--base;
  }

  &__modal {
    position: absolute;
    background-color: $color--blue--base;
    z-index: 1;
    width: 100%;

    &__item {
      width: 100%;
    }
  }

  &.drop-down-top &__modal {
    top: 0;
    transform: translateY(-100%);
  }
}
</style>