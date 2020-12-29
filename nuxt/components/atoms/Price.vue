<script>
export default {
  name: 'va-at--Price',
  props: { price: Number },
  render() {
    return this.$scopedSlots.default({ priceLabel: this.formattedPrice })
  },
  computed: {
    formattedPrice() {
      if (typeof this.price === 'undefined') return
      else if (this.price === 0) return this.$t('global.ecommerce.free')
      else if (!this.price) return this.$t('global.ecommerce.notAvailable')
      else return this.$n(this.price, 'currency')
    },
  },
}
</script>