<template>
  <div class="featured-section-component">
    <div class="featured-section-component__body">
      <h4 class="featured-section-component__body__heading">{{heading}}</h4>
      <div class="featured-section-component__body__articles">
        <offer-list-item
          v-for="(courseOfferListItem, index) in offerListItems.filter(item => item.type === 'course')"
          :key="index"
          :link="`/offers/${courseOfferListItem.uid}`"
          :image="courseOfferListItem.course_cover_image.url"
          :title="courseOfferListItem.course_name"
          :description="courseOfferListItem.course_brief_description"
        />
        <offer-list-item
          v-for="(eventOfferListItem, index) in offerListItems.filter(item => item.type === 'event')"
          :key="index"
          :link="`/offers/${eventOfferListItem.uid}`"
          :image="eventOfferListItem.event_cover_image.url"
          :title="eventOfferListItem.event_name"
          :description="eventOfferListItem.event_brief_description"
        />
        <offer-list-item
          v-for="(blogPostOfferListItem, index) in offerListItems.filter(item => item.type === 'blog_post')"
          :key="index"
          :link="`/offers/${blogPostOfferListItem.uid}`"
          :image="blogPostOfferListItem.post_featured_image.url"
          :title="blogPostOfferListItem.post_headline"
          description="Bitragsauszüge werden zurzeit noch nicht unterstützt."
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
    fetchOneByTypeHelper(documentType) {
      return this.$prismic.api.query(
        this.$prismic.predicates.at('document.type', documentType),
        {
          lang: this.localeIso,
          orderings: '[document.first_publication_date desc]',
          pageSize: 1,
        }
      )
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
      return this.$prismic.api.query(
        [
          this.$prismic.predicates.any('document.type', [
            'course',
            'event',
            'blog_post',
          ]),
          ...idPredicates,
        ],
        {
          lang: this.localeIso,
          orderings: '[document.first_publication_date desc]',
          pageSize: max || 1,
        }
      )
    },
  },

  async fetch() {
    //Fetching the heading
    const homepageResponse = (
      await this.$prismic.api.query(
        this.$prismic.predicates.at('document.type', 'homepage'),
        {
          lang: this.localeIso,
          fetch: 'homepage.featured_section_heading',
        }
      )
    ).results[0].data

    try {
      this.heading = homepageResponse.featured_section_heading
    } catch {}

    // Fetching recommended offer items
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