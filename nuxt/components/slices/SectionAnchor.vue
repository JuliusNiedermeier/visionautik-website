<template>
  <span
    class="va-sl--SectionAnchor section-anchor"
    :id="slice.primary.id"
    data-component-name="sectionAnchor"
    :data-section-id="slice.primary.id"
    :data-section-label="slice.primary.label"
    :data-section-color="slice.primary.color"
  />
</template>

<script>
export default {
  name: 'va-sl--SectionAnchor',
  props: ['slice'],
}
</script>

<style>
</style>