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
        <h1>{{heading}}</h1>
        <h5>{{subHeading}}</h5>
      </div>
    </div>
    <div class="welcome-section__links-section">
      <div class="welcome-section__links-section__body">
        <button
          @click="$router.push('/offers')"
          class="welcome-section__links-section__body__button"
        >
          <div class="welcome-section__links-section__body__button__content">
            <h4>{{$t('targetGroups.forChangemakers')}}</h4>
            <va-icon name="chevron-right" />
          </div>
        </button>
        <button
          @click="$router.push('/offers')"
          class="welcome-section__links-section__body__button"
        >
          <div class="welcome-section__links-section__body__button__content">
            <h4>{{$t('targetGroups.forBusiness')}}</h4>
            <va-icon name="chevron-right" />
          </div>
        </button>
        <button
          @click="$router.push('/offers')"
          class="welcome-section__links-section__body__button"
        >
          <div class="welcome-section__links-section__body__button__content">
            <h4>{{$t('targetGroups.forFacilitators')}}</h4>
            <va-icon name="chevron-right" />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/global/Icon'
import { missingContent } from '@/mixins/nuxtError.js'
export default {
  components: { 'va-icon': Icon },
  mixins: [missingContent],

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

  async fetch() {
    const query = new this.$api.Query(
      [this.$prismic.predicates.at('document.type', 'homepage')],
      {
        fetch: [
          'homepage.welcome__background_video',
          'homepage.welcome__heading',
          'homepage.welcome__sub_heading',
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
    }

    &__body {
      @include page-margin;

      color: white;
      padding-top: 3rem;
      padding-bottom: 3rem;

      h1 {
        margin-top: 0;
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

      &__button {
        text-align: left;
        flex: 1;

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

          h4 {
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

<i18n>
{
  "de": {
    "targetGroups": {
      "forChangemakers": "Für Changemaker",
      "forBusiness": "Für Unternehmen",
      "forFacilitators": "Für Prozessbegleiter"
    }
  },
  "en": {
    "targetGroups": {
      "forChangemakers": "For changemakers",
      "forBusiness": "For business",
      "forFacilitators": "For facilitators"
    }
  }
}
</i18n>