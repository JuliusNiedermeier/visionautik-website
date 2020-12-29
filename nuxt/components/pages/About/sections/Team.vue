<template>
  <div class="va-ps--Team">
    <h2 class="va-ps--Team__heading">{{ heading }}</h2>
    <va-mo--TeamMemberList :teamMembers="coreTeamMembers" />
    <h3 class="va-ps--Team__heading--experts">{{ expertsHeading }}</h3>
    <va-mo--TeamMemberList :teamMembers="experts" />
  </div>
</template>

<script>
import TeamMemberList from '@/components/organisms/TeamMemberList.vue'
export default {
  name: 'va-ps--Team',
  components: { 'va-mo--TeamMemberList': TeamMemberList },
  props: {
    heading: String,
    expertsHeading: String,
    coreTeamMembers: {
      default: () => [],
    },
    experts: {
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.va-ps--Team {
  &__heading--experts {
    margin-top: $spacing--macro--xs;
  }

  &__team-member + &__team-member {
    margin-top: $spacing--micro--xl;
  }
}
</style>