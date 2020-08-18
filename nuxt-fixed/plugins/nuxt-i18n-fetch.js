import Vue from "vue";

if (Vue._installedPlugins.some(plugin => plugin.name === "VueI18n")) {
  Vue.mixin({
    watch: {
      "$i18n.locale"() {
        if (this.$fetch) this.$fetch();
      }
    },
    computed: {
      localeIso() {
        return this.$i18n.locales.find(
          locale => locale.code == this.$i18n.locale
        ).iso;
      }
    }
  });
}
