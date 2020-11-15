<template>
  <div class="va-mo--SectionAnchorList">
    <div
      class="va-mo--SectionAnchorList__item"
      :class="{ active: index === activeIndex }"
      v-for="(sectionAnchor, index) in sectionAnchors"
      :key="sectionAnchor.id"
      @click="$router.push(`#${sectionAnchor.id}`)"
    >
      <small
        class="va-mo--SectionAnchorList__item__link"
        :to="'#' + sectionAnchor.id"
        >{{ sectionAnchor.label }}</small
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'va-mo--SectionAnchorList',

  data() {
    return {
      sectionAnchors: [],
      activeIndex: 0,
    }
  },

  methods: {
    getSliceContent() {
      return document.querySelector("[data-component-name='sliceContent']")
    },

    getSectionAnchorsFromSliceContent(sliceContent) {
      if (!sliceContent) return new NodeList()
      return sliceContent.querySelectorAll(
        "[data-component-name='sectionAnchor']"
      )
    },

    setSectionAnchors(sectionAnchorsNodeList) {
      for (const sectionAnchorNode of sectionAnchorsNodeList) {
        if (
          !sectionAnchorNode.dataset.sectionId ||
          !sectionAnchorNode.dataset.sectionLabel
        )
          continue

        const sectionAnchor = {
          id: sectionAnchorNode.dataset.sectionId,
          label: sectionAnchorNode.dataset.sectionLabel,
          color: sectionAnchorNode.dataset.sectionColor
            ? sectionAnchorNode.dataset.sectionColor
            : null,
        }

        this.sectionAnchors = [...this.sectionAnchors, sectionAnchor]
      }
    },

    handleSliceContentMutation() {
      this.setSectionAnchors(
        this.getSectionAnchorsFromSliceContent(this.getSliceContent())
      )
    },

    handleIntersection(entries) {
      for (const entry of entries) {
        if (entry.intersectionRatio > 0) {
          this.activeIndex = this.sectionAnchors.findIndex(
            (sectionAnchor) =>
              sectionAnchor.id === entry.target.dataset.sectionId
          )
        }
      }
    },
  },

  mounted() {
    const sliceContent = this.getSliceContent()
    this.setSectionAnchors(this.getSectionAnchorsFromSliceContent(sliceContent))

    const sliceContentObserver = new MutationObserver(
      this.handleSliceContentMutation
    )
    sliceContentObserver.observe(sliceContent, { childList: true })
  },

  watch: {
    sectionAnchors(sectionAnchors) {
      const intersectionObserver = new IntersectionObserver(
        this.handleIntersection,
        { root: null, rootMargin: '-25% 0px -25% 0px' }
      )
      for (const sectionAnchor of sectionAnchors) {
        const sectionAnchorNode = document.querySelector(`#${sectionAnchor.id}`)
        intersectionObserver.observe(sectionAnchorNode)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.va-mo--SectionAnchorList {
  padding: $spacing__micro--xl;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 $spacing__micro--xl;
  height: 100%;

  &__item {
    position: relative;
    border-left: 1px solid $color__blue--light;
    padding-left: $spacing__micro--xl;
    padding-top: $spacing__micro--sm;
    padding-bottom: $spacing__micro--sm;
    color: $color__blue--light;
    cursor: pointer;
    transition: all $duration--fast ease;

    &:hover {
      filter: brightness(1.5);
    }

    &.active {
      color: white;
      border-color: $color__red--light;
    }
  }
}
</style>