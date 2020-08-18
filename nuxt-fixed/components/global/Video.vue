<template>
  <div class="video-component">
    <video class="video-component__video" :poster="thumbnail" v-if="src" ref="video">
      <source :src="src" type="video/mp4" />
    </video>
    <div class="video-component__controls" @click="handleVideoClick">
      <va-icon name="play" size="5rem" />
    </div>
  </div>
</template>

<script>
import Icon from '@/components/global/Icon'
export default {
  components: { 'va-icon': Icon },
  props: {
    src: String,
    thumbnail: String,
  },

  methods: {
    handleVideoClick() {
      const video = this.$refs.video
      if (video.currentTime > 0 && !video.paused && !video.ended) {
        video.pause()
      } else {
        video.play()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.video-component {
  position: relative;
  &__video {
    width: 100%;
  }

  &__controls {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    background-color: transparentize($color--blue--base, $amount: 0.5);
    color: white;
    justify-content: center;
    align-items: center;

    opacity: 0;

    &:hover {
      opacity: 1;
    }
  }
}
</style>