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
          {{ $t('types.pages.index.allCourses') }}
        </button>
      </div>
      <div class="courses-section-component__body__carousel">
        <va-carousel gap>
          <va-offer
            v-for="(course, index) in courses"
            :key="index"
            :uid="course.uid"
            :image="course.general__featured_image.thumbnail.url"
            :title="course.general__heading"
            :description="course.general__excerpt"
            :type="$api.types.repeatables.course"
          />
        </va-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/elements/Carousel'
import Offer from '@/components/elements/Offer'
export default {
  name: 'courses-section',
  components: {
    'va-offer': Offer,
    'va-carousel': Carousel,
  },

  data() {
    return {
      heading: null,
      courses: [],
    }
  },

  async fetch() {
    // Fetch heading
    const indexPageType = this.$api.types.pages.index

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
    const courseRepeatableType = this.$api.types.repeatables.course

    const coursesQuery = new this.$api.Query(
      [this.$prismic.predicates.at('document.type', courseRepeatableType)],
      {
        pageSize: 6,
        fetch: [
          courseRepeatableType + '.general__heading',
          courseRepeatableType + '.general__featured_image',
          courseRepeatableType + '.general__excerpt',
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
  background-color: $color--grey--light;
  @include fill-screen-width;
  padding: 20rem 0;
  overflow-x: hidden;

  &__body {
    @include page-margin;

    &__heading {
      text-align: center;
      margin-top: 0;
      margin-bottom: 5rem;
    }

    &__head-section {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    &__carousel {
      li + li {
        margin-left: 2rem;
      }
    }
  }
}
</style>