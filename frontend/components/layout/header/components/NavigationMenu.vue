<template>
  <nav class="navigation-menu-component" :class="toggleState">
    <ul class="navigation-menu-component__list">
      <li v-for="navigationLink in navigationLinks" :key="navigationLink.name">
        <nuxt-link
          :to="navigationLink.url"
          :class="{'navigation-menu-component__list__item--only-exact-active': navigationLink.isRoot}"
        >{{navigationLink.name}}</nuxt-link>
      </li>
      <li>
        <button>Newsletter</button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'va-navigation-menu',
  props: {
    toggleState: {
      type: String,
      required: true,
      validator(prop) {
        return /^collapsed$|^expanded$/.test(prop)
      },
    },
  },

  computed: {
    navigationLinks() {
      return [
        {
          name: this.$t('start'),
          url: '/',
          isRoot: true,
        },
        {
          name: this.$t('offers'),
          url: '/test',
        },
        {
          name: this.$t('about'),
          url: '/*',
        },
        {
          name: this.$t('projects'),
          url: '/*',
        },
        {
          name: this.$t('blog'),
          url: '/*',
        },
      ]
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
  background-color: ghostwhite;
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
  }
}
</style>

<i18n>
{
  "de": {
    "start": "Start",
    "offers": "Angebote",
    "about": "Über uns",
    "projects": "Projekte",
    "blog": "Blog"
  },
  "en": {
    "start": "Home",
    "offers": "Offers",
    "about": "About",
    "projects": "Projects",
    "blog": "Blog"
  }
}
</i18n>