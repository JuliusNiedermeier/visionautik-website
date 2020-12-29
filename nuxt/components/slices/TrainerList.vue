<template>
  <div>
    <va-or--TeamMemberList :teamMembers="trainers" />
  </div>
</template>

<script>
import TeamMemberList from '@/components/organisms/TeamMemberList.vue'
export default {
  name: 'va-sl--TrainerList',
  components: { 'va-or--TeamMemberList': TeamMemberList },
  props: { trainers: Array },
}
</script>

<style>
</style>