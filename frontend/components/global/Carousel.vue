<template>
  <div class="carousel-component">
    <ul
      class="carousel-component__track noselect"
      ref="carouselTrack"
      :style="`width: ${slideCount * 100}%; transform: translateX(-${100 / slideCount * activeSlideIndex}%) translateX(${manualDrag}px)`"
    >
      <slot />
    </ul>
    <div class="carousel-component__navigation-controls">
      <va-slider-navigation-controls
        :number="slideCount"
        :activeIndex="activeSlideIndex"
        @prev="handleNavClick('prev')"
        @next="handleNavClick('next')"
        @indicator-clicked="handleIndicatorClick"
      />
    </div>
  </div>
</template>

<script>
import Icon from '@/components/global/Icon'
import SliderNavigationControls from '@/components/global/SliderNavigationControls'
export default {
  name: 'va-carousel',
  components: {
    'va-icon': Icon,
    'va-slider-navigation-controls': SliderNavigationControls,
  },
  props: {
    randomize: Boolean,
    autoplayInterval: String,
  },
  data() {
    return {
      activeSlideIndex: null,
      slideCount: 0,
      initialXPosition: null,
      manualDrag: 0,
      autoplayIntervalId: null,
    }
  },
  watch: {
    activeSlideIndex(index, previousIndex) {
      if (index > this.slideCount - 1) this.activeSlideIndex = 0
      if (index < 0) this.activeSlideIndex = this.slideCount - 1

      const slides = this.$refs.carouselTrack.children

      try {
        slides[this.activeSlideIndex].classList.add('active')
        slides[previousIndex].classList.remove('active')
      } catch {}
    },
  },

  methods: {
    handleNavClick(direction) {
      if (!/^prev$||^next$/.test(direction)) return
      if (direction == 'prev') this.activeSlideIndex--
      if (direction == 'next') this.activeSlideIndex++
      this.stopAutoplay()
    },

    handleIndicatorClick(index) {
      this.activeSlideIndex = index
      this.stopAutoplay()
    },

    handleMouseDown(mouseEvent) {
      this.mouseDown = true
      this.initialXPosition = mouseEvent.x
      this.$refs.carouselTrack.classList.add('scrolling')

      this.$refs.carouselTrack.addEventListener(
        'mousemove',
        this.handleMouseMove
      )

      this.$refs.carouselTrack.addEventListener(
        'touchmove',
        this.handleTouchMove
      )
    },

    handleMouseUp() {
      this.mouseDown = false
      this.initialXPosition = null
      this.$refs.carouselTrack.classList.remove('scrolling')

      this.$refs.carouselTrack.removeEventListener(
        'mousemove',
        this.handleMouseMove
      )

      this.$refs.carouselTrack.removeEventListener(
        'touchmove',
        this.handleTouchMove
      )

      this.snapIntoNearestSlide()
      this.manualDrag = 0
    },

    handleMouseMove(mouseEvent) {
      const XPositionDifference = mouseEvent.x - this.initialXPosition
      this.manualDrag = XPositionDifference
    },

    handleTouchStart(touchEvent) {
      this.handleMouseDown({ x: touchEvent.touches[0].pageX })
    },

    handleTouchMove(touchEvent) {
      this.handleMouseMove({ x: touchEvent.touches[0].pageX })
    },

    snapIntoNearestSlide() {
      const trackWidth = this.$refs.carouselTrack.offsetWidth
      const slideWidth = trackWidth / this.slideCount
      const trackOffset = slideWidth * this.activeSlideIndex
      const draggedTrackOffset = trackOffset - this.manualDrag
      const newIndexDec = (this.slideCount * draggedTrackOffset) / trackWidth
      const deviation = newIndexDec - this.activeSlideIndex

      if (deviation > 0.1) {
        console.log('Diviation is greater than 0.2')
        this.activeSlideIndex = Math.ceil(newIndexDec)
        this.stopAutoplay()
        return
      }

      if (deviation < -0.1) {
        console.log('Diviation is smaller than -0.2')
        this.activeSlideIndex = Math.floor(newIndexDec)
        this.stopAutoplay()
        return
      }
    },

    goToNextSlide() {
      this.activeSlideIndex++
    },

    startAutoplay() {
      this.autoplayIntervalId = setInterval(
        this.goToNextSlide,
        this.autoplayInterval
      )
    },

    stopAutoplay() {
      clearInterval(this.autoplayIntervalId)
    },
  },

  mounted() {
    const carouselTrack = this.$refs.carouselTrack
    this.slideCount = carouselTrack.children.length

    if (this.randomize) {
      this.activeSlideIndex = Math.floor(Math.random() * this.slideCount)
    } else {
      this.activeSlideIndex = 0
    }

    if (this.autoplayInterval > 0) this.startAutoplay()

    carouselTrack.addEventListener('mousedown', this.handleMouseDown)
    carouselTrack.addEventListener('mouseup', this.handleMouseUp)
    carouselTrack.addEventListener('touchstart', this.handleTouchStart)
    carouselTrack.addEventListener('touchend', this.handleMouseUp)
  },
}
</script>

<style lang="scss" scoped>
.carousel-component {
  position: relative;
  // overflow-x: hidden;
  cursor: pointer;

  &__track {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    transition: transform $duration--fast ease;

    &.scrolling {
      transition: none;
    }

    > * {
      flex-basis: 100%;
      opacity: 0;
      transition: opacity $duration--fast ease;

      &.active {
        opacity: 1;
      }
    }
  }
}
</style>