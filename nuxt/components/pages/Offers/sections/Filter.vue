<template>
  <div class="va-ps--Filter">
    <div class="va-ps--Filter__offer-category-filter">
      <button
        v-for="(category, categoryKey) in categories"
        :key="categoryKey"
        @click="toggleOfferCategory(categoryKey)"
        class="va-ps--Filter__offer-category-filter__button"
        :class="{ checked: category.enabled }"
      >
        {{ $t(`types.${category.typeName}.categories.${categoryKey}.plural`) }}
        <va-at--Icon :name="category.enabled ? 'check' : 'add'" />
      </button>
    </div>
    <div class="va-ps--Filter__search-bar">
      <input
        category="text"
        :placeholder="
          $t(
            `types.${$api.types.collections.offers.typeName}.searchBarPlaceholder`
          )
        "
        v-model="searchString"
      />
      <div class="va-ps--Filter__search-bar__search-icon">
        <va-at--Icon name="search" />
      </div>
    </div>
    <div class="va-ps--Filter__target-groups">
      <div class="va-ps--Filter__target-groups__filter">
        <p
          v-for="(targetGroup, index) in targetGroups.items"
          :key="index"
          @click="targetGroups.activeIndex = index"
          class="va-ps--Filter__target-groups__filter__target-group"
          :class="{ active: index === targetGroups.activeIndex }"
        >
          {{
            $t(
              index === 0
                ? `types.${$api.types.collections.offers.typeName}.allTargetGroupsLabel`
                : `global.targetGroups.${targetGroup.label}.for`
            )
          }}
        </p>
      </div>
      <button
        v-if="targetGroups.activeIndex > 0"
        @click="
          targetGroups.infoContentExpanded = !targetGroups.infoContentExpanded
        "
        class="va-ps--Filter__target-groups__info-button"
      >
        <span>Info</span
        ><va-at--Icon
          :name="
            targetGroups.infoContentExpanded ? 'chevron-up' : 'chevron-down'
          "
        />
      </button>
    </div>
    <div class="va-ps--Filter__target-group-info">
      <va-or--SliceContent
        v-if="targetGroups.activeIndex > 0 && targetGroups.infoContentExpanded"
        :documentType="$api.types.collections.offers.typeName"
        :sliceZones="[targetGroups.items[targetGroups.activeIndex].sliceZone]"
        :key="targetGroups.activeIndex"
      />
    </div>
  </div>
</template>

<script>
import SliceContent from '@/components/organisms/SliceContent'
import Icon from '@/components/atoms/Icon'
export default {
  name: 'va-ps--Filter',
  components: { 'va-or--SliceContent': SliceContent, 'va-at--Icon': Icon },
  data() {
    return {
      categories: {},

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
    const assignCategories = (categories, typeName) => {
      for (const category of categories) {
        this.categories[category] = { enabled: true, typeName }
      }
    }

    assignCategories(
      this.$api.types.repeatables.offer.categories,
      this.$api.types.repeatables.offer.typeName
    )

    assignCategories(
      this.$api.types.repeatables.product.categories,
      this.$api.types.repeatables.product.typeName
    )

    const query = this.$route.query

    for (const key of Object.keys(this.categories)) {
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
      this.categories[category].enabled = !this.categories[category].enabled
      this.categories = { ...this.categories }
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
    categories(updatedOfferCategories) {
      let excludedOfferCategories = []

      for (const category in updatedOfferCategories) {
        if (updatedOfferCategories[category].enabled === false) {
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
.va-ps--Filter {
  padding-top: $spacing__macro--xs;

  &__offer-category-filter {
    display: flex;
    margin-bottom: $spacing__micro--xl;
    overflow-x: auto;

    &__button {
      display: flex;
      align-items: center;

      & + & {
        margin-left: $spacing__micro--xl;
      }

      & > * {
        margin-left: $spacing__micro--md;
      }

      &:not(.checked) {
        background: none;
        background-color: $color__lilac--base;

        color: transparentize($color__blue--light, $amount: 0.5);
      }
    }
  }

  &__search-bar {
    position: relative;
    display: flex;
    margin-bottom: $spacing__micro--xl;

    & input {
      flex: 1;
      padding: $spacing__micro--lg $spacing__micro--xl;
      border: 1px solid $color__lilac--base;
    }

    &__search-icon {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: $spacing__macro--xs;

      display: flex;
      justify-content: center;
      align-items: center;

      color: $color__blue--light;

      cursor: pointer;

      &:hover {
        background-color: $color__grey--dark;
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

      > * + * {
        margin-left: $spacing__micro--md;
      }
    }
  }
}
</style>