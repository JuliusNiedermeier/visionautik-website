<template>
  <div class="featured-section-component">
    <div class="featured-section-component__body">
      <h4 class="featured-section-component__body__heading">{{heading}}</h4>
      <div class="featured-section-component__body__articles">
        <offer-list-item
          v-for="courseOfferListItem in offerListItems.filter(item => item.type === 'course')"
          :key="courseOfferListItem.uid"
          :link="`/offers/${courseOfferListItem.uid}`"
          :image="courseOfferListItem.cover_image.url"
          :title="courseOfferListItem.name"
          :description="courseOfferListItem.brief_description"
        />
        <offer-list-item
          v-for="eventOfferListItem in offerListItems.filter(item => item.type === 'event')"
          :key="eventOfferListItem.uid"
          :link="`/offers/${eventOfferListItem.uid}`"
          :image="eventOfferListItem.cover_image.url"
          :title="eventOfferListItem.name"
          :description="eventOfferListItem.brief_description"
        />
        <offer-list-item
          v-for="blogPostOfferListItem in offerListItems.filter(item => item.type === 'blog_post')"
          :key="blogPostOfferListItem.uid"
          :link="`/offers/${blogPostOfferListItem.uid}`"
          :image="blogPostOfferListItem.featured_image.url"
          :title="blogPostOfferListItem.headline"
          :description="blogPostOfferListItem.excerpt"
        />
      </div>
    </div>
  </div>
</template>

<script>
import OfferListItem from '@/components/global/OfferListItem'
export default {
  components: { 'offer-list-item': OfferListItem },

  data() {
    return {
      heading: null,
      offerListItems: [],
    }
  },

  methods: {
    getRequiredFieldsByType(types) {
      let fields = []
      if (types.includes('course')) {
        fields.push(
          'course.name',
          'course.cover_image',
          'course.brief_description'
        )
      }
      if (types.includes('event')) {
        fields.push(
          'event.name',
          'event.cover_image',
          'event.brief_description'
        )
      }
      if (types.includes('blog_post')) {
        fields.push(
          'blog_post.headline',
          'blog_post.featured_image',
          'blog_post.excerpt'
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
        idPredicates.push(
          ...[
            this.$prismic.predicates.not('document.id', id),
            this.$prismic.predicates.not('document.id', id),
            this.$prismic.predicates.not('document.id', id),
          ]
        )
      })
      const types = ['course', 'event', 'blog_post']
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
    const headingQuery = new this.$api.Query(
      [this.$prismic.predicates.at('document.type', 'homepage')],
      { fetch: ['homepage.featured__heading'] }
    )

    const headingResponse = await headingQuery.get()
    if (!headingResponse) return

    this.heading = headingResponse.results[0].data.featured__heading

    // Fetch recommended offer items
    let course = this.fetchOneByTypeHelper('course')
    let event = this.fetchOneByTypeHelper('event')
    let blog_post = this.fetchOneByTypeHelper('blog_post')

    let responses = await Promise.all([course, event, blog_post])

    let fetchedIds = []
    responses.forEach((response) => {
      if (response.results_size > 0) fetchedIds.push(response.results[0].id)
    })

    if (fetchedIds.length < 3) {
      const missingDocumentsCount = 3 - fetchedIds.length

      const newResponse = await this.fetchByExcludingIdsHelper(
        fetchedIds,
        missingDocumentsCount
      )

      newResponse.results.forEach((result, index) => {
        responses[
          responses.findIndex((response) => response.results_size === 0)
        ] = { results: [result], results_size: 1 }
      })
    }

    if (this.offerListItems.length > 0) this.offerListItems = []

    responses.forEach((response) => {
      if (response.results_size > 0) {
        this.offerListItems = [
          ...this.offerListItems,
          {
            ...response.results[0].data,
            uid: response.results[0].uid,
            type: response.results[0].type,
          },
        ]
      }
    })
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
      align-items: strech;

      @include desktops {
        flex-direction: row;

        > article {
          flex: 1;
        }

        > article + article {
          margin-left: 2rem;
        }
      }
    }
  }
}
</style>