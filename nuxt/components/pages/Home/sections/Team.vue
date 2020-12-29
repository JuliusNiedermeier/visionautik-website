<template>
  <va-at--PageSection padding="bottom">
    <div class="va-ps--Team">
      <div class="va-ps--Team__header">
        <h2 class="va-ps--Team__header__heading">{{ heading }}</h2>
        <va-at--Button
          iconName="chevron-right"
          :to="{ name: 'about', hash: 'team' }"
          >{{ allTeamMembersButtonLabel }}</va-at--Button
        >
      </div>
      <div class="va-ps--Team__core">
        <nuxt-link
          class="va-ps--Team__core__member"
          v-for="coreTeamMember of coreTeamMembers"
          :key="coreTeamMember.uid"
          :to="{ name: 'team-member', params: { uid: coreTeamMember.uid } }"
        >
          <img
            class="va-ps--Team__core__member__image"
            :src="coreTeamMember.general__featured_image.thumbnail.url"
          />
          <h4 class="va-ps--Team__core__member__name">
            {{ coreTeamMember.general__name }}
          </h4>
          <small class="va-ps--Team__core__member__occupation">
            {{ coreTeamMember.general__occupation }}
          </small>
        </nuxt-link>
      </div>
      <div class="va-ps--Team__experts">
        <nuxt-link
          class="va-ps--Team__experts__member"
          v-for="expert of experts"
          :key="expert.uid"
          :to="{ name: 'team-member', params: { uid: expert.uid } }"
        >
          <img
            class="va-ps--Team__experts__member__image"
            :src="expert.general__featured_image.thumbnail.url"
          />
        </nuxt-link>
      </div>
    </div>
  </va-at--PageSection>
</template>

<script>
import PageSection from '@/components/atoms/PageSection.vue'
import Button from '@/components/atoms/Button.vue'
import { pages } from '@/assets/js/types.js'
export default {
  name: 'va-ps--Team',
  components: { 'va-at--PageSection': PageSection, 'va-at--Button': Button },

  props: {
    heading: String,
    coreTeamMembers: {
      default: () => [],
    },
    experts: {
      default: () => [],
    },
  },

  computed: {
    allTeamMembersButtonLabel() {
      return this.$t(`types.${pages.index.typeName}.teamSection.allTeamMembers`)
    },
  },
}
</script>

<style lang="scss" scoped>
.va-ps--Team {
  &__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &__core {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: $spacing--micro--xl;
    width: 100%;
    margin-bottom: $spacing--micro--xl;

    @include desktops {
      flex-direction: row;
    }

    &__member {
      flex: 1;

      &__image {
        width: 100%;
        object-fit: cover;
      }

      &__name {
        margin: $spacing--micro--md 0;
      }
    }
  }

  &__experts {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    &__member__image {
      width: $spacing--macro--xs;
    }
  }
}
</style>