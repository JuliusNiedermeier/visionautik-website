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
              :image="course.course_cover_image.url"
              :title="course.course_name"
              :description="course.course_brief_description"
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
    //Fetching the heading
    const homepageResponse = (
      await this.$prismic.api.query(
        this.$prismic.predicates.at('document.type', 'homepage'),
        {
          lang: this.localeIso,
          fetch: 'homepage.courses_section_heading',
        }
      )
    ).results[0].data

    try {
      this.heading = homepageResponse.courses_section_heading
    } catch {}

    // Fetching courses
    const courseResults = (
      await this.$prismic.api.query(
        this.$prismic.predicates.at('document.type', 'course'),
        {
          lang: this.localeIso,
          fetch: [
            // 'homepage.welcome_section_background_video',
            // 'homepage.welcome_section_heading',
            // 'homepage.welcome_section_sub_heading',
          ],
        }
      )
    ).results

    courseResults.forEach((result) => {
      this.courses.push({ ...result.data, uid: result.uid })
    })
  },
}
</script>

<style lang="scss" scoped>
.courses-section-component {
  background-color: $color--grey--dark;
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