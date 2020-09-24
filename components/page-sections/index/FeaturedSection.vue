<template>
  <div class="featured-section-component">
    <div class="featured-section-component__body">
      <h3 class="featured-section-component__body__heading">{{heading}}</h3>
      <div class="featured-section-component__body__articles">
        <va-offer
          v-for="courseOfferListItem in offerListItems.filter(item => item.type === $api.types.repeatables.course)"
          :key="courseOfferListItem.uid"
          :uid="courseOfferListItem.uid"
          :image="courseOfferListItem.general__featured_image.thumbnail.url"
          :title="courseOfferListItem.general__heading"
          :description="courseOfferListItem.general__excerpt"
          :type="$api.types.repeatables.course"
          :tag="$t('types.repeatables.course.tag')"
        />
        <va-offer
          v-for="eventOfferListItem in offerListItems.filter(item => item.type === $api.types.repeatables.event)"
          :key="eventOfferListItem.uid"
          :uid="eventOfferListItem.uid"
          :image="eventOfferListItem.general__featured_image.thumbnail.url"
          :title="eventOfferListItem.general__heading"
          :description="eventOfferListItem.general__excerpt"
          :type="$api.types.repeatables.event"
          :tag="$t('types.repeatables.event.tag')"
        />
        <va-offer
          v-for="blogPostOfferListItem in offerListItems.filter(item => item.type === $api.types.repeatables.blogPost)"
          :key="blogPostOfferListItem.uid"
          :uid="blogPostOfferListItem.uid"
          :image="blogPostOfferListItem.general__featured_image.thumbnail.url"
          :title="blogPostOfferListItem.general__heading"
          :description="blogPostOfferListItem.general__excerpt"
          :type="$api.types.repeatables.blogPost"
          :tag="$t('types.repeatables.blogPost.tag')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Offer from '@/components/elements/Offer'
export default {
  components: { 'va-offer': Offer },

  data() {
    return {
      heading: null,
      offerListItems: [],
    }
  },

  methods: {
    getRequiredFieldsByType(types) {
      const typeNames = {
        course: this.$api.types.repeatables.course,
        event: this.$api.types.repeatables.event,
        blogPost: this.$api.types.repeatables.blogPost,
      }
      let fields = []
      if (types.includes(typeNames.course)) {
        fields.push(
          typeNames.course + '.general__heading',
          typeNames.course + '.general__featured_image',
          typeNames.course + '.general__excerpt'
        )
      }
      if (types.includes(typeNames.event)) {
        fields.push(
          typeNames.event + '.general__heading',
          typeNames.event + '.general__featured_image',
          typeNames.event + '.general__excerpt'
        )
      }
      if (types.includes(typeNames.blogPost)) {
        fields.push(
          typeNames.blogPost + '.general__heading',
          typeNames.blogPost + '.general__featured_image',
          typeNames.blogPost + '.general__excerpt'
        )
      }
      return fields
    },

    fetchOneByTypeHelper(documentType) {
      const query = new this.$api.Query(
        [this.$prismic.predicates.at('document.type', documentType)],
        {
          orderings: '[document.first_publication_date desc]',
          pageSize: 1,
          fetch: this.getRequiredFieldsByType([documentType]),
        }
      )

      return query.get()
    },

    fetchByExcludingIdsHelper(ids, max) {
      let idPredicates = []
      ids.forEach((id) => {
        idPredicates.push(this.$prismic.predicates.not('document.id', id))
      })
      const types = [
        this.$api.types.repeatables.course,
        this.$api.types.repeatables.event,
        this.$api.types.repeatables.blogPost,
      ]
      const query = new this.$api.Query(
        [this.$prismic.predicates.any('document.type', types), ...idPredicates],
        {
          orderings: '[document.first_publication_date desc]',
          pageSize: max || 1,
          fetch: this.getRequiredFieldsByType(types),
        }
      )

      return query.get()
    },
  },

  async fetch() {
    //Fetch heading
    const indexPageType = this.$api.types.pages.index

    const headingQuery = new this.$api.Query(
      [this.$prismic.predicates.at('document.type', indexPageType)],
      { fetch: [indexPageType + '.recommendations__heading'] }
    )

    const headingResponse = await headingQuery.get()
    if (!headingResponse) return

    this.heading = headingResponse.results[0].data.recommendations__heading

    // Fetch recommended offer items
    let course = this.fetchOneByTypeHelper(this.$api.types.repeatables.course)
    let event = this.fetchOneByTypeHelper(this.$api.types.repeatables.event)
    let blog_post = this.fetchOneByTypeHelper(
      this.$api.types.repeatables.blogPost
    )

    let responses = await Promise.all([course, event, blog_post])

    let fetchedIds = []
    for (const response of responses) {
      if (response && response.results_size > 0) {
        fetchedIds.push(response.results[0].id)
      }
    }

    if (fetchedIds.length < 3) {
      const missingDocumentsCount = 3 - fetchedIds.length

      const newResponse = await this.fetchByExcludingIdsHelper(
        fetchedIds,
        missingDocumentsCount
      )

      for (const result of newResponse.results) {
        const availableIndex = responses.findIndex((response) => !response)
        responses[availableIndex] = { results: [result], results_size: 1 }
      }
    }

    if (this.offerListItems.length > 0) this.offerListItems = []

    for (const response of responses) {
      if (response && response.results_size > 0) {
        this.offerListItems = [
          ...this.offerListItems,
          {
            ...response.results[0].data,
            uid: response.results[0].uid,
            type: response.results[0].type,
          },
        ]
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.featured-section-component {
  background-color: $color--grey--dark;
  @include fill-screen-width;
  padding: 20rem 0;

  &__body {
    @include page-margin;

    &__heading {
      text-align: center;
      margin-top: 0;
      margin-bottom: 5rem;
    }

    &__articles {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;

      > * + * {
        margin-top: 2rem;
      }

      @include desktops {
        flex-direction: row;

        > * {
          flex: 1;
        }

        > * + * {
          margin-left: 2rem;
          margin-top: 0;
        }
      }
    }
  }
}
</style>