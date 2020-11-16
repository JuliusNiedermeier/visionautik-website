<template>
  <nav
    class="va-mo--NavigationMenu"
    :class="toggleState ? 'expanded' : 'collapsed'"
  >
    <ul class="va-mo--NavigationMenu__list">
      <li
        class="va-mo--NavigationMenu__list__item"
        v-for="navigationLink in navigationLinks"
        :key="navigationLink.name"
      >
        <nuxt-link
          :to="navigationLink.url"
          @click.native="handleLinkClick(navigationLink)"
          @mouseenter.native="handleLinkClick(navigationLink)"
          :event="navigationLink.megaMenuComponent ? '' : 'click'"
          class="va-mo--NavigationMenu__list__item__link"
          :class="{
            'va-mo--NavigationMenu__list__item__link--root':
              navigationLink.isRoot,
          }"
          ><small>{{ navigationLink.name }}</small></nuxt-link
        >
      </li>
      <li class="va-mo--NavigationMenu__list__item">
        <nuxt-link to="cart">
          <button class="va-mo--NavigationMenu__list__cart-button">
            <va-at--Icon name="cart" />
            <span class="snipcart-items-count"></span>
            <!-- <span class="snipcart-total-price"></span> -->
          </button>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import Icon from '@/components/atoms/Icon'
import OffersMegaMenu from '@/components/organisms/OffersMegaMenu'
export default {
  name: 'va-mo--NavigationMenu',
  components: { 'va-at--Icon': Icon },

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
      if (!navigationLink.megaMenuComponent) {
        this.emitMegaMenuToggleStateUpdate(false)
      } else {
        this.emitMegaMenuComponentUpdate(navigationLink.megaMenuComponent)
        this.emitMegaMenuToggleStateUpdate(true)
      }
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
.va-mo--NavigationMenu {
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

    .va-mo--NavigationMenu__list {
      @include slide-animation();
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
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }

    &__item {
      padding: $spacing__micro--xl;

      @include desktops {
        padding: 0;
        margin-left: $spacing__micro--xl;
      }

      &__link {
        font-weight: bold;
        text-transform: uppercase;
        color: $color__blue--base;

        &:hover {
          color: $color__blue--light;
          background: none;
        }

        &.nuxt-link-active:not(&--root) {
          color: $color__red--base;
        }

        &.nuxt-link-exact-active {
          color: $color__red--base;
        }
      }
    }

    &__cart-button {
      background-color: $color--lilac--base;
      color: $color--blue--light;
    }
  }
}
</style>