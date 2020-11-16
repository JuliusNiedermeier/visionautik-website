<template>
  <div class="va-at--Logo">
    <div class="va-at--Logo__border">
      <small class="va-at--Logo__border__line va-at--Logo__border__line--top"
        >Visionautik</small
      >
      <small class="va-at--Logo__border__line va-at--Logo__border__line--bottom"
        >Akademie</small
      >
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

    &__line {
      color: white;
      text-transform: uppercase;

      &--bottom {
        letter-spacing: 0.2rem;
      }
    }
  }
}
</style>