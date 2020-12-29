<template>
  <div class="va-sl--Accordion">
    <va-mo--DropDown
      class="va-sl--Accordion__drop-down"
      v-for="(section, index) of slice.items"
      :key="index"
      :expanded="section.expanded"
    >
      <template slot="header">
        <h3 class="va-sl--Accordion__drop-down__heading">
          {{ section.heading }}
        </h3>
      </template>
      <template slot="content">
        <prismic-rich-text
          class="va-sl--Accordion__drop-down__content"
          :field="section.text"
        />
      </template>
    </va-mo--DropDown>
  </div>
</template>

<script>
import DropDown from '@/components/molecules/DropDown.vue'
export default {
  name: 'va-sl--Accordion',
  components: { 'va-mo--DropDown': DropDown },
  props: { slice: Object },
}
</script>

<style lang="scss" scoped>
.va-sl--Accordion {
  &__drop-down {
    & + & {
      margin-top: $spacing--micro--xl;
    }

    &__heading {
      margin-left: $spacing--micro--xl;
    }

    &__content {
      padding: $spacing--micro--xl;
    }
  }
}
</style>