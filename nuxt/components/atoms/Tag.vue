<template>
  <div class="va-at--Tag">
    <small>{{ tag }}</small>
  </div>
</template>

<script>
export default {
  name: 'va-at--Tag',
  props: ['tag'],
}
</script>

<style lang="scss" scoped>
.va-at--Tag {
  background-color: $color__lilac--base;
  padding: $spacing__micro--xs $spacing__micro--md;

  small {
    color: $color__blue--light;
    margin: 0;
    margin: 0;
    font-weight: bold;
  }
}
</style>