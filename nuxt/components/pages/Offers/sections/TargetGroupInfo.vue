<template>
  <div class="va-ps--TargetGroupInfo">
    <va-or--SliceContent
      v-if="targetGroups.activeIndex > 0 && targetGroups.infoContentExpanded"
      :documentType="documentType"
      :sliceZones="[targetGroups.items[targetGroups.activeIndex].sliceZone]"
      :key="targetGroups.activeIndex"
    />
  </div>
</template>

<script>
import SliceContent from '@/components/organisms/SliceContent'
import Button from '@/components/atoms/Button.vue'
import targetGroups from '@/assets/js/targetGroups.js'
import fetchOne from '@/mixins/usecases/fetchOne.js'
import { collections } from '@/assets/js/types.js'

export default {
  name: 'va-ps--TargetGroupInfo',
  mixins: [fetchOne],
  components: {
    'va-or--SliceContent': SliceContent,
    'va-at--Button': Button,
  },
  data() {
    return {
      targetGroupsNew: targetGroups,
      activeTargetGroupId: null,

      targetGroups: {
        items: [
          { label: 'all' },
          {
            label: 'changemakers',
            infoContentSlices: [],
            sliceZone: 'for_changemakers__slices',
          },
          {
            label: 'businesses',
            infoContentSlices: [],
            sliceZone: 'for_business__slices',
          },
          {
            label: 'facilitators',
            infoContentSlices: [],
            sliceZone: 'for_facilitators__slices',
          },
        ],
        activeIndex: 0,
        infoContentExpanded: false,
      },
    }
  },

  created() {
    const query = this.$route.query
    if (query.targetGroup) {
      this.targetGroups.activeIndex = this.targetGroups.items.findIndex(
        (targetGroup) => targetGroup.label === query.targetGroup
      )
    }
  },

  computed: {
    fetchTargetGroupInfoContent() {
      if (
        this.targetGroups.infoContentExpanded &&
        this.targetGroups.activeIndex > 0
      ) {
        return this.targetGroups.activeIndex
      }
    },

    documentType() {
      return collections.offers.typeName
    },
  },

  watch: {
    'targetGroups.activeIndex'(activeIndex) {
      const targetGroup = this.targetGroups.items[activeIndex]
      let query = { ...this.$route.query, targetGroup: targetGroup.label }
      if (targetGroup.label === 'all') delete query.targetGroup
      this.$router.replace({ query })
    },

    async fetchTargetGroupInfoContent(fetchIndex) {
      if (fetchIndex) {
        const response = await this.fetchOne(collections.offers.typeName, [
          `${type}.${this.targetGroups.items[fetchIndex].sliceZone}`,
        ])

        if (!response) return

        this.targetGroups.items[
          this.targetGroups.activeIndex
        ].infoContentSlices =
          response.results[0].data[
            this.targetGroups.items[this.targetGroups.activeIndex].sliceZone
          ]
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.va-ps--TargetGroupInfo {
  background-color: $color--grey--light;

  &__body {
    @include page-margin;
    padding-top: $spacing__macro--xs;

    &__target-groups {
      display: flex;
      flex-direction: column;
      align-items: strech;

      @include desktops {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }

      &__filter {
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

      &__info-button {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
</style>
