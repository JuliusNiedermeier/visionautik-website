<template>
  <div class="mega-menu-component" :class="{ expanded: expand }">
    <div class="mega-menu-component__body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'va-mega-menu',
  props: {
    expand: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  methods: {
    emitMegaMenuToggleStateUpdate() {
      this.$emit('update:megaMenuToggleState', false)
    },
  },

  mounted() {
    this.$el.addEventListener('mouseleave', this.emitMegaMenuToggleStateUpdate)
  },

  watch: {
    expand(expand) {
      if (expand) this.$store.commit('modalBackdrop/activate')
      else this.$store.commit('modalBackdrop/deactivate')
    },
  },
}
</script>

<style lang="scss" scoped>
.mega-menu-component {
  background-color: $color--grey--light;
  overflow: hidden;
  padding-top: 8rem;

  clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
  transition: clip-path $duration--fast ease;

  @include desktops {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    padding-top: unset;
    // border-top: 1px solid $color--lilac--base;
  }

  &__body {
    @include page-margin;
    // border-top: 1px solid $color--lilac--base;
    padding: 2rem 0;
    max-height: 75vh;
    overflow-y: auto;
  }

  &.expanded {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);

    @include desktops {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }

    .mega-menu-component__body {
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

      @include desktops {
        animation: none;
      }
    }
  }
}
</style>