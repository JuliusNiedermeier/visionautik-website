<template>
  <div class="va-mo--LanguageSwitcher">
    <button
      v-for="locale in $i18n.locales"
      :key="locale.code"
      @click="$i18n.setLocale(locale.code)"
      class="va-mo--LanguageSwitcher__language-button"
      :class="{
        'va-mo--LanguageSwitcher__language-button--current':
          locale.code == $i18n.locale,
      }"
      :disabled="locale.code == $i18n.locale"
    >
      {{ locale.name }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'va-mo--LanguageSwitcher',
}
</script>

<style lang="scss" scoped>
.va-mo--LanguageSwitcher {
  display: flex;
  flex-direction: row;
}
</style>