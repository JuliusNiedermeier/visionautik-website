<template>
  <nuxt-link :to="url" class="offer-component">
    <img class="offer-component__image" :src="image" />
    <div class="offer-component__info">
      <h4 class="offer-component__info__title">{{ title }}</h4>
      <small class="offer-component__info__description">
        {{ description }}
      </small>
      <div class="offer-component__info__bottom">
        <h6 v-if="price">{{ price }}€</h6>
        <va-tag :tag="tag" v-if="tag" />
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import Tag from '@/components/elements/Tag'
export default {
  components: { 'va-tag': Tag },
  props: {
    image: String,
    title: String,
    description: String,
    price: Number | String,
    uid: String,
    type: String,
    tag: String,
  },

  computed: {
    url() {
      switch (this.type) {
        case this.$api.types.repeatables.offer.typeName:
          return `/offers/offer/${this.uid}`
          break
        case this.$api.types.repeatables.product.typeName:
          return `/offers/product/${this.uid}`
          break
        case this.$api.types.repeatables.blogPost.typeName:
          return `/blog/${this.uid}`
          break
        default:
          return '/404'
          break
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.offer-component {
  min-width: $spacing__macro--xl;
  width: $spacing__macro--xl;
  border-bottom: 1px solid $color__lilac--base;

  background: initial;
  color: initial;

  &:hover {
    background: initial;
    color: initial;
  }

  &__image {
    width: 100%;
    object-fit: cover;
  }

  &__info {
    margin: $spacing__micro--md 0;

    &__title {
      margin: 0;
    }

    &__description {
      margin: $spacing__micro--md 0;
      display: block;
    }

    &__bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h6 {
        margin: 0;
      }
    }
  }
}
</style>