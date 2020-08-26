<template>
  <article class="offer-list-item-component">
    <nuxt-link class="offer-list-item-component__link" :to="link">
      <img class="offer-list-item-component__link__image" :src="image" />
      <h5 class="offer-list-item-component__link__title">{{title}}</h5>
      <p class="offer-list-item-component__link__description">{{description}}</p>
    </nuxt-link>
  </article>
</template>

<script>
export default {
  props: {
    link: String,
    image: String,
    title: String,
    description: String,
  },
}
</script>

<style lang="scss" scoped>
.offer-list-item-component {
  &__link {
    background: initial !important;

    * {
      color: initial;
    }

    &__image {
      width: 100%;
      object-fit: cover;
    }

    &__title {
      margin-bottom: 0;
    }
  }
}
</style>