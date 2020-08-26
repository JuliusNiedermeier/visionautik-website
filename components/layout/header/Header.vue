<template>
  <header class="header-component">
    <va-notification-bar />
    <va-airmail-stripe @click.native="expandMegamenu = !expandMegamenu" />
    <div class="header-component__navigation">
      <va-logo />
      <va-navigation-menu class="header-component__navigation__menu" :toggleState="toggleState" />
      <va-navigation-menu-toggle
        class="header-component__navigation__menu-toggle"
        :toggleState="toggleState"
        @click.native="toggle"
      />
    </div>
    <va-mega-menu class="header-component__mega-menu" :expand="expandMegamenu">
      <h1>Mega menu</h1>
    </va-mega-menu>
  </header>
</template>

<script>
import NotificationBar from '@/components/layout/header/components/notificationBar'
import AirmailStripe from './components/AirmailStripe'
import Logo from './components/Logo'
import NavigationMenu from './components/NavigationMenu'
import NavigationMenuToggle from './components/NavigationMenuToggle'
import MegaMenu from './megaMenu/MegaMenu'
export default {
  name: 'va-header',
  components: {
    'va-notification-bar': NotificationBar,
    'va-airmail-stripe': AirmailStripe,
    'va-logo': Logo,
    'va-navigation-menu': NavigationMenu,
    'va-navigation-menu-toggle': NavigationMenuToggle,
    'va-mega-menu': MegaMenu,
  },
  data() {
    return {
      toggleState: 'collapsed',
      expandMegamenu: false,
    }
  },
  methods: {
    toggle() {
      if (this.toggleState == 'collapsed') this.toggleState = 'expanded'
      else this.toggleState = 'collapsed'
    },
  },
  watch: {
    '$route.path'() {
      this.toggleState = 'collapsed'
    },
  },
}
</script>

<style lang="scss" scoped>
.header-component {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: ghostwhite;

  &__navigation {
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    @include page-margin;

    &__menu-toggle {
      z-index: 1;

      @include desktops {
        display: none;
      }
    }
  }

  &__mega-menu {
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
  }
}
</style>