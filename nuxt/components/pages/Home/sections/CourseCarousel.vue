<template>
  <div class="va-ps--CourseCarousel">
    <div class="va-ps--CourseCarousel__body">
      <div class="va-ps--CourseCarousel__body__head-section">
        <h2 class="va-ps--CourseCarousel__body__head-section__heading">
          {{ heading }}
        </h2>
        <button
          class="va-ps--CourseCarousel__body__head-section__button"
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
              `types.${$cms.types.pages.index.typeName}.coursesSection.allCourses`
            )
          }}
        </button>
      </div>
      <div class="va-ps--CourseCarousel__body__carousel">
        <va-mo--Carousel gap displayPlaceholder>
          <va-mo--Offer
            v-for="(course, index) in courses"
            :key="index"
            :uid="course.uid"
            :image="course.general__featured_image.thumbnail.url"
            :title="course.general__heading"
            :description="course.general__excerpt"
            :type="$cms.types.repeatables.offer.typeName"
          />
          <template slot="placeholder">
            <va-mo--ContentPlaceholder
              :heading="
                $t(
                  `types.${$cms.types.pages.index.typeName}.coursesSection.placeholderHeading`
                )
              "
              :body="
                $t(
                  `types.${$cms.types.pages.index.typeName}.coursesSection.placeholderBody`
                )
              "
              :buttonLabel="
                $t(
                  `types.${$cms.types.pages.index.typeName}.coursesSection.notify`
                )
              "
              buttonIconName="addNotification"
            />
          </template>
        </va-mo--Carousel>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/molecules/Carousel'
import Offer from '@/components/molecules/Offer'
import Icon from '@/components/atoms/Icon'
import ContentPlaceholder from '@/components/molecules/ContentPlaceholder'
export default {
  name: 'va-ps--CourseCarousel',
  components: {
    'va-mo--Offer': Offer,
    'va-mo--Carousel': Carousel,
    'va-at--Icon': Icon,
    'va-mo--ContentPlaceholder': ContentPlaceholder,
  },

  props: ['heading'],

  data() {
    return {
      courses: [],
    }
  },

  async fetch() {
    // Fetch heading
    const indexPageType = this.$cms.types.pages.index.typeName

    const headingQuery = new this.$cms.Query(
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
    const offerRepeatableType = this.$cms.types.repeatables.offer.typeName

    const coursesQuery = new this.$cms.Query(
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
.va-ps--CourseCarousel {
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
  }
}
</style>