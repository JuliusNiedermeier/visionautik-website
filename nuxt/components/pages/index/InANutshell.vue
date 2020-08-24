<template>
  <div class="in-a-nutshell-section">
    <div class="in-a-nutshell-section__body">
      <h2>{{heading}}</h2>
      <va-video
        :src="videoUrl"
        :thumbnail="videoThumbnailUrl"
        v-if="videoUrl"
        aspectRatio="2.5"
        class="in-a-nutshell-section__body__video"
      />
      <div class="in-a-nutshell-section__body__columns">
        <p v-for="(column, index) in textColumns" :key="index">{{column.in_a_nutshell__column_text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Video from '@/components/global/Video'
import { missingContent } from '@/mixins/nuxtError'
export default {
  components: { 'va-video': Video },
  mixins: [missingContent],
  data() {
    return {
      heading: null,
      videoUrl: null,
      videoThumbnailUrl: null,
      text: null,
      textColumns: null,
    }
  },

  async fetch() {
    try {
      const dataResponse = (
        await this.$prismic.api.query(
          this.$prismic.predicates.at('document.type', 'homepage'),
          {
            lang: this.localeIso,
            fetch: [
              'homepage.in_a_nutshell__heading',
              'homepage.in_a_nutshell__video',
              'homepage.in_a_nutshell__video_thumbnail',
              'homepage.in_a_nutshell__text',
              'homepage.in_a_nutshell__text_columns',
            ],
          }
        )
      ).results[0].data

      this.heading = dataResponse.in_a_nutshell__heading
      this.videoUrl = dataResponse.in_a_nutshell__video.url
      this.videoThumbnailUrl = dataResponse.in_a_nutshell__video_thumbnail.url
      this.text = dataResponse.in_a_nutshell__text
      this.textColumns = dataResponse.in_a_nutshell__text_columns
    } catch {
      this.missingContent()
    }
  },
}
</script>

<style lang="scss" scoped>
.in-a-nutshell-section {
  @include fill-screen-width;
  background-color: $color--grey--light;
  padding: 20rem 0;

  &__body {
    @include page-margin;

    &__video {
      margin-top: 5rem;
      margin-bottom: 2rem;
    }

    &__columns {
      @include desktops {
        display: flex;

        > * + * {
          margin-left: 2rem;
        }
      }
    }
  }
}
</style>