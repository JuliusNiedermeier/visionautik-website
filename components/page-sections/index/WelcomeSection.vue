<template>
  <div class="welcome-section">
    <div class="welcome-section__hero-section">
      <video
        ref="welcomeSectionVideo"
        autoplay
        loop
        muted
        palysinline
        class="welcome-section__hero-section__video-background"
      >
        <source :src="videoUrl" type="video/mp4" v-if="videoUrl" />
      </video>
      <div class="welcome-section__hero-section__body">
        <h1>{{ heading }}</h1>
        <h4>{{ subHeading }}</h4>
      </div>
    </div>
    <div class="welcome-section__links-section">
      <div class="welcome-section__links-section__body">
        <a
          v-for="(targetGroupLink, index) in targetGroupLinks"
          :key="index"
          @click="
            $router.push({ path: '/offers', query: targetGroupLink.query })
          "
          class="welcome-section__links-section__body__link"
        >
          <div class="welcome-section__links-section__body__link__content">
            <h4
              class="welcome-section__links-section__body__link__content__text"
            >
              {{ targetGroupLink.name }}
            </h4>
            <va-icon name="chevron-right" />
          </div>
        </a>
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
    const type = this.$api.types.pages.index
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
  &__hero-section {
    min-height: 82vh;
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

    &__body {
      @include page-margin;

      color: white;
      padding-top: 3rem;
      padding-bottom: 3rem;

      h1 {
        margin-top: 0;
      }

      h4 {
        color: $color--grey--dark;
        font-weight: normal;
      }
    }
  }

  &__links-section {
    @include fill-screen-width;
    background-color: $color--grey--light;

    &__body {
      display: flex;
      flex-direction: column;
      align-items: stretch;

      @include desktops {
        @include page-margin;
        flex-direction: row;
      }

      &__link {
        text-align: left;
        flex: 1;
        @include background-gradient('blue');
        color: white;

        &:hover {
          @include background-gradient('red');
        }

        @include desktops {
          transform: translateY(-50%);
        }

        &:nth-child(2) {
          @include desktops {
            margin-left: 2rem;
            margin-right: 2rem;
          }
        }

        &__content {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 2.5rem 0;

          @include page-margin;

          &__text {
            margin: 0;
          }

          @include desktops {
            padding: 2rem;
            @include reset-page-margin;
          }

          @include large-desktops {
            padding: 2.5rem;
          }
        }
      }
    }
  }
}
</style>