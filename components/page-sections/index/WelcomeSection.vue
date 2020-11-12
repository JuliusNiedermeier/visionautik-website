<template>
  <div class="welcome-section" v-if="videoUrl && heading && subHeading">
    <div class="welcome-section">
      <video
        ref="welcomeSectionVideo"
        autoplay
        loop
        muted
        palysinline
        class="welcome-section__video-background"
      >
        <source :src="videoUrl" type="video/mp4" v-if="videoUrl" />
      </video>
      <div class="welcome-section__overlay">
        <h1 class="welcome-section__overlay__heading">{{ heading }}</h1>
        <h5 class="welcome-section__overlay__sub-heading">{{ subHeading }}</h5>
        <div class="welcome-section__overlay__links">
          <div class="welcome-section__overlay__links__body">
            <a
              v-for="(targetGroupLink, index) in targetGroupLinks"
              :key="index"
              @click="
                $router.push({ path: '/offers', query: targetGroupLink.query })
              "
              class="welcome-section__overlay__links__body__link"
            >
              <h5 class="welcome-section__overlay__links__body__link__text">
                {{ targetGroupLink.name }}
              </h5>
              <va-icon name="chevron-right" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/elements/Icon'
export default {
  components: { 'va-icon': Icon },

  activated() {
    this.$refs.welcomeSectionVideo.play()
  },

  data() {
    return {
      videoUrl: null,
      heading: null,
      subHeading: null,
    }
  },

  computed: {
    targetGroupLinks() {
      return [
        {
          name: this.$t('types.pages.index.forChangemakers'),
          query: { targetGroup: 'changemakers' },
        },
        {
          name: this.$t('types.pages.index.forBusiness'),
          query: { targetGroup: 'business' },
        },
        {
          name: this.$t('types.pages.index.forFacilitators'),
          query: { targetGroup: 'facilitators' },
        },
      ]
    },
  },

  async fetch() {
    const type = this.$api.types.pages.index.typeName
    const query = new this.$api.Query(
      [this.$prismic.predicates.at('document.type', type)],
      {
        fetch: [
          type + '.welcome__background_video',
          type + '.welcome__heading',
          type + '.welcome__sub_heading',
        ],
      }
    )

    const response = await query.get()
    if (!response) return

    const data = response.results[0].data

    this.heading = data.welcome__heading
    this.subHeading = data.welcome__sub_heading
    this.videoUrl = data.welcome__background_video.url
  },
}
</script>

<style lang="scss" scoped>
.welcome-section {
  min-height: 70vh;
  @include fill-screen-width;

  display: flex;
  flex-direction: column;
  justify-content: center;

  &__video-background {
    position: absolute;
    z-index: -2;
    height: 130%;
    width: 100%;
    object-fit: cover;
    filter: brightness(0.5);
  }

  &__overlay {
    @include page-margin;

    color: white;
    padding-top: 3rem;
    padding-bottom: 3rem;

    &__heading {
      margin-top: 0;
    }

    &__sub-heading {
      color: $color--grey--dark;
      // font-weight: normal;
    }

    &__links {
      position: absolute;
      left: 0;
      bottom: 2rem;
      width: 100%;

      &__body {
        @include page-margin;
        display: flex;
        flex-direction: column;
        align-items: stretch;

        @include desktops {
          flex-direction: row;
        }

        &__link {
          text-align: left;
          flex: 1;
          color: white;
          display: flex;
          flex-direction: row;
          margin-top: 2rem;
          justify-content: space-between;

          @include desktops {
            @include background-gradient(90deg, 'blue');
            justify-content: space-between;
            padding: 2rem;
          }

          &__text {
            margin: 0;
            margin-right: 2rem;

            @include desktops {
              margin: 0;
            }
          }

          @include large-desktops {
            padding: 2.5rem;
          }

          &:hover {
            @include background-gradient(90deg, 'red');
          }

          &:nth-child(2) {
            @include desktops {
              margin-left: 2rem;
              margin-right: 2rem;
            }
          }
        }
      }
    }
  }
}
</style>