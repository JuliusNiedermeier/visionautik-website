<template>
  <div class="va-at--Logo">
    <div class="va-at--Logo__border">
      <small>Visionautik</small>
      <small>Akademie</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'va-at--Logo',
}
</script>

<style lang="scss" scoped>
.va-at--Logo {
  padding: $spacing__micro--xs;
  background-color: $color__blue--base;
  width: min-content;
  height: min-content;

  &__border {
    display: flex;
    flex-direction: column;
    border: 1px solid white;
    padding: $spacing__micro--sm $spacing__micro--md;

    small {
      color: white;
      text-transform: uppercase;

      &:nth-child(2) {
        letter-spacing: 0.2rem;
      }
    }
  }
}
</style>