<template>
  <svg xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 0 24 24" width="1.25rem">
    <path :d="iconPaths[name]" fill="currentColor" />
  </svg>
</template>

<script>
import iconPaths from '@/assets/svg/icons/iconPaths.json'
export default {
  props: {
    name: String,
  },

  data() {
    return { iconPaths }
  },
}
</script>

<style>
</style>