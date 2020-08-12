<template>
  <div class="logo-component">
    <div class="logo-component__border">
      <span>Visionautik</span>
      <span>Akademie</span>
    </div>
  </div>
</template>

<script>
export default {
    name: "va-logo",
}
</script>

<style lang="scss" scoped>
.logo-component {
  padding: 0.3rem;
  background-color: $color--blue--base;
  width: min-content;
  height: min-content;

  &__border {
    display: flex;
    flex-direction: column;
    border: 1px solid white;
    padding: 0.5rem 1rem;

    span {
      color: white;
      font-size: 1.6rem;
      text-transform: uppercase;

      &:nth-child(2) {
        letter-spacing: 0.2rem;
      }
    }
  }
}
</style>