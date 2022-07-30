<template>
  <div class="va-pa--TeamMember">
    <va-mo--PageHeader :imageUrl="teamMember.general__featured_image.url"
      ><h2>{{ teamMember.general__name }}</h2>
      <i>{{ teamMember.general__occupation }}</i></va-mo--PageHeader
    >
    <va-at--PageSection padding="bottom">
      <div class="va-pa--TeamMember__main-content">
        <va-ps--Vita
          class="va-pa--TeamMember__main-content__vita"
          :richTextField="teamMember.general__vita"
        />
        <div class="va-pa--TeamMember__main-content__info">
          <va-ps--InfoList
            class="va-pa--TeamMember__main-content__info__expertise"
            v-if="teamMember.general__expertise_list.length"
            :heading="page.general__expertise"
            :infos="teamMember.general__expertise_list"
          />
          <va-ps--InfoList
            class="va-pa--TeamMember__main-content__info__questions"
            v-if="teamMember.general__questions_list.length"
            :heading="page.general__questions"
            :infos="teamMember.general__questions_list"
          />
          <va-ps--References
            class="va-pa--TeamMember__main-content__info__references"
            :websiteUrl="teamMember.general__website.url"
            :email="teamMember.general__email_address"
            :videoEmbed="teamMember.general__video"
          />
        </div>
      </div>
    </va-at--PageSection>
  </div>
</template>

<script>
import PageHeader from '@/components/molecules/PageHeader.vue'
import PageSection from '@/components/atoms/PageSection.vue'
import Vita from './sections/Vita.vue'
import InfoList from './sections/InfoList.vue'
import References from './sections/References.vue'

import { singles, repeatables } from '@/assets/js/types.js'
import fetchOne from '@/mixins/usecases/fetchOne.js'
import fetchOneByUid from '@/mixins/usecases/fetchOneByUid.js'
export default {
  name: 'va-pa--TeamMember',
  components: {
    'va-mo--PageHeader': PageHeader,
    'va-at--PageSection': PageSection,
    'va-ps--Vita': Vita,
    'va-ps--InfoList': InfoList,
    'va-ps--References': References,
  },
  mixins: [fetchOne, fetchOneByUid],

  data() {
    return {
      page: {},
      teamMember: {
        general__featured_image: { url: null },
        general__expertise_list: [],
        general__questions_list: [],
        general__website: { url: null },
      },
    }
  },

  async fetch() {
    const [pageResponse, teamMemberResponse] = await Promise.all([
      this.fetchOne(singles.teamMemberPage.typeName),
      this.fetchOneByUid(
        repeatables.teamMember.typeName,
        this.$route.params.uid
      ),
    ])

    if (!pageResponse || !teamMemberResponse) return
    this.page = pageResponse.results[0].data
    this.teamMember = teamMemberResponse.results[0].data
  },
}
</script>

<style lang="scss" scoped>
.va-pa--TeamMember {
  &__main-content {
    padding-top: $spacing--macro--xs;

    @include desktops {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    &__vita {
      margin-bottom: $spacing--macro--xs;

      @include desktops {
        margin-right: $spacing--macro--xs;
      }
    }

    &__info {
      flex-shrink: 0;

      &__expertise {
        margin-bottom: $spacing--macro--xs;
      }

      &__questions {
        margin-bottom: $spacing--macro--xs;
      }
    }
  }
}
</style>
