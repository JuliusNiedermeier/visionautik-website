<template>
  <div class="va-el--AddToCart">
    <div class="va-el--AddToCart__custom-fields">
      <select
        v-for="customField in customFields"
        :key="customField.key"
        :data-custom-field-key="customField.key"
        @change="handleCustomFieldSelectionChange"
      >
        <option disabled selected value hidden>Select an option</option>
        <option
          v-for="option in customField.options"
          :key="option.name"
          :selected="$route.query[customField.key] === option.name"
        >
          {{ option.name }}
        </option>
      </select>
    </div>
    <small class="va-el--AddToCart__price" v-if="currentPrice">
      {{ $intlFormatter.currency(currentPrice) }}
    </small>
    <button
      class="va-el--AddToCart__button snipcart-add-item"
      :disabled="!currentPrice"
      v-bind="{
        ...$snipcart.bindProduct({
          id,
          price: basePrice,
          storeUrl: url,
          name,
          description,
        }),
        ...$snipcart.customfields(customFieldsFormatted),
      }"
    >
      Add to cart
    </button>
  </div>
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
    customFieldsFormatted() {
      const customFields = []
      for (const customField of this.customFields) {
        if (!customField.options.length > 0) continue
        const fieldLabel = customField.label
        const fieldOptions = customField.options
          .map(
            (option) =>
              `${option.name}[${option.priceDifference > 0 ? '+' : ''}${
                option.priceDifference
              }]`
          )
          .join('|')
        const fieldDefaultOption = this.$route.query[customField.key]
        customFields.push({
          name: fieldLabel,
          options: fieldOptions,
          value: fieldDefaultOption
            ? fieldDefaultOption
            : this.customFields[0].options[0].name,
        })
      }
      return customFields
    },

    currentPrice() {
      let currentPrice = this.basePrice
      for (const customField of this.customFields) {
        let selectedOption = customField.options.find(
          (option) => option.name === this.$route.query[customField.key]
        )
        if (!selectedOption) return null
        currentPrice += selectedOption.priceDifference
      }
      return currentPrice
    },
  },

  methods: {
    handleCustomFieldSelectionChange(event) {
      this.$router.replace({
        query: { [event.target.dataset.customFieldKey]: event.target.value },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.va-el--AddToCart {
  &__custom-fields {
    select {
      width: 100%;
      margin-bottom: $spacing__micro--xl;
    }
  }

  &__price {
    display: block;
    padding: $spacing__micro--md $spacing__micro--lg;
    margin: 0;
    background-color: $color__blue--light;
    color: white;
    text-align: center;
  }

  &__button {
    width: 100%;
  }
}
</style>