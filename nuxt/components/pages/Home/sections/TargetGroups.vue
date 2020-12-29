<template>
  <va-at--PageSection standout fullwidth="mobile">
    <div class="va-ps--TargetGroups">
      <va-at--Button
        v-for="(targetGroupLink, index) in targetGroupLinks"
        :key="index"
        :to="{ name: 'offers', query: targetGroupLink.query }"
        class="va-ps--TargetGroups__link"
        iconName="chevron-right"
        appearance="reduced"
        big
        grow
        explode
        >{{ targetGroupLink.name }}
      </va-at--Button>
    </div>
  </va-at--PageSection>
</template>

<script>
import PageSection from '@/components/atoms/PageSection'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
export default {
  name: 'va-ps--TargetGroups',
  components: {
    'va-at--Icon': Icon,
    'va-at--Button': Button,
    'va-at--PageSection': PageSection,
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
          name: this.$t('global.targetGroups.facilitators.for'),
          query: { targetGroup: 'facilitators' },
        },
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
.va-ps--TargetGroups {
  display: flex;
  flex-direction: column;
  align-items: stretch;

  @include desktops {
    flex-direction: row;
    padding: $spacing--micro--xl 0;
  }

  &__link {
    flex: 1;

    & + & {
      @include desktops {
        margin-left: $spacing__micro--xl;
      }
    }
  }
}
</style>