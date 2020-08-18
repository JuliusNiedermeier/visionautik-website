<template>
  <div class="language-switcher-component">
    <button
      v-for="locale in $i18n.locales"
      :key="locale.code"
      @click="$i18n.setLocale(locale.code)"
      class="language-switcher-component__language-button"
      :class="{'language-switcher-component__language-button--current': locale.code == $i18n.locale}"
      :disabled="locale.code == $i18n.locale"
    >{{ locale.name }}</button>
  </div>
</template>

<script>
export default {
  name: "va-language-switcher",
  mounted() {
    console.log(
      "Locale from Mixin: ",
      this.localeIso,
      "Locale from i18n: ",
      this.$i18n.locale
    );
  },

  // watch: {
  //   '$i18n.locale'(val) {
  //     console.log(
  //       'Watcher in LanguageSwitcher.vue fired: ',
  //       this.$i18n.locales.find((locale) => locale.code == val).iso
  //     )
  //   },
  // },
};
</script>

<style>
</style>