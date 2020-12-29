<template>
  <!-- FIXME: customFieldsValidated returns true if ppid is defined but it doesn't match with any customField -->
  <div class="va-mo--AddToCart">
    <div class="va-mo--AddToCart__custom-fields">
      <select
        class="va-mo--AddToCart__custom-fields__select"
        :class="{ required: customField.required }"
        v-for="customField in customFields"
        :key="customField.queryKey"
        :data-query-key="customField.queryKey"
        @change="handleCustomFieldSelectionChange"
      >
        <option
          class="va-mo--AddToCart__custom-fields__select__option va-mo--AddToCart__custom-fields__select__option--placeholder"
          disabled
          selected
          value
          hidden
        >
          {{ customField.label }}
        </option>
        <option
          class="va-mo--AddToCart__custom-fields__select__option"
          v-for="option in customField.options"
          :key="option.id"
          :selected="$route.query[customField.queryKey] === option.id"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
    <va-at--Price :price="calculatedPrice" v-if="customFieldsValidated">
      <small class="va-mo--AddToCart__price" slot-scope="{ priceLabel }">
        {{ priceLabel }}
      </small>
    </va-at--Price>
    <va-at--Button
      class="va-mo--AddToCart__button"
      :class="{ 'snipcart-add-item': product.category !== 'event' }"
      :iconName="product.category !== 'event' ? 'cart' : 'open'"
      :disabled="!customFieldsValidated"
      v-bind="buttonAttributes"
      grow
    >
      {{
        product.category !== 'event'
          ? $t('global.ecommerce.addToCart')
          : $t('global.ecommerce.toEventbrite')
      }}
    </va-at--Button>
  </div>
</template>

<script>
import Price from '@/components/atoms/Price.vue'
import Button from '@/components/atoms/Button.vue'
export default {
  name: 'va-mo--AddToCart',
  components: { 'va-at--Price': Price, 'va-at--Button': Button },

  props: {
    disabled: Boolean,
    product: Object,
    customFields: Array,
    quantity: Number,
  },

  computed: {
    productFormatted() {
      return {
        storeUrl: this.$route.path,
        id: this.product.id,
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        quantity: this.quantity | 1,
      }
    },

    customFieldsFormatted() {
      return this.customFields
        .filter((customField) => customField.options.length > 0)
        .map((customField) => {
          const formatted = {
            name: customField.label,
            required: customField.required,
            options: customField.options
              .map(
                (option) =>
                  `${option.label}[${option.priceDifference > 0 ? '+' : ''}${
                    option.priceDifference
                  }]`
              )
              .join('|'),
          }

          if (this.$route.query[customField.queryKey]) {
            const selectedOption = customField.options.find(
              (option) => option.id === this.$route.query[customField.queryKey]
            )

            if (selectedOption) formatted.value = selectedOption.label
          }

          return formatted
        })
    },

    optionsPriceDifference() {
      if (this.customFields.length === 0) return this.product.price

      const prices = this.customFields
        .filter(
          (customField) =>
            customField.options &&
            customField.options.length > 0 &&
            this.$route.query[customField.queryKey]
        )
        .map(
          (customField) =>
            customField.options.find(
              (option) => option.id === this.$route.query[customField.queryKey]
            )?.priceDifference
        )

      if (prices.length === 0) return 0

      return prices.reduce((previous, next) => previous + next)
    },

    customFieldsValidated() {
      const invalidCustomFields = this.customFields.filter(
        (customField) =>
          customField.required && !this.$route.query[customField.queryKey]
      )
      return invalidCustomFields.length > 0 ? false : true
    },

    calculatedPrice() {
      return this.product.price + this.optionsPriceDifference
    },

    buttonAttributes() {
      if (this.product.category !== 'event') {
        return {
          ...this.$snipcart.bindProduct(this.productFormatted),
          ...this.$snipcart.customfields(this.customFieldsFormatted),
        }
      } else {
        return { to: this.product.sellerLink.url }
      }
    },
  },

  methods: {
    handleCustomFieldSelectionChange(event) {
      const customField = this.customFields.find(
        (customField) => customField.queryKey === event.target.dataset.queryKey
      )

      if (!customField) return

      const selectedOption = customField.options.find(
        (option) => option.label === event.target.value
      )

      if (!selectedOption) return

      this.$router.replace({
        query: {
          ...this.$route.query,
          [event.target.dataset.queryKey]: selectedOption.id,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.va-mo--AddToCart {
  &__custom-fields {
    &__select {
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