<template>
  <nuxt-link
    :to="url"
    class="va-mo--Offer"
    :class="{ 'fixed-width': fixedWidth }"
  >
    <img class="va-mo--Offer__image" :src="image" />
    <div class="va-mo--Offer__info">
      <h4 class="va-mo--Offer__info__title">{{ title }}</h4>
      <small class="va-mo--Offer__info__description">
        {{ description }}
      </small>
      <div class="va-mo--Offer__info__bottom">
        <va-at--tag
          class="va-mo--Offer__info__bottom__tag"
          :tag="tag"
          v-if="tag"
        />
        <div
          class="va-mo--Offer__info__bottom__hosts"
          v-if="hosts && hosts.length > 0"
        >
          <img
            class="va-mo--Offer__info__bottom__hosts__host"
            v-for="(host, index) of hosts"
            :key="index"
            :src="host.general__featured_image.thumbnail.url"
          />
        </div>
        <va-at--Price :price="price">
          <h4
            class="va-mo--Offer__info__bottom__price"
            slot-scope="{ priceLabel }"
          >
            {{ priceLabel }}
          </h4>
        </va-at--Price>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import Tag from '@/components/atoms/Tag.vue'
import Price from '@/components/atoms/Price.vue'
import { repeatables } from '@/assets/js/types.js'
export default {
  components: { 'va-at--tag': Tag, 'va-at--Price': Price },
  name: 'va-mo--Offer',
  props: {
    fixedWidth: Boolean,
    image: String,
    title: String,
    description: String,
    uid: String,
    type: String,
    tag: String,
    price: Number,
    hosts: Array,
  },

  computed: {
    url() {
      switch (this.type) {
        case repeatables.offer.typeName:
          return `/offers/activity/${this.uid}`
          break
        case repeatables.product.typeName:
          return `/offers/product/${this.uid}`
          break
        case repeatables.blogPost.typeName:
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
  position: relative;
  border-bottom: $spacing--micro--xs solid $color__lilac--base;
  display: flex;
  flex-direction: column;
  background-color: white;

  &.fixed-width {
    min-width: $spacing__macro--xl;
    width: $spacing__macro--xl;
  }

  &:hover {
    background: initial;
    color: initial;
    background-color: floralwhite;
  }

  &__image {
    width: 100%;
    object-fit: cover;
  }

  &__info {
    flex: 1;
    // margin: $spacing__micro--md 0;
    padding: $spacing--micro--xl;
    display: flex;
    flex-direction: column;

    &__title {
      margin: 0;
    }

    &__description {
      margin: $spacing__micro--md 0;
      display: block;
      flex: 1;
    }

    &__bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &__tag {
        margin-right: $spacing--micro--md;
      }

      &__hosts {
        flex: 1;
        overflow-x: hidden;
        display: flex;

        &__host {
          height: $spacing--micro--xl;
          width: $spacing--micro--xl;
          background-color: $color--lilac--base;
          object-fit: cover;
          margin-right: $spacing--micro--md;
        }
      }

      &__price {
        margin: 0;
      }
    }
  }
}
</style>