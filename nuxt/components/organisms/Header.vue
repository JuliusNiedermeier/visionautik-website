<template>
  <header class="va-or--Header">
    <va-at--AirmailStripe />
    <va-or--NotificationList />
    <div class="va-or--Header__navigation">
      <nuxt-link to="/">
        <va-at--Logo />
      </nuxt-link>
      <va-mo--NavigationMenu
        class="va-or--Header__navigation__menu"
        :toggleState="navigationMenuToggleState"
        @update:megaMenuComponent="setMegaMenuComponent"
        @update:megaMenuToggleState="setMegaMenuToggleState"
      />
      <va-mo--NavigationMenuToggle
        class="va-or--Header__navigation__menu-toggle"
        :toggleState="toggleState"
        @click.native="setNewToggleState"
      />
    </div>
    <va-mo--MegaMenu
      class="va-or--Header__mega-menu"
      :expand="megaMenuToggleState"
      @update:megaMenuToggleState="setMegaMenuToggleState"
    >
      <component :is="megaMenuComponent" />
    </va-mo--MegaMenu>
  </header>
</template>

<script>
import AirmailStripe from '@/components/atoms/AirmailStripe'
import NotificationList from '@/components/organisms/NotificationList'
import Logo from '@/components/atoms/Logo'
import NavigationMenu from '@/components/molecules/NavigationMenu'
import NavigationMenuToggle from '@/components/atoms/NavigationMenuToggle'
import MegaMenu from '@/components/molecules/MegaMenu'
export default {
  name: 'va-header',
  components: {
    'va-at--AirmailStripe': AirmailStripe,
    'va-or--NotificationList': NotificationList,
    'va-at--Logo': Logo,
    'va-mo--NavigationMenu': NavigationMenu,
    'va-mo--NavigationMenuToggle': NavigationMenuToggle,
    'va-mo--MegaMenu': MegaMenu,
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
.va-or--Header {
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