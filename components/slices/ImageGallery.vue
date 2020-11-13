<template>
  <div class="image-gallery-slice">
    <div class="image-gallery-slice__gallery">
      <div
        class="image-gallery-slice__gallery__thumbnail"
        v-for="(item, index) of slice.items"
        :key="index"
        @click="showImage(index)"
      >
        <div class="image-gallery-slice__gallery__thumbnail__overlay">
          <va-icon name="add" />
        </div>
        <img :src="item.image.thumbnail.url" />
      </div>
    </div>
    <div
      class="image-gallery-slice__modal"
      :class="{ show: showModal }"
      @click="showModal = false"
    >
      <img
        :src="slice.items[imageIndex].image.url"
        v-if="imageIndex !== null"
      />
    </div>
  </div>
</template>

<script>
import Icon from '@/components/elements/Icon'
export default {
  components: { 'va-icon': Icon },
  props: {
    slice: Object,
  },
  data() {
    return {
      showModal: false,
      imageIndex: null,
    }
  },

  watch: {
    showModal(showModal) {
      if (showModal) {
        window.addEventListener('scroll', this.handleScroll)
      } else {
        window.removeEventListener('scroll', this.handleScroll)
      }
    },
  },

  methods: {
    handleScroll() {
      this.showModal = false
    },

    showImage(index) {
      this.imageIndex = index
      this.showModal = true
    },
  },
}
</script>

<style lang="scss" scoped>
.image-gallery-slice {
  &__gallery {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0;

    @include desktops {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    }

    &__thumbnail {
      position: relative;

      &:hover {
        cursor: pointer;

        .image-gallery-slice__gallery__thumbnail__overlay {
          opacity: 1;
        }
      }

      &__overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: transparentize($color__blue--base, $amount: 0.25);
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
      }

      img {
        width: 100%;
        object-fit: cover;
        display: block;
      }
    }
  }

  &__modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: transparentize($color__grey--dark, $amount: 0.1);
    z-index: 1;
    opacity: 0;
    transition: opacity $duration--fast ease;
    pointer-events: none;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include desktops {
      padding: $spacing__macro--xs;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      transform: scale(0.9);
      transition: transform $duration--fast ease;
    }

    &.show {
      opacity: 1;
      pointer-events: all;

      img {
        transform: scale(1);
      }
    }
  }
}
</style>