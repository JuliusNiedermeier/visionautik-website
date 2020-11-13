<template>
  <header class="header-component">
    <va-airmail-stripe />
    <va-notification-list />
    <div class="header-component__navigation">
      <nuxt-link to="/">
        <va-logo />
      </nuxt-link>
      <va-navigation-menu
        class="header-component__navigation__menu"
        :toggleState="navigationMenuToggleState"
        @update:megaMenuComponent="setMegaMenuComponent"
        @update:megaMenuToggleState="setMegaMenuToggleState"
      />
      <va-navigation-menu-toggle
        class="header-component__navigation__menu-toggle"
        :toggleState="toggleState"
        @click.native="setNewToggleState"
      />
    </div>
    <va-mega-menu
      class="header-component__mega-menu"
      :expand="megaMenuToggleState"
      @update:megaMenuToggleState="setMegaMenuToggleState"
    >
      <component :is="megaMenuComponent" />
    </va-mega-menu>
  </header>
</template>

<script>
import AirmailStripe from './components/AirmailStripe'
import NotificationList from '@/components/layout-parts/header/components/notificationList/NotificationList'
import Logo from './components/Logo'
import NavigationMenu from './components/NavigationMenu'
import NavigationMenuToggle from './components/NavigationMenuToggle'
import MegaMenu from './components/megaMenu/MegaMenu'
export default {
  name: 'va-header',
  components: {
    'va-airmail-stripe': AirmailStripe,
    'va-notification-list': NotificationList,
    'va-logo': Logo,
    'va-navigation-menu': NavigationMenu,
    'va-navigation-menu-toggle': NavigationMenuToggle,
    'va-mega-menu': MegaMenu,
  },
  data() {
    return {
      toggleState: 'collapsed',
      navigationMenuToggleState: false,
      megaMenuToggleState: false,
      megaMenuComponent: null,
    }
  },
  methods: {
    setMegaMenuComponent(component) {
      this.megaMenuComponent = component
    },

    setMegaMenuToggleState(state) {
      this.megaMenuToggleState = state
    },

    setNewToggleState() {
      if (this.toggleState === 'collapsed') {
        this.toggleState = 'expanded'
        this.navigationMenuToggleState = true
      } else if (this.toggleState === 'expanded--mega-menu') {
        this.toggleState = 'expanded'
        this.navigationMenuToggleState = true
        this.megaMenuToggleState = false
      } else {
        this.toggleState = 'collapsed'
        this.navigationMenuToggleState = false
      }
    },
  },

  watch: {
    '$route.path'() {
      this.toggleState = 'collapsed'
      this.navigationMenuToggleState = false
      this.megaMenuToggleState = false
    },

    megaMenuToggleState(megaMenuToggleState) {
      if (megaMenuToggleState === true) this.toggleState = 'expanded--mega-menu'
      else if (this.navigationMenuToggleState) this.toggleState = 'expanded'
      else if (megaMenuToggleState === false) this.toggleState = 'collapsed'
    },
  },
}
</script>

<style lang="scss" scoped>
.header-component {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: white;

  &__navigation {
    padding: $spacing__micro--md 0;
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
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    @include desktops {
      position: absolute;
      top: 100%;
      right: 0;
      left: 0;
      bottom: unset;
      height: auto;
    }
  }
}
</style>