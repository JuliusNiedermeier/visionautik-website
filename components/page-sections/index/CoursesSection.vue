<template>
  <div class="courses-section-component">
    <div class="courses-section-component__body">
      <div class="courses-section-component__body__head-section">
        <h2 class="courses-section-component__body__head-section__heading">
          {{ heading }}
        </h2>
        <button
          class="courses-section-component__body__head-section__button"
          @click="
            $router.push({
              path: '/offers',
              query: {
                exclude: [
                  'event',
                  'product',
                  'book',
                  'merchandise',
                  'download',
                ],
              },
            })
          "
        >
          {{
            $t(
              `types.${$api.types.pages.index.typeName}.coursesSection.allCourses`
            )
          }}
        </button>
      </div>
      <div class="courses-section-component__body__carousel">
        <va-carousel gap displayPlaceholder>
          <va-offer
            v-for="(course, index) in courses"
            :key="index"
            :uid="course.uid"
            :image="course.general__featured_image.thumbnail.url"
            :title="course.general__heading"
            :description="course.general__excerpt"
            :type="$api.types.repeatables.offer.typeName"
          />
          <template slot="placeholder">
            <va-carousel-placeholder-content
              :heading="
                $t(
                  `types.${$api.types.pages.index.typeName}.coursesSection.placeholderHeading`
                )
              "
              :body="
                $t(
                  `types.${$api.types.pages.index.typeName}.coursesSection.placeholderBody`
                )
              "
              :buttonLabel="
                $t(
                  `types.${$api.types.pages.index.typeName}.coursesSection.notify`
                )
              "
              buttonIconName="addNotification"
            />
          </template>
        </va-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/elements/Carousel'
import Offer from '@/components/elements/Offer'
import Icon from '@/components/elements/Icon'
import CarouselPlaceholderContent from '@/components/elements/CarouselPlaceholderContent'
export default {
  name: 'courses-section',
  components: {
    'va-offer': Offer,
    'va-carousel': Carousel,
    'va-icon': Icon,
    'va-carousel-placeholder-content': CarouselPlaceholderContent,
  },

  data() {
    return {
      heading: null,
      courses: [],
    }
  },

  async fetch() {
    // Fetch heading
    const indexPageType = this.$api.types.pages.index.typeName

    const headingQuery = new this.$api.Query(
      [this.$prismic.predicates.at('document.type', indexPageType)],
      {
        fetch: [indexPageType + '.courses__heading'],
      }
    )

    const headingResponse = await headingQuery.get()
    if (!headingResponse) return

    const headingData = headingResponse.results[0].data

    this.heading = headingData.courses__heading

    // Fetch courses
    const offerRepeatableType = this.$api.types.repeatables.offer.typeName

    const coursesQuery = new this.$api.Query(
      [
        this.$prismic.predicates.at(
          `my.${offerRepeatableType}.general__category`,
          'course'
        ),
      ],
      {
        pageSize: 6,
        fetch: [
          offerRepeatableType + '.general__heading',
          offerRepeatableType + '.general__featured_image',
          offerRepeatableType + '.general__excerpt',
        ],
      }
    )

    const courseResponse = await coursesQuery.get()
    if (!courseResponse) return

    if (this.courses.length > 0) this.courses = []

    courseResponse.results.forEach((result) => {
      this.courses.push({ ...result.data, uid: result.uid })
    })
  },
}
</script>

<style lang="scss" scoped>
.courses-section-component {
  background-color: $color__grey--light;
  @include fill-screen-width;
  padding: $spacing__macro--lg 0;
  overflow-x: hidden;

  &__body {
    @include page-margin;

    &__heading {
      text-align: center;
      margin-top: 0;
      margin-bottom: $spacing__macro--xs;
    }

    &__head-section {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    &__carousel {
      li + li {
        margin-left: $spacing__micro--xl;
      }

      &__placeholder {
        margin: 0 $spacing__micro--xl;

        small {
          display: block;
          margin: $spacing__micro--md 0;
        }
      }
    }
  }
}
</style>