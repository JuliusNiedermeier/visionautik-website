<template>
  <va-at--PageSection standout padding="bottom">
    <div class="va-ps--VisionAndTeam">
      <div class="va-ps--VisionAndTeam__vision">
        <va-ps--Vision :heading="visionHeading" :slices="visionSlices" />
      </div>
      <div class="va-ps--VisionAndTeam__team">
        <va-ps--Team
          :heading="teamHeading"
          :expertsHeading="teamExpertsHeading"
          :coreTeamMembers="teamCoreTeamMembers"
          :experts="teamExperts"
        />
      </div>
    </div>
  </va-at--PageSection>
</template>

<script>
import PageSection from '@/components/atoms/PageSection.vue'
import Vision from './Vision.vue'
import Team from './Team.vue'
export default {
  name: 'va-ps--VisionAndTeam',
  components: {
    'va-ps--Vision': Vision,
    'va-ps--Team': Team,
    'va-at--PageSection': PageSection,
  },
  props: {
    visionHeading: String,
    visionSlices: Array,

    teamHeading: String,
    teamExpertsHeading: String,
    teamCoreTeamMembers: {
      default: () => [],
    },
    teamExperts: {
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.va-ps--VisionAndTeam {
  padding-top: $spacing--macro--xs;

  @include desktops {
    display: flex;
  }

  &__vision {
    margin-bottom: $spacing--macro--md;

    @include desktops {
      margin-right: $spacing--macro--xs;
      margin-bottom: 0;
    }
  }
}
</style>