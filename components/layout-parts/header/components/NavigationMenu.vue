<template>
  <nav
    class="navigation-menu-component"
    :class="toggleState ? 'expanded' : 'collapsed'"
  >
    <ul class="navigation-menu-component__list">
      <li v-for="navigationLink in navigationLinks" :key="navigationLink.name">
        <nuxt-link
          :to="navigationLink.url"
          @click.native="handleLinkClick(navigationLink)"
          @mouseenter.native="handleLinkClick(navigationLink)"
          :event="navigationLink.megaMenuComponent ? '' : 'click'"
          :class="{
            'navigation-menu-component__list__item--only-exact-active':
              navigationLink.isRoot,
          }"
          >{{ navigationLink.name }}</nuxt-link
        >
      </li>
      <li>
        <nuxt-link to="cart">
          <button class="navigation-menu-component__list__cart-button">
            <va-icon name="cart" size="1.5rem" />
            <span class="snipcart-items-count"></span>
            <!-- <span class="snipcart-total-price"></span> -->
          </button>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import Icon from '@/components/elements/Icon'
import OffersMegaMenu from './megaMenu/megaMenus/OffersMegaMenu'
export default {
  name: 'va-navigation-menu',
  components: { 'va-icon': Icon },

  props: {
    toggleState: Boolean,
  },

  computed: {
    navigationLinks() {
      return [
        {
          name: this.$t('layout.header.navigationMenu.start'),
          url: '/',
          isRoot: true,
        },
        {
          name: this.$t('layout.header.navigationMenu.offers'),
          url: '/offers',
          megaMenuComponent: OffersMegaMenu,
        },
        // {
        //   name: this.$t('layout.header.navigationMenu.about'),
        //   url: '/about',
        // },
        // {
        //   name: this.$t('layout.header.navigationMenu.projects'),
        //   url: '/projects',
        // },
        // {
        //   name: this.$t('layout.header.navigationMenu.blog'),
        //   url: '/blog',
        // },
      ]
    },
  },

  methods: {
    handleLinkClick(navigationLink) {
      let megaMenuComponent, megaMenuToggleState

      if (!navigationLink.megaMenuComponent) {
        megaMenuComponent = null
        megaMenuToggleState = false
      } else {
        megaMenuComponent = navigationLink.megaMenuComponent
        megaMenuToggleState = true
      }

      this.emitMegaMenuComponentUpdate(megaMenuComponent)
      this.emitMegaMenuToggleStateUpdate(megaMenuToggleState)
    },

    emitMegaMenuComponentUpdate(megaMenuComponent) {
      this.$emit('update:megaMenuComponent', megaMenuComponent)
    },

    emitMegaMenuToggleStateUpdate(megaMenuToggleState) {
      this.$emit('update:megaMenuToggleState', megaMenuToggleState)
    },
  },
}
</script>

<style lang="scss" scoped>
.navigation-menu-component {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: white;
  transition: clip-path $duration--fast ease;
  display: none;

  @include desktops {
    display: initial;
    position: initial;
    clip-path: unset !important;
  }

  &.expanded {
    display: initial;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);

    .navigation-menu-component__list {
      @keyframes slidein {
        from {
          transform: translateX(-2rem);
        }

        to {
          transform: translateX(0);
        }
      }

      animation-name: slidein;
      animation-duration: $duration--medium;
      animation-timing-function: ease;
    }
  }

  &.collapsed {
    display: initial;
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @include page-margin;

    @include desktops {
      width: initial;
      margin: initial;
      text-align: initial;
    }

    li {
      padding: 2rem;
    }

    @include desktops {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;

      li {
        padding: 0;
        margin-left: 2.5rem;
      }
    }

    a {
      font-size: 1.6rem;
      font-weight: bold;
      text-transform: uppercase;
      color: $color--blue--base;

      &:hover {
        background: none;
        padding: initial;
      }
    }

    .nuxt-link-active:not(.navigation-menu-component__list__item--only-exact-active) {
      color: $color--red--base;
    }

    .nuxt-link-exact-active {
      color: $color--red--base;
    }

    &__cart-button {
      padding: 1rem;
      display: flex;
      align-items: center;

      > * + * {
        margin-left: 0.5rem;
      }
    }
  }
}
</style>