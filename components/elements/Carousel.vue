<template>
  <div class="carousel-component" :class="{gap: gap}" ref="component">
    <div
      class="carousel-component__track"
      :class="{dragging: dragInitialClientX !== null}"
      ref="track"
      :style="`transform: translateX(${offset + drag}px)`"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    gap: Boolean,
    fullwidth: Boolean,
  },

  data() {
    return {
      offset: 0,
      drag: 0,
      dragInitialClientX: null,
      reachedStart: true,
      reachedEnd: false,
    }
  },

  watch: {},

  methods: {
    handleMouseDown(e) {
      this.dragInitialClientX = e.clientX
      this.$refs.track.addEventListener('mousemove', this.handleMouseMove)
    },
    handleTouchStart(e) {
      // e.preventDefault() // Performance issues on android
      this.dragInitialClientX = e.touches[0].clientX
      this.$refs.track.addEventListener('touchmove', this.handleTouchMove)
    },

    handleMouseMove(e) {
      e.preventDefault()
      this.drag = e.clientX - this.dragInitialClientX
    },
    handleTouchMove(e) {
      // e.preventDefault() // Performance issues on android
      this.drag = e.touches[0].clientX - this.dragInitialClientX
    },

    handleMouseUp() {
      this.dragInitialClientX = null
      this.offset += this.drag
      this.drag = 0
      this.$refs.track.removeEventListener('mousemove', this.handleMouseMove)
      this.snapIntoNearestSlide()
    },
    handleTouchEnd() {
      this.$refs.track.removeEventListener('touchmove', this.handleTouchMove)
      this.handleMouseUp()
    },

    handleMouseLeave() {
      this.handleMouseUp()
    },
    handleTouchCancel() {
      this.$refs.track.removeEventListener('touchmove', this.handleTouchMove)
      this.handleMouseLeave()
    },

    snapIntoNearestSlide() {
      let smallestOffsetLeft
      for (const slide of this.$refs.track.children) {
        const slideOffsetLeft =
          slide.getBoundingClientRect().left -
          this.$refs.component.getBoundingClientRect().left

        if (
          typeof smallestOffsetLeft === 'undefined' ||
          Math.abs(slideOffsetLeft) <= Math.abs(smallestOffsetLeft)
        ) {
          smallestOffsetLeft = slideOffsetLeft
        }
      }
      this.offset += -smallestOffsetLeft

      this.preventOverflow()
    },

    preventOverflow() {
      const offsetRight =
        this.$refs.track.getBoundingClientRect().right -
        this.$refs.component.getBoundingClientRect().right

      if (this.offset !== 0 && offsetRight < 0) {
        this.offset = -(
          this.$refs.track.offsetWidth - this.$refs.component.offsetWidth
        )
      }
    },
  },

  mounted() {
    this.$refs.track.addEventListener('click', (e) => e.stopPropagation())

    this.$refs.track.addEventListener('mousedown', this.handleMouseDown)
    this.$refs.track.addEventListener('touchstart', this.handleTouchStart)

    this.$refs.track.addEventListener('mouseup', this.handleMouseUp)
    this.$refs.track.addEventListener('touchend', this.handleTouchEnd)

    this.$refs.track.addEventListener('mouseleave', this.handleMouseLeave)
    this.$refs.track.addEventListener('touchcancel', this.handleTouchCancel)
  },
}
</script>

<style lang="scss" scoped>
.carousel-component {
  &.gap {
    * + * {
      margin-left: 2rem;
    }
  }

  &__track {
    width: min-content;
    display: flex;
    justify-content: flex-start;
    transition: transform $duration--fast ease;

    &.dragging {
      transition: none;
    }
  }
}

.item + .item {
  margin-left: 2rem;
}
</style>