<template>
  <form
    class="va-mo--Form"
    :class="{ pending: state === 'pending' }"
    @submit.prevent="handleSubmit"
  >
    <component
      class="va-at--Form__input"
      v-for="(field, index) of fields"
      :key="index"
      :is="computeComponent(field.type)"
      :disabled="state === 'pending'"
      v-bind="{ ...field, name: field.dataKey }"
      >{{ field.placeholder }}</component
    >
  </form>
</template>

<script>
import Input from '@/components/atoms/Input.vue'
import Button from '@/components/atoms/Button.vue'
export default {
  name: 'va-mo--Form',
  props: {
    fields: Array,
    action: Function,
    state: String,
  },

  watch: {
    state(state) {
      if (state === 'success') this.$el.reset()
    },
  },

  methods: {
    computeComponent(type) {
      return type === 'submit' || type === 'button' ? Button : Input
    },

    handleSubmit(submitEvent) {
      let output = {}
      this.fields
        .filter((field) => field.dataKey)
        .forEach(
          (field) =>
            (output[field.dataKey] =
              submitEvent.target.elements[field.dataKey].value)
        )
      this.$emit('submit', output)
    },
  },
}
</script>

<style lang="scss" scoped>
.va-mo--Form {
  display: flex;
  flex-direction: column;
  gap: $spacing--micro--xl;

  &.pending {
    opacity: 0.5;
    cursor: progress;

    * {
      pointer-events: none;
    }
  }
}
</style>