<template>
  <div
    class="static-section-component"
    :style="`height: ${height}px`"
    ref="staticSection"
    :class="{'ready': height}"
  >
    <div class="static-section-component__static-body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      height: null,
      position: null,
    }
  },
  mounted() {
    this.height = this.$refs.staticSection.offsetHeight
  },
}
</script>

<style lang="scss" scoped>
.static-section-component.ready {
  > .static-section-component__static-body {
    position: fixed;
    left: 0;
    right: 0;
    z-index: -1;
  }
}
</style>