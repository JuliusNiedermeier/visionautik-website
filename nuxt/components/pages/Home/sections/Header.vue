<template>
  <div class="va-ps--Header" v-if="videoUrl && heading && subHeading">
    <video
      ref="welcomeSectionVideo"
      autoplay
      loop
      muted
      palysinline
      class="va-ps--Header__video-background"
    >
      <source :src="videoUrl" type="video/mp4" v-if="videoUrl" />
    </video>
    <div class="va-ps--Header__overlay">
      <h1 class="va-ps--Header__overlay__heading">{{ heading }}</h1>
      <h5 class="va-ps--Header__overlay__sub-heading">{{ subHeading }}</h5>
      <div class="va-ps--Header__overlay__links">
        <div class="va-ps--Header__overlay__links__body">
          <a
            v-for="(targetGroupLink, index) in targetGroupLinks"
            :key="index"
            @click="
              $router.push({ path: '/offers', query: targetGroupLink.query })
            "
            class="va-ps--Header__overlay__links__body__link"
          >
            <h5 class="va-ps--Header__overlay__links__body__link__text">
              {{ targetGroupLink.name }}
            </h5>
            <va-at--Icon name="chevron-right" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/atoms/Icon'
export default {
  name: 'va-ps--Header',

  components: { 'va-at--Icon': Icon },

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
          name: this.$t('global.targetGroups.changemakers.for'),
          query: { targetGroup: 'changemakers' },
        },
        {
          name: this.$t('global.targetGroups.businesses.for'),
          query: { targetGroup: 'businesses' },
        },
        {
          name: this.$t('global.targetGroups.facilitatJors.for'),
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
.va-ps--Header {
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

    &__heading {
      margin-top: 0;
    }

    &__sub-heading {
      color: $color__grey--dark;
    }

    &__links {
      position: absolute;
      left: 0;
      bottom: $spacing__micro--xl;
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
          margin-top: $spacing__micro--xl;
          justify-content: space-between;

          @include desktops {
            @include background-gradient(90deg, 'blue');
            justify-content: space-between;
            padding: $spacing__micro--xl;
          }

          &__text {
            margin: 0;
            margin-right: $spacing__micro--xl;

            @include desktops {
              margin: 0;
            }
          }

          &:hover {
            @include background-gradient(90deg, 'red');
          }

          & + & {
            @include desktops {
              margin-left: $spacing__micro--xl;
            }
          }
        }
      }
    }
  }
}
</style>