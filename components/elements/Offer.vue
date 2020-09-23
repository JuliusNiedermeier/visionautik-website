<template>
  <div class="offer-component">
    <nuxt-link :to="url">
      <img class="offer-component__image" :src="image" />
      <div class="offer-component__info">
        <h6 class="offer-component__info__title">{{title}}</h6>
        <p class="offer-component__info__description">{{description}}</p>
        <div class="offer-component__info__bottom">
          <h6 v-if="price">{{price}}€</h6>
          <va-tag :tag="tag" v-if="tag" />
        </div>
      </div>
    </nuxt-link>
  </div>
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
        case this.$api.types.repeatables.course:
          return `/offers/course/${this.uid}`
          break
        case this.$api.types.repeatables.event:
          return `/offers/event/${this.uid}`
          break
        case this.$api.types.repeatables.product:
          return `/offers/product/${this.uid}`
          break
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.offer-component {
  min-width: 30rem;
  max-width: 50rem;

  a {
    background: initial;
    color: initial;
  }

  &__image {
    width: 100%;
    object-fit: cover;
  }

  &__info {
    background-color: white;
    padding: 2rem;

    &__title {
      margin: 0;
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