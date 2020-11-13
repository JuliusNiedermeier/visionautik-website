<template>
  <div class="tag-component">
    <small>{{ tag }}</small>
  </div>
</template>

<script>
export default {
  props: ['tag'],
}
</script>

<style lang="scss" scoped>
.tag-component {
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