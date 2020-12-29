<template>
  <div class="va-sl--ImageGallery">
    <div class="va-sl--ImageGallery__gallery">
      <div
        class="va-sl--ImageGallery__gallery__thumbnail"
        v-for="(item, index) of slice.items"
        :key="index"
        @click="showImage(index)"
      >
        <div class="va-sl--ImageGallery__gallery__thumbnail__overlay">
          <va-at--Icon name="add" />
        </div>
        <img :src="item.image.thumbnail.url" />
      </div>
    </div>
    <div
      class="va-sl--ImageGallery__modal"
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
import Icon from '@/components/atoms/Icon'
export default {
  name: 'va-sl--ImageGallery',
  components: { 'va-at--Icon': Icon },
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
        this.$store.commit('modalBackdrop/activate', 1)
        window.addEventListener('scroll', this.handleScroll)
      } else {
        this.$store.commit('modalBackdrop/deactivate')
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
.va-sl--ImageGallery {
  &__gallery {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    // gap: $spacing--micro--md;

    @include desktops {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    }

    &__thumbnail {
      position: relative;

      &:hover {
        cursor: pointer;

        .va-sl--ImageGallery__gallery__thumbnail__overlay {
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
    z-index: 2;
    @include page-margin;
    opacity: 0;
    transition: opacity $duration--fast ease;
    pointer-events: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $spacing--micro--xl 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
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