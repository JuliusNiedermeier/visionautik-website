<template>
  <div class="va-mo--PageSectionHeader">
    <h2 class="va-mo--PageSectionHeader__heading">{{ heading }}</h2>
    <va-at--Button
      v-if="buttonLabel"
      class="va-mo--PageSectionHeader__button"
      iconName="chevron-right"
      :to="buttonLink"
      >{{ buttonLabel }}</va-at--Button
    >
  </div>
</template>

<script>
import Button from '@/components/atoms/Button.vue'
export default {
  name: 'va-mo--PageSectionHeader',
  components: { 'va-at--Button': Button },
  props: {
    heading: String,
    buttonLabel: String,
    buttonLink: Object,
  },
}
</script>

<style lang="scss" scoped>
.va-mo--PageSectionHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>