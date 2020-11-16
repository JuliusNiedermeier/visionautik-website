<template>
  <div class="va-mo--MegaMenu" :class="{ expanded: expand }">
    <div class="va-mo--MegaMenu__body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'va-mo--MegaMenu',
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
.va-mo--MegaMenu {
  background-color: $color__grey--light;
  overflow: hidden;
  padding-top: $spacing__macro--xs;

  clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
  transition: clip-path $duration--fast ease;

  @include desktops {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    padding-top: unset;
  }

  &__body {
    @include page-margin;
    padding: $spacing__micro--xl 0;
    max-height: 75vh;
    overflow-y: auto;
  }

  &.expanded {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);

    @include desktops {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }

    .va-mo--MegaMenu__body {
      @include slide-animation();

      @include desktops {
        animation: none;
      }
    }
  }
}
</style>