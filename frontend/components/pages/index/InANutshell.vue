<template>
  <div class="in-a-nutshell-section">
    <div class="in-a-nutshell-section__body">
      <h2>{{heading}}</h2>
      <video controls class="in-a-nutshell-section__body__video" v-if="videoUrl">
        <source :src="videoUrl" type="video/mp4" />
      </video>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      heading: null,
      videoUrl: null,
      paragraphs: null,
    }
  },

  async fetch() {
    const dataResponse = (
      await this.$prismic.api.query(
        this.$prismic.predicates.at('document.type', 'homepage'),
        {
          lang: this.localeIso,
          fetch: [
            'homepage.in_a_nutshell_section_heading',
            'homepage.in_a_nutshell_section_video',
          ],
        }
      )
    ).results[0].data

    try {
      this.heading = dataResponse.in_a_nutshell_section_heading
      this.videoUrl = dataResponse.in_a_nutshell_section_video.url
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

    &__video {
      width: 100%;
      height: 30rem;
      object-fit: cover;
    }
  }
}
</style>