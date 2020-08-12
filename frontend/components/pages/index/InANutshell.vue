<template>
  <div class="in-a-nutshell-section">
    <div class="in-a-nutshell-section__body">
      <h2>{{heading}}</h2>
      <video controls class="in-a-nutshell-section__body__video">
        <source src="@/assets/video/placeholder.mp4" type="video/mp4" />Your browser does not support HTML video.
      </video>
    </div>
  </div>
</template>

<script>
export default {
  props: { heading: String, src: String, paragraphs: Array },
}
</script>

<style lang="scss" scoped>
.in-a-nutshell-section {
  @include fill-screen-width;
  background-color: $color--grey--light;
  padding: 15rem 0;

  &__body {
    @include page-margin;

    &__video {
      width: 100%;
      height: 30rem;
      object-fit: cover;
    }
  }
}
</style>