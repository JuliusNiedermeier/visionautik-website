<template>
  <div
    class="video-component"
    :style="`padding-bottom: ${100 / (aspectRatio || calculatedAspectRatio)}%`"
  >
    <video
      class="video-component__video"
      :poster="thumbnail"
      v-if="src"
      ref="video"
      @timeupdate="handleVideoTimeUpdate"
    >
      <source :src="src" type="video/mp4" />
    </video>
    <div class="video-component__controls initial" @click="handleVideoClick" ref="controls">
      <va-icon
        :name="playStateIconName"
        size="5rem"
        class="video-component__controls__play-state-icon"
      />
      <div
        class="video-component__controls__bottom-controls"
        @mousemove="handleBottomControlsMouseover"
        @click.stop="handleBottomControlsClick"
      >
        <div class="video-component__controls__bottom-controls__progress-bar">
          <div
            class="video-component__controls__bottom-controls__progress-bar__elapsed-indicator"
            :style="`width: ${progress}%;`"
          />
          <div
            class="video-component__controls__bottom-controls__progress-bar__remaining-indicator"
          />
          <div
            class="video-component__controls__bottom-controls__progress-bar__mouse-position-indicator"
            :style="`width: ${bottomControlsMouseoverProgress}%`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './Icon'
export default {
  components: { 'va-icon': Icon },
  props: {
    src: String,
    thumbnail: String,
    aspectRatio: String | Number,
  },

  data() {
    return {
      calculatedAspectRatio: 1.778,
      playStateIconName: 'play',
      currentTime: 0,
      duration: null,
      bottomControlsMouseoverProgress: 0,
    }
  },

  computed: {
    progress() {
      return (this.currentTime / this.duration) * 100
    },
  },

  methods: {
    handleVideoClick() {
      this.$refs.controls.classList.remove('initial')
      const video = this.$refs.video
      const playStateIcon = this.$refs.controls.querySelector(
        '.video-component__controls__play-state-icon'
      )
      playStateIcon.classList.remove('fade')
      requestAnimationFrame(() => {
        playStateIcon.classList.add('fade')
      })

      if (video.currentTime > 0 && !video.paused && !video.ended) {
        video.pause()
        this.playStateIconName = 'pause'
      } else {
        video.play()
        this.playStateIconName = 'play'
      }
    },

    handleVideoTimeUpdate(event) {
      this.currentTime = event.target.currentTime
      // if (this.duration) return
      // this.duration = event.target.duration
    },

    handleBottomControlsMouseover(event) {
      this.bottomControlsMouseoverProgress =
        (event.offsetX / event.target.offsetWidth) * 100
    },

    handleBottomControlsClick(event) {
      this.$refs.video.currentTime =
        (event.offsetX / event.target.offsetWidth) * this.duration
    },
  },

  mounted() {
    const video = this.$refs.video
    this.calculatedAspectRatio = video.videoWidth / video.videoHeight

    this.duration = video.duration

    const _vm = this
    video.addEventListener('loadedmetadata', function () {
      _vm.duration = video.duration
    })

    const bottomControls = this.$refs.controls.querySelector(
      '.video-component__controls__bottom-controls'
    )
  },
}
</script>

<style lang="scss" scoped>
.video-component {
  position: relative;
  padding-bottom: 50px;
  -webkit-tap-highlight-color: transparent;

  &__video {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  &__controls {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    background-color: transparentize($color: black, $amount: 0.5);
    color: white;
    justify-content: center;
    align-items: center;

    opacity: 0;

    &:hover {
      opacity: 1;
    }

    &__play-state-icon {
      opacity: 0;

      &.fade {
        animation-name: fadePlayStateIcon;
        animation-duration: $duration--slow;
        animation-timing-function: ease;

        @keyframes fadePlayStateIcon {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      }
    }

    &__bottom-controls {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 2rem 0;
      margin: 0 2rem;
      cursor: pointer;
      // transform: translateY(2rem);

      &__progress-bar {
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        pointer-events: none;

        &__elapsed-indicator,
        &__remaining-indicator {
          height: 0.25rem;
        }

        &__elapsed-indicator {
          background-color: red;
          transition: width $duration--medium;
        }

        &__remaining-indicator {
          background-color: rgba(255, 255, 255, 0.15);
          flex-grow: 1;
        }

        &__mouse-position-indicator {
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.15);
          display: none;
        }
      }

      &:hover &__progress-bar__mouse-position-indicator {
        display: initial;
      }
    }

    &.initial {
      opacity: 1;
      background-color: transparent;

      &:hover {
        background-color: transparentize($color: black, $amount: 0.75);
      }

      .video-component__controls__play-state-icon {
        opacity: 1;
      }
      .video-component__controls__bottom-controls {
        opacity: 0;
      }
    }
  }
}
</style>