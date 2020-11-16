<template>
  <nuxt-link :to="url" class="va-mo--Offer">
    <img class="va-mo--Offer__image" :src="image" />
    <div class="va-mo--Offer__info">
      <h4 class="va-mo--Offer__info__title">{{ title }}</h4>
      <small class="va-mo--Offer__info__description">
        {{ description }}
      </small>
      <div class="va-mo--Offer__info__bottom">
        <h6 class="va-mo--Offer__info__bottom__price" v-if="price">
          {{ price }}€
        </h6>
        <va-at--tag :tag="tag" v-if="tag" />
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import Tag from '@/components/atoms/Tag.vue'
export default {
  components: { 'va-at--tag': Tag },
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
          return `/offers/activity/${this.uid}`
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
.va-mo--Offer {
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

      &__price {
        margin: 0;
      }
    }
  }
}
</style>