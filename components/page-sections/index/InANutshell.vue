<template>
  <div
    class="in-a-nutshell-section"
    v-if="heading && videoUrl && videoThumbnailUrl && textColumns"
  >
    <div class="in-a-nutshell-section__body">
      <h2>{{ heading }}</h2>
      <va-video
        :src="videoUrl"
        :thumbnail="videoThumbnailUrl"
        v-if="videoUrl"
        aspectRatio="2.5"
        class="in-a-nutshell-section__body__video"
      />
      <div class="in-a-nutshell-section__body__columns">
        <p v-for="(column, index) in textColumns" :key="index">
          {{ column.in_a_nutshell__column_text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Video from '@/components/elements/Video'
export default {
  components: { 'va-video': Video },
  data() {
    return {
      heading: null,
      videoUrl: null,
      videoThumbnailUrl: null,
      textColumns: null,
    }
  },

  async fetch() {
    const type = this.$api.types.pages.index.typeName

    const query = new this.$api.Query(
      [this.$prismic.predicates.at('document.type', type)],
      {
        fetch: [
          type + '.in_a_nutshell__heading',
          type + '.in_a_nutshell__video',
          type + '.in_a_nutshell__video_thumbnail',
          type + '.in_a_nutshell__text_columns',
        ],
      }
    )

    const response = await query.get()
    if (!response) return

    const data = response.results[0].data

    this.heading = data.in_a_nutshell__heading
    this.videoUrl = data.in_a_nutshell__video.url
    this.videoThumbnailUrl = data.in_a_nutshell__video_thumbnail.url
    this.textColumns = data.in_a_nutshell__text_columns
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