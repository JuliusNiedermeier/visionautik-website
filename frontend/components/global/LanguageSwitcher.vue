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
    name: 'va-language-switcher',
}
</script>

<style>
</style>