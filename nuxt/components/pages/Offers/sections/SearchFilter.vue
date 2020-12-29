<template>
  <div class="va-ps--SearchFilter">
    <va-at--Input
      class="va-ps--SearchFilter__input"
      :placeholder="searchBarPlaceholder"
      v-model="searchString"
      appearance="light"
      iconName="search"
      grow
      big
    />
  </div>
</template>

<script>
import Input from '@/components/atoms/Input.vue'
import { collections } from '@/assets/js/types.js'
export default {
  name: 'va-ps--SearchFilter',
  components: { 'va-at--Input': Input },
  data() {
    return {
      searchString: '',
      searchStringInputTimeoutId: null,
      typing: false,
    }
  },

  methods: {
    handleSearchStringUpdate(updatedSearchString) {
      if (this.searchStringInputTimeoutId) {
        clearTimeout(this.searchStringInputTimeoutId)
      }

      this.typing = true

      this.searchStringInputTimeoutId = setTimeout(() => {
        this.typing = false
        let query = { ...this.$route.query, search: updatedSearchString }
        if (updatedSearchString.length === 0) delete query.search
        this.$router.replace({ query })
      }, 1000)
    },
  },

  created() {
    this.searchString = this.$route.query.search
    this.$watch('searchString', this.handleSearchStringUpdate)
  },

  computed: {
    searchBarPlaceholder() {
      return this.$t(
        `types.${collections.offers.typeName}.searchBarPlaceholder`
      )
    },
  },

  watch: {},
}
</script>

<style lang="scss" scoped>
.va-ps--SearchFilter {
  position: relative;
  display: flex;
  margin-bottom: $spacing__micro--xl;
}
</style>