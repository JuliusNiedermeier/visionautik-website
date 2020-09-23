<template>
  <button
    :disabled="disabled"
    class="snipcart-add-item"
    :data-item-id="id || $route.params.offer"
    :data-item-url="url || $route.fullPath"
    :data-item-name="name"
    :data-item-description="description"
    :data-item-image="image"
    :data-item-price="basePrice"
    v-bind="customFieldAttributes"
  >Add to cart</button>
</template>

<script>
export default {
  props: {
    disabled: Boolean,
    id: String,
    url: String,
    basePrice: Number | String,
    name: String,
    description: String,
    image: String,
    customFields: Array,
  },

  computed: {
    customFieldAttributes() {
      if (!this.customFields) return
      let attributes = {}

      this.customFields.forEach((customField, index) => {
        attributes[`data-item-custom${index}-name`] = customField.name
        customField.options = customField.options.map((option) => {
          return `${option.name}[${option.priceDifference > 0 ? '+' : ''}${
            option.priceDifference
          }]`
        })
        customField.options = customField.options.join('|')
        attributes[`data-item-custom${index}-options`] = customField.options
      })

      return attributes
    },
  },
}
</script>

<style>
</style>