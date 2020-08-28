<template>
  <div class="carousel-component" :class="{overflow: overflow}">
    <div class="carousel-component__track-wrapper" :style="`width: ${slideCount * 100}%;`">
      <ul
        class="carousel-component__track-wrapper__track noselect"
        :class="{gap: gap}"
        ref="carouselTrack"
        :style="`width: ${100 / slidesPerFrame}%; transform: translateX(-${100 / slideCount * activeSlideIndex}%) translateX(${manualDrag}px)`"
      >
        <slot />
      </ul>
    </div>
    <div class="carousel-component__navigation-controls">
      <va-slider-navigation-controls
        :number="slideCount < slidesPerFrame ? 1 : slideCount - offset"
        :activeIndex="activeSlideIndex"
        @prev="handleNavClick('prev')"
        @next="handleNavClick('next')"
        @indicator-clicked="handleIndicatorClick"
      />
    </div>
  </div>
</template>

<script>
import Icon from './Icon'
import SliderNavigationControls from './SliderNavigationControls'
export default {
  name: 'va-carousel',

  components: {
    'va-icon': Icon,
    'va-slider-navigation-controls': SliderNavigationControls,
  },

  props: {
    randomize: Boolean,
    overflow: Boolean,
    gap: Boolean,
    autoplayInterval: String,
    loop: Boolean,
    slidesPerFrame: {
      type: String | Number,
      required: false,
      default: 1,
    },
  },

  data() {
    return {
      activeSlideIndex: null,
      slideCount: 0,
      initialXPosition: null,
      manualDrag: 0,
      autoplayIntervalId: null,
      offset: null,
    }
  },

  watch: {
    activeSlideIndex(index, previousIndex) {
      this.offset = this.slidesPerFrame - 1
      if (this.checkIfMobileModeIsActive()) this.offset = 0

      if (
        !(this.slideCount < this.slidesPerFrame) &&
        index + this.offset > this.slideCount - 1
      ) {
        if (this.loop) this.activeSlideIndex = 0
        else {
          this.activeSlideIndex = previousIndex
          this.stopAutoplay()
        }
      }

      if (index < 0) {
        if (this.loop) this.activeSlideIndex = this.slideCount - 1
        else {
          this.activeSlideIndex = previousIndex
          this.stopAutoplay()
        }
      }

      // this.activateSlides()
    },
  },

  methods: {
    activateSlides() {
      const slides = this.$refs.carouselTrack.children
      const activeSlides = []
      for (let i = 0; i < this.offset + 1; i++) {
        activeSlides.push(this.activeSlideIndex + i)
      }

      for (let i = 0; i < this.slideCount; i++) {
        if (activeSlides.includes(i)) {
          slides[i].classList.add('active')
        } else slides[i].classList.remove('active')
      }
    },

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

    handleMouseUp(mouseEvent) {
      this.mouseDown = false
      this.initialXPosition = null
      this.$refs.carouselTrack.classList.remove('scrolling')

      mouseEvent.target
        .querySelector('[grabbing="true"]')
        .removeAttribute('grabbing')

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

      const grabbingSlide = mouseEvent.path.find(
        (element) => element.tagName === 'LI'
      )
      if (grabbingSlide) grabbingSlide.setAttribute('grabbing', 'true')
    },

    handleTouchStart(touchEvent) {
      this.handleMouseDown({ x: touchEvent.touches[0].pageX })
    },

    handleTouchMove(touchEvent) {
      this.handleMouseMove({
        x: touchEvent.touches[0].pageX,
        path: touchEvent.path,
      })
    },

    handleTouchEnd(touchEvent) {
      this.handleMouseUp({
        x: this.manualDrag + this.initialXPosition,
        target: touchEvent.path.find((element) =>
          element.classList.contains('carousel-component__track-wrapper__track')
        ),
      })
    },

    snapIntoNearestSlide() {
      const trackWidth = this.$refs.carouselTrack.offsetWidth
      const slideWidth = trackWidth / this.slideCount
      const trackOffset = slideWidth * this.activeSlideIndex
      const draggedTrackOffset = trackOffset - this.manualDrag
      const newIndexDec = (this.slideCount * draggedTrackOffset) / trackWidth
      const deviation = newIndexDec - this.activeSlideIndex

      if (deviation > 0.1) {
        // console.log('Diviation is greater than 0.2')
        this.activeSlideIndex = Math.ceil(newIndexDec)
        this.stopAutoplay()
        return
      }

      if (deviation < -0.1) {
        // console.log('Diviation is smaller than -0.2')
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

    checkIfMobileModeIsActive() {
      const carouselTrack = this.$refs.carouselTrack
      const carouselTrackWrapper = carouselTrack.closest(
        '.carousel-component__track-wrapper'
      )
      const expectedTrackWidth = Math.round(
        (carouselTrackWrapper.offsetWidth / 100) *
          parseFloat(carouselTrack.style.width)
      )
      const actualTrackWidth = carouselTrack.offsetWidth
      return expectedTrackWidth !== actualTrackWidth
    },

    handleTrackResize() {
      console.log('Tracksize changed')
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
    carouselTrack.addEventListener('touchend', this.handleTouchEnd)

    let carouselTrackObserver = new MutationObserver(() => {
      this.slideCount = carouselTrack.children.length
      this.activateSlides()
    })
    carouselTrackObserver.observe(carouselTrack, {
      childList: true,
    })
  },
}
</script>

<style lang="scss" scoped>
.carousel-component {
  position: relative;
  overflow-x: hidden;

  &.overflow {
    overflow-x: visible;
  }

  &__track-wrapper {
    &__track {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      justify-content: space-between;
      transition: transform $duration--fast ease;

      cursor: grab;

      &:active {
        cursor: grabbing;
      }

      &.scrolling {
        transition: none;
      }

      > li {
        flex-basis: 100%;

        &[grabbing='true'] {
          pointer-events: none;
        }
      }

      &.gap {
        > li + li {
          margin-left: 2rem;
        }
      }

      @include mobile {
        width: 100% !important;
      }
    }
  }
}
</style>