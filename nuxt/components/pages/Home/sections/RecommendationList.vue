<template>
  <div class="va-ps--RecommendationList" v-if="offerListItems.length >= 3">
    <div class="va-ps--RecommendationList__body">
      <h3 class="va-ps--RecommendationList__body__heading">{{ heading }}</h3>
      <div class="va-ps--RecommendationList__body__articles">
        <va-mo--Offer
          class="va-ps--RecommendationList__body__articles__item"
          v-for="courseOfferListItem in offerListItems.filter(
            (item) =>
              item.type === $cms.types.repeatables.offer.typeName &&
              item.general__category === 'course'
          )"
          :key="courseOfferListItem.uid"
          :uid="courseOfferListItem.uid"
          :image="courseOfferListItem.general__featured_image.thumbnail.url"
          :title="courseOfferListItem.general__heading"
          :description="courseOfferListItem.general__excerpt"
          :type="$cms.types.repeatables.offer.typeName"
          :tag="
            $t(
              `types.${$cms.types.repeatables.offer.typeName}.categories.course.singular`
            )
          "
        />
        <va-mo--Offer
          class="va-ps--RecommendationList__body__articles__item"
          v-for="eventOfferListItem in offerListItems.filter(
            (item) =>
              item.type === $cms.types.repeatables.offer.typeName &&
              item.general__category === 'event'
          )"
          :key="eventOfferListItem.uid"
          :uid="eventOfferListItem.uid"
          :image="eventOfferListItem.general__featured_image.thumbnail.url"
          :title="eventOfferListItem.general__heading"
          :description="eventOfferListItem.general__excerpt"
          :type="$cms.types.repeatables.offer.typeName"
          :tag="
            $t(
              `types.${$cms.types.repeatables.offer.typeName}.categories.event.singular`
            )
          "
        />
        <va-mo--Offer
          class="va-ps--RecommendationList__body__articles__item"
          v-for="blogPostOfferListItem in offerListItems.filter(
            (item) => item.type === $cms.types.repeatables.blogPost.typeName
          )"
          :key="blogPostOfferListItem.uid"
          :uid="blogPostOfferListItem.uid"
          :image="blogPostOfferListItem.general__featured_image.thumbnail.url"
          :title="blogPostOfferListItem.general__heading"
          :description="blogPostOfferListItem.general__excerpt"
          :type="$cms.types.repeatables.blogPost.typeName"
          :tag="
            $t(`types.${$cms.types.repeatables.blogPost.typeName}.singular`)
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import Offer from '@/components/molecules/Offer'
export default {
  name: 'va-ps--RecommendationList',
  components: { 'va-mo--Offer': Offer },

  data() {
    return {
      heading: null,
      offerListItems: [],
    }
  },

  methods: {
    getRequiredFieldsByType(types) {
      const typeNames = {
        offer: this.$cms.types.repeatables.offer.typeName,
        blogPost: this.$cms.types.repeatables.blogPost.typeName,
      }
      let fields = []
      if (types.includes(typeNames.offer)) {
        fields.push(
          typeNames.offer + '.general__heading',
          typeNames.offer + '.general__featured_image',
          typeNames.offer + '.general__excerpt',
          typeNames.offer + '.general__category'
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

    fetchOfferByCategory(category) {
      const typeName = this.$cms.types.repeatables.offer.typeName
      const query = new this.$cms.Query(
        [
          this.$prismic.predicates.at(
            `my.${typeName}.general__category`,
            category
          ),
        ],
        {
          orderings: '[document.first_publication_date desc]',
          pageSize: 1,
          fetch: this.getRequiredFieldsByType([typeName]),
        }
      )

      return query.get()
    },

    fetchBlogPost() {
      const typeName = this.$cms.types.repeatables.blogPost.typeName
      const query = new this.$cms.Query(
        [this.$prismic.predicates.at('document.type', typeName)],
        {
          orderings: '[document.first_publication_date desc]',
          pageSize: 1,
          fetch: this.getRequiredFieldsByType([typeName]),
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
        this.$cms.types.repeatables.offer.typeName,
        this.$cms.types.repeatables.blogPost.typeName,
      ]
      const query = new this.$cms.Query(
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
    const indexPageType = this.$cms.types.pages.index.typeName

    const headingQuery = new this.$cms.Query(
      [this.$prismic.predicates.at('document.type', indexPageType)],
      { fetch: [indexPageType + '.recommendations__heading'] }
    )

    const headingResponse = await headingQuery.get()
    if (!headingResponse) return

    this.heading = headingResponse.results[0].data.recommendations__heading

    // Fetch recommended offer items
    let course = this.fetchOfferByCategory('course')
    let event = this.fetchOfferByCategory('event')
    let blog_post = this.fetchBlogPost()

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
.va-ps--RecommendationList {
  background-color: $color__grey--dark;
  @include fill-screen-width;
  padding: $spacing__macro--lg 0;

  &__body {
    @include page-margin;

    &__heading {
      text-align: center;
      margin-top: 0;
      margin-bottom: $spacing__macro--xs;
    }

    &__articles {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: flex-start;

      @include desktops {
        flex-direction: row;
      }

      &__item {
        @include desktops {
          flex: 1;
        }

        & + & {
          margin-top: $spacing__micro--xl;

          @include desktops {
            margin-left: $spacing__micro--xl;
            margin-top: 0;
          }
        }
      }
    }
  }
}
</style>