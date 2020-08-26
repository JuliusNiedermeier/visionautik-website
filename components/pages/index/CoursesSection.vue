<template>
  <div class="courses-section-component">
    <div class="courses-section-component__body">
      <div class="courses-section-component__body__head-section">
        <h2 class="courses-section-component__body__head-section__heading">{{heading}}</h2>
        <button class="courses-section-component__body__head-section__button">{{$t('allCourses')}}</button>
      </div>
      <div class="courses-section-component__body__carousel">
        <va-carousel :slidesPerFrame="slidesPerFrame">
          <li v-for="(course, index) in courses" :key="index">
            <offer-list-item
              :link="`/courses/${course.uid}`"
              :image="course.cover_image.url"
              :title="course.name"
              :description="course.brief_description"
            />
          </li>
        </va-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/global/Carousel'
import OfferListItem from '@/components/global/OfferListItem'
export default {
  components: { 'offer-list-item': OfferListItem, 'va-carousel': Carousel },

  data() {
    return {
      heading: null,
      courses: [],
      slidesPerFrame: 3,
    }
  },

  async fetch() {
    // Fetch heading
    const headingQuery = new this.$api.Query(
      [this.$prismic.predicates.at('document.type', 'homepage')],
      {
        fetch: ['homepage.courses__heading'],
      }
    )

    const headingResponse = await headingQuery.get()
    if (!headingResponse) return

    const headingData = headingResponse.results[0].data

    this.heading = headingData.courses__heading

    // Fetch courses
    const coursesQuery = new this.$api.Query(
      [this.$prismic.predicates.at('document.type', 'course')],
      {
        pageSize: 6,
        fetch: [
          'course.name',
          'course.cover_image',
          'course.brief_description',
        ],
      }
    )

    const courseResponse = await coursesQuery.get()
    if (!courseResponse) return

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
  // overflow-x: hidden;

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

<i18n>
{
  "de": {
    "allCourses": "Alle Kurse"
  },
  "en": {
    "allCourses": "All courses"
  }
}
</i18n>