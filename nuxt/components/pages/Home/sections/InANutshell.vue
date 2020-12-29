<template>
  <va-at--PageSection
    padding="both"
    v-if="heading && videoUrl && videoThumbnailUrl && textColumns"
  >
    <div class="va-ps--InANutshell">
      <h2 class="va-ps--InANutshell__heading">{{ heading }}</h2>
      <va-mo--Video
        :src="videoUrl"
        :thumbnail="videoThumbnailUrl"
        v-if="videoUrl"
        aspectRatio="2.5"
        class="va-ps--InANutshell__video"
      />
      <div class="va-ps--InANutshell__columns">
        <p
          class="va-ps--InANutshell__columns__body"
          v-for="(column, index) in textColumns"
          :key="index"
        >
          {{ column.in_a_nutshell__column_text }}
        </p>
      </div>
    </div>
  </va-at--PageSection>
</template>

<script>
import PageSection from '@/components/atoms/PageSection.vue'
import Video from '@/components/molecules/Video'
export default {
  name: 'va-ps--InANutshell',
  components: { 'va-mo--Video': Video, 'va-at--PageSection': PageSection },
  props: ['heading', 'videoUrl', 'videoThumbnailUrl', 'textColumns'],
}
</script>

<style lang="scss" scoped>
.va-ps--InANutshell {
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
</style>