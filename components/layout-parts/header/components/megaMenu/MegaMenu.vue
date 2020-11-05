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
}
</script>

<style lang="scss" scoped>
.mega-menu-component {
  background-color: inherit;
  background-color: white;
  overflow: hidden;
  transition-property: height, clip-path;
  transition-duration: $duration--fast;
  transition-timing-function: ease;

  clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);

  @include desktops {
    clip-path: unset !important;
    height: 0;
  }

  &__body {
    @include page-margin;
  }

  &.expanded {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);

    @include desktops {
      height: 300px;
    }

    transition: all $duration--fast ease;

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
    }
  }
}
</style>