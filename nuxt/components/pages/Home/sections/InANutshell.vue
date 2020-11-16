<template>
  <div
    class="va-ps--InANutshell"
    v-if="heading && videoUrl && videoThumbnailUrl && textColumns"
  >
    <div class="va-ps--InANutshell__body">
      <h2>{{ heading }}</h2>
      <va-mo--Video
        :src="videoUrl"
        :thumbnail="videoThumbnailUrl"
        v-if="videoUrl"
        aspectRatio="2.5"
        class="va-ps--InANutshell__body__video"
      />
      <div class="va-ps--InANutshell__body__columns">
        <p
          class="va-ps--InANutshell__body__columns__body"
          v-for="(column, index) in textColumns"
          :key="index"
        >
          {{ column.in_a_nutshell__column_text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Video from '@/components/molecules/Video'
export default {
  name: 'va-ps--InANutshell',
  components: { 'va-mo--Video': Video },
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
.va-ps--InANutshell {
  @include fill-screen-width;
  background-color: $color__grey--light;
  padding: $spacing__macro--lg 0;

  &__body {
    @include page-margin;

    &__video {
      margin-top: $spacing__macro--xs;
      margin-bottom: $spacing__micro--xl;
    }

    &__columns {
      @include desktops {
        display: flex;

        &__body + &__body {
          margin-left: $spacing__micro--xl;
        }
      }
    }
  }
}
</style>