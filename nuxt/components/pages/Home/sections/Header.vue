<template>
  <div class="va-ps--Header">
    <video
      ref="welcomeSectionVideo"
      autoplay
      loop
      muted
      palysinline
      class="va-ps--Header__video"
    >
      <source :src="videoUrl" type="video/mp4" v-if="videoUrl" />
    </video>
    <div class="va-ps--Header__overlay">
      <h1 class="va-ps--Header__overlay__heading">{{ heading }}</h1>
      <h5 class="va-ps--Header__overlay__sub-heading">{{ subHeading }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'va-ps--Header',
  props: ['videoUrl', 'heading', 'subHeading'],

  activated() {
    this.$refs.welcomeSectionVideo.play()
  },
}
</script>

<style lang="scss" scoped>
.va-ps--Header {
  height: 70vh;
  position: relative;

  &__video {
    z-index: -2;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.5);
  }

  &__overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    color: $color__grey--dark;
    @include page-margin;

    &__sub-heading {
      // color: $color--grey--dark;
    }
  }
}
</style>