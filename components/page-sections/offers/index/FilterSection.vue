<template>
  <div class="filter-section">
    <div class="filter-section__offer-category-filter">
      <button
        v-for="(offerCategoryChecked, category) in offerCategories"
        :key="category"
        @click="toggleOfferCategory(category)"
        class="filter-section__offer-category-filter__button"
        :class="{ checked: offerCategoryChecked }"
      >
        {{ $t(`types.collections.offers.categories.${category}`) }}
        <va-icon :name="offerCategoryChecked ? 'check' : 'add'" />
      </button>
    </div>
    <div class="filter-section__search-bar">
      <input
        category="text"
        :placeholder="$t('types.collections.offers.searchBarPlaceholder')"
        v-model="searchString"
      />
      <div class="filter-section__search-bar__search-icon">
        <va-icon name="search" size="1.5rem" />
      </div>
    </div>
    <div class="filter-section__target-groups">
      <div class="filter-section__target-groups__filter">
        <p
          v-for="(targetGroup, index) in targetGroups.items"
          :key="index"
          @click="targetGroups.activeIndex = index"
          class="filter-section__target-groups__filter__target-group"
          :class="{ active: index === targetGroups.activeIndex }"
        >
          {{ $t(`types.collections.offers.targetGroups.${targetGroup.label}`) }}
        </p>
      </div>
      <button
        v-if="targetGroups.activeIndex > 0"
        @click="
          targetGroups.infoContentExpanded = !targetGroups.infoContentExpanded
        "
        class="filter-section__target-groups__info-button"
      >
        <span>Info</span
        ><va-icon
          :name="
            targetGroups.infoContentExpanded ? 'chevron-up' : 'chevron-down'
          "
          size="2rem"
        />
      </button>
    </div>
    <div class="filter-section__target-group-info">
      <va-slice-content
        v-if="targetGroups.activeIndex > 0 && targetGroups.infoContentExpanded"
        :documentType="$api.types.collections.offers.typeName"
        :sliceZones="[targetGroups.items[targetGroups.activeIndex].sliceZone]"
        :key="targetGroups.activeIndex"
      />
    </div>
  </div>
</template>

<script>
import SliceContent from '@/components/elements/SliceContent'
import Icon from '@/components/elements/Icon'
export default {
  components: { 'va-slice-content': SliceContent, 'va-icon': Icon },
  data() {
    return {
      offerCategories: {},

      searchString: '',
      searchStringInputTimeoutId: null,

      targetGroups: {
        items: [
          { label: 'all' },
          {
            label: 'changemakers',
            infoContentSlices: [],
            sliceZone: 'for_changemakers__slices',
          },
          {
            label: 'business',
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
    const offerCategories = [
      ...this.$api.types.repeatables.offer.categories,
      ...this.$api.types.repeatables.product.categories,
    ]

    for (const offerCategorie of offerCategories) {
      this.offerCategories[offerCategorie] = true
    }

    const query = this.$route.query

    for (const key of Object.keys(this.offerCategories)) {
      if (query.exclude && query.exclude.includes(key)) {
        this.toggleOfferCategory(key)
      }
    }

    if (query.search) this.searchString = query.search

    if (query.targetGroup) {
      this.targetGroups.activeIndex = this.targetGroups.items.findIndex(
        (targetGroup) => targetGroup.label === query.targetGroup
      )
    }
  },

  methods: {
    toggleOfferCategory(category) {
      this.offerCategories[category] = !this.offerCategories[category]
      this.offerCategories = { ...this.offerCategories }
    },
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
  },

  watch: {
    offerCategories(updatedOfferCategories) {
      let excludedOfferCategories = []

      for (const category in updatedOfferCategories) {
        if (updatedOfferCategories[category] === false) {
          excludedOfferCategories.push(category)
        }
      }

      if (excludedOfferCategories.length < 1) excludedOfferCategories = null

      let query = { ...this.$route.query, exclude: excludedOfferCategories }
      if (!excludedOfferCategories > 0) delete query.exclude
      this.$router.replace({ query })
    },

    searchString(updatedSearchString) {
      clearTimeout(this.searchStringInputTimeoutId)

      this.searchStringInputTimeoutId = setTimeout(() => {
        let query = { ...this.$route.query, search: updatedSearchString }
        if (!updatedSearchString.length > 0) delete query.search
        this.$router.replace({ query })
      }, 1000)
    },

    'targetGroups.activeIndex'(activeIndex) {
      const targetGroup = this.targetGroups.items[activeIndex]
      let query = { ...this.$route.query, targetGroup: targetGroup.label }
      if (targetGroup.label === 'all') delete query.targetGroup
      this.$router.replace({ query })
    },

    async fetchTargetGroupInfoContent(fetchIndex) {
      if (fetchIndex) {
        const type = this.$api.types.collections.offers.typeName
        const query = new this.$api.Query(
          [this.$prismic.predicates.at('document.type', type)],
          {
            fetch: [`${type}.${this.targetGroups.items[fetchIndex].sliceZone}`],
          }
        )

        const apiResponse = await query.get()

        if (!apiResponse) return

        this.targetGroups.items[
          this.targetGroups.activeIndex
        ].infoContentSlices =
          apiResponse.results[0].data[
            this.targetGroups.items[this.targetGroups.activeIndex].sliceZone
          ]
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.filter-section {
  padding-top: 5rem;

  &__offer-category-filter {
    display: flex;
    margin-bottom: 2rem;
    overflow-x: auto;

    &__button {
      display: flex;
      align-items: center;

      & + & {
        margin-left: 2rem;
      }

      & > * {
        margin-left: 1rem;
      }

      &:not(.checked) {
        background: none;
        background-color: $color--lilac--base;

        color: transparentize($color--blue--light, $amount: 0.5);
      }
    }
  }

  &__search-bar {
    position: relative;
    display: flex;
    margin-bottom: 2rem;

    & input {
      flex: 1;
      padding: 1.5rem;
      border: 1px solid $color--lilac--base;
    }

    &__search-icon {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 6rem;

      display: flex;
      justify-content: center;
      align-items: center;

      color: $color--blue--light;

      cursor: pointer;

      &:hover {
        background-color: $color--grey--dark;
      }
    }
  }

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
        color: $color--blue--light;
        white-space: nowrap;

        & + & {
          margin-left: 2rem;
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

      > * + * {
        margin-left: 1rem;
      }
    }
  }
}
</style>