<template>
  <div class="tag-component">
    <small>{{tag}}</small>
  </div>
</template>

<script>
export default {
  props: ['tag'],
}
</script>

<style lang="scss" scoped>
.tag-component {
  background-color: $color--lilac--base;
  padding: 0.4rem 1rem;

  small {
    color: $color--blue--light;
    margin: 0;
    margin: 0;
    font-weight: bold;
  }
}
</style>