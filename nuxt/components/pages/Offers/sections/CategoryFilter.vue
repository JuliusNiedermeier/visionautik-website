<template>
  <div class="va-ps--CategoryFilter">
    <va-at--Button
      v-for="category of categories"
      :key="category.label"
      @click="toggleOfferCategory(category)"
      class="va-ps--CategoryFilter__button"
      :class="{ checked: category.enabled }"
      :appearance="category.enabled ? 'dark' : 'reduced'"
      :iconName="category.enabled ? 'check' : 'add'"
    >
      {{
        $tc(`types.${category.parentType}.categories.${category.label}`)
      }}
    </va-at--Button>
  </div>
</template>

<script>
import Button from '@/components/atoms/Button.vue'
import getOfferCategories from '@/assets/js/util/getOfferCategories.js'
import { repeatables, collections } from '@/assets/js/types.js'
export default {
  name: 'va-ps--CategoryFilter',
  components: { 'va-at--Button': Button },
  data() {
    return {
      categories: getOfferCategories().map((category) => {
        return { ...category, enabled: true }
      }),
    }
  },

  created() {
    for (const category of this.categories) {
      if (
        this.$route.query.exclude &&
        this.$route.query.exclude.includes(category.label)
      ) {
        this.toggleOfferCategory(category)
      }
    }

    this.$watch('categories', this.handleCategoryUpdate)
  },

  methods: {
    handleCategoryUpdate(categories) {
      let excludedCategoryLabels = categories
        .filter((category) => !category.enabled)
        .map((category) => category.label)

      const query = { ...this.$route.query, exclude: excludedCategoryLabels }
      if (excludedCategoryLabels.length === 0) delete query.exclude
      this.$router.replace({ query })
    },

    toggleOfferCategory(category) {
      const index = this.categories.findIndex((c) => c === category)
      category.enabled = !category.enabled
      this.$set(this.categories, index, category)
    },
  },
}
</script>

<style lang="scss" scoped>
.va-ps--CategoryFilter {
  display: flex;
  margin-bottom: $spacing__micro--xl;
  overflow-x: auto;

  &__button + &__button {
    margin-left: $spacing--micro--xl;
  }
}
</style>