<template>
  <small class="va-at--Tag">{{ tag }}</small>
</template>

<script>
export default {
  name: 'va-at--Tag',
  props: ['tag'],
}
</script>

<style lang="scss" scoped>
.va-at--Tag {
  background-color: $color__blue--base;
  padding: $spacing--micro--xs $spacing__micro--md;
  color: $color--grey--dark;
}
</style>