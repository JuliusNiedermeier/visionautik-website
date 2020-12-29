<template>
  <div class="va-or--TeamMemberList">
    <va-mo--TeamMember
      v-for="teamMember of teamMembers"
      :key="teamMember.uid"
      class="va-or--TeamMemberList__team-member"
      :uid="teamMember.uid"
      :imageUrl="
        teamMember.general__featured_image
          ? teamMember.general__featured_image.url
          : null
      "
      :name="teamMember.general__name"
      :occupation="teamMember.general__occupation"
      :excerpt="teamMember.general__excerpt"
      :collapse="teamMember.uid !== expandedUid"
      @expanded="handleExpandedEvent(teamMember.uid)"
    />
  </div>
</template>

<script>
import TeamMember from '@/components/molecules/TeamMember.vue'
export default {
  name: 'va-or--TeamMemberList',
  components: { 'va-mo--TeamMember': TeamMember },
  props: { teamMembers: { default: () => [] } },

  data() {
    return {
      expandedUid: null,
    }
  },

  methods: {
    handleExpandedEvent(uid) {
      this.expandedUid = uid
    },
  },
}
</script>

<style lang="scss" scoped>
.va-or--TeamMemberList {
  &__team-member + &__team-member {
    margin-top: $spacing--micro--xl;
  }
}
</style>