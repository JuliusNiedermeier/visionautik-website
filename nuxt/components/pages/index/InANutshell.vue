<template>
  <div class="in-a-nutshell-section">
    <div class="in-a-nutshell-section__body">
      <h2>{{heading}}</h2>
      <va-video :src="videoUrl" :thumbnail="videoThumbnailUrl" v-if="videoUrl" />
    </div>
  </div>
</template>

<script>
import Video from '@/components/global/Video'
export default {
  components: { 'va-video': Video },
  data() {
    return {
      heading: null,
      videoUrl: null,
      videoThumbnailUrl: null,
      text: null,
    }
  },

  async fetch() {
    const dataResponse = (
      await this.$prismic.api.query(
        this.$prismic.predicates.at('document.type', 'homepage'),
        {
          lang: this.localeIso,
          fetch: [
            'homepage.in_a_nutshell__heading',
            'homepage.in_a_nutshell__video',
            'homepage.in_a_nutshell__video_thumbnail',
          ],
        }
      )
    ).results[0].data

    try {
      this.heading = dataResponse.in_a_nutshell__heading
      this.videoUrl = dataResponse.in_a_nutshell__video.url
      this.videoThumbnailUrl = dataResponse.in_a_nutshell__video_thumbnail.url
    } catch {}
  },
}
</script>

<style lang="scss" scoped>
.in-a-nutshell-section {
  @include fill-screen-width;
  background-color: $color--grey--light;
  padding: 15rem 0;

  &__body {
    @include page-margin;
  }
}
</style>