<template>
  <div class="va-ps--TargetGroupFilter">
    <p
      @click="activeTargetGroupId = null"
      class="va-ps--TargetGroupFilter__target-group"
      :class="{ active: !activeTargetGroupId }"
    >
      {{ allTargetGroupsLabel }}
    </p>
    <p
      v-for="targetGroup in targetGroupsNew"
      :key="targetGroup.id"
      class="va-ps--TargetGroupFilter__target-group"
      :class="{ active: activeTargetGroupId === targetGroup.id }"
      @click="activeTargetGroupId = targetGroup.id"
    >
      {{ $t(`global.targetGroups.${targetGroup.id}.for`) }}
    </p>
  </div>
</template>

<script>
import Button from '@/components/atoms/Button.vue'
import targetGroups from '@/assets/js/targetGroups.js'
import { collections } from '@/assets/js/types.js'
export default {
  name: 'va-ps--TargetGroupFilter',
  components: { 'va-at--Button': Button },
  data() {
    return {
      targetGroupsNew: targetGroups,
      activeTargetGroupId: null,
    }
  },

  methods: {
    handleTargetGroupIdUpdate(updatedTargetGroupId) {
      let query = { ...this.$route.query, targetGroup: updatedTargetGroupId }
      if (!updatedTargetGroupId) delete query.targetGroup
      this.$router.replace({ query })
    },
  },

  computed: {
    allTargetGroupsLabel() {
      return $t(`types.${collections.offers.typeName}.allTargetGroupsLabel`)
    },
  },

  created() {
    this.activeTargetGroupId = this.$route.query.targetGroup
    this.$watch('activeTargetGroupId', this.handleTargetGroupIdUpdate)
  },
}
</script>

<style lang="scss" scoped>
.va-ps--TargetGroupFilter {
  display: flex;
  overflow-x: auto;

  &__target-group {
    cursor: pointer;
    color: $color__blue--light;
    white-space: nowrap;

    & + & {
      margin-left: $spacing__micro--xl;
    }

    &:not(.active) {
      opacity: 0.25;
    }
  }
}
</style>