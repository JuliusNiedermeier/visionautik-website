<template>
  <div class="product-sidebar-component">
    <va-sidebar>
      <template slot="top"></template>
      <template slot="bottom">
        <div class="product-sidebar-component__bottom">
          <div class="product-sidebar-component__bottom__product-options">
            <select
              v-for="slice of offer.options__slices"
              :key="slice.primary.label"
              :data-product-option-label="slice.primary.label"
              @change="handleProductOptionSelected"
            >
              <option disabled selected value hidden>{{slice.primary.label}}</option>
              <option
                v-for="option of slice.items"
                :key="option.label"
                :selected="$route.query[slice.primary.label] === option.label"
              >{{option.label}}</option>
            </select>
          </div>
          <div class="product-sidebar-component__bottom__price">{{currentPrice}} €</div>
          <va-add-to-cart-button
            v-if="!$fetchState.pending"
            :name="offer.general__heading"
            :description="offer.general__excerpt"
            :basePrice="offer.general__price"
            :customFields="customFields"
          />
        </div>
      </template>
    </va-sidebar>
  </div>
</template>

<script>
import Sidebar from '@/components/elements/Sidebar'
import Icon from '@/components/elements/Icon'
import AddToCartButton from '@/components/elements/AddToCartButton'
export default {
  components: {
    'va-sidebar': Sidebar,
    'va-icon': Icon,
    'va-add-to-cart-button': AddToCartButton,
  },

  data() {
    return {
      offer: {},
    }
  },

  computed: {
    currentPrice() {
      if (this.$fetchState.pending) return
      let price = this.offer.general__price

      for (const slice of this.offer.options__slices) {
        const option = slice.items.find(
          (option) => option.label === this.$route.query[slice.primary.label]
        )
        if (option) price += option.price_increase
      }

      return price
    },

    customFields() {
      const fields = []
      for (const customField of this.offer.options__slices) {
        const options = customField.items.map((option) => {
          return {
            name: option.label,
            priceDifference: option.price_increase,
          }
        })

        if (this.$route.query[customField.primary.label]) {
          const selectedProductOptionIndex = options.findIndex(
            (option) =>
              option.name === this.$route.query[customField.primary.label]
          )
          if (selectedProductOptionIndex !== 0) {
            const selectedProductOption = options.splice(
              selectedProductOptionIndex,
              1
            )[0]
            options.unshift(selectedProductOption)
          }
        }

        fields.push({
          name: customField.primary.label,
          options,
        })
      }

      return fields
    },
  },

  methods: {
    handleProductOptionSelected(event) {
      this.$router.replace({
        query: {
          ...this.$route.query,
          [event.target.dataset.productOptionLabel]: event.target.value,
        },
      })
    },
  },

  async fetch() {
    const type = this.$api.types.repeatables[this.$route.params.type]
    const query = new this.$api.Query(
      [this.$prismic.predicates.at(`my.${type}.uid`, this.$route.params.offer)],
      {
        fetch: [
          type + '.general__heading',
          type + '.general__excerpt',
          type + '.general__featured_image',
          type + '.general__price',
          type + '.options__slices',
        ],
      }
    )

    const apiResponse = await query.get()

    if (!apiResponse) return
    this.offer = apiResponse.results[0].data
  },
}
</script>

<style lang="scss" scoped>
.product-sidebar-component {
  height: 100%;

  &__bottom {
    &__product-options {
      select {
        width: 100%;
      }

      > select + select {
        margin-top: 2rem;
      }

      margin-bottom: 2rem;
    }

    &__price {
      padding: 1rem 1.5rem;
      background-color: $color--blue--light;
      color: white;
      font-size: 1.6rem;
      text-align: center;
    }
  }
}

button {
  width: 100%;
}
</style>