<template>
  <div class="icon-component" v-html="html" :style="`height: ${size}; width: ${size};`" />
</template>

<script>
import { Base64 } from 'js-base64'
export default {
  props: {
    name: String,
    size: String,
  },
  data() {
    return {
      html: null,
    }
  },

  mounted() {
    const svgBase64 = require(`@/assets/svg/icons/${this.name}.svg`).replace(
      'data:image/svg+xml;base64,',
      ''
    )
    this.html = Base64.atob(svgBase64)
  },
}
</script>

<style lang="scss" scoped>
.icon-component {
  height: 1.25rem;
  width: 1.25rem;
}
</style>

