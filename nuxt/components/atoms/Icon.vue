<template>
  <div
    class="va-at--Icon"
    v-html="html"
    :style="`height: ${size}; width: ${size};`"
  />
</template>

<script>
import { Base64 } from 'js-base64'
export default {
  name: 'va-at--Icon',

  props: {
    name: String,
    size: String,
  },
  data() {
    return {
      html: null,
    }
  },

  watch: {
    name(newName) {
      this.html = this.loadIconAsInlineSvg(newName)
    },
  },

  methods: {
    loadIconAsInlineSvg(name) {
      const svgBase64 = require(`@/assets/svg/icons/${name}.svg`).replace(
        'data:image/svg+xml;base64,',
        ''
      )
      return Base64.atob(svgBase64)
    },
  },

  created() {
    this.html = this.loadIconAsInlineSvg(this.name)
  },
}
</script>

<style lang="scss" scoped>
.va-at--Icon {
  height: $spacing__micro--lg;
  width: $spacing__micro--lg;
}
</style>

