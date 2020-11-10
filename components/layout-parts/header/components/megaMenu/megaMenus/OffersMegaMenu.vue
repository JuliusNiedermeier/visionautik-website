<template>
  <div class="offers-mega-menu-component">
    <div class="offers-mega-menu-component__section">
      <va-mega-menu-link to="/offers" label="Für Changemaker" />
      <va-mega-menu-link to="/offers" label="Für Unternehmen" />
      <va-mega-menu-link to="/offers" label="Für Prozessbegleiter" />
    </div>
    <div class="offers-mega-menu-component__section"></div>
    <div class="offers-mega-menu-component__section"></div>
  </div>
</template>

<script>
import MegaMenuLink from './components/MegaMenuLink'
export default {
  components: { 'va-mega-menu-link': MegaMenuLink },
}
</script>

<style lang="scss" scoped>
.offers-mega-menu-component {
  padding: 10rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: strech;

  @include desktops {
    flex-direction: row;
    justify-content: flex-start;
  }

  &__section {
    flex: 1;

    & + & {
      margin-left: 15rem;
    }

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;

    > * {
      padding: 1rem 0;
    }
  }
}
</style>