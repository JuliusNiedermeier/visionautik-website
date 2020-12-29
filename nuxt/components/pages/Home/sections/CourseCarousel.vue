<template>
  <va-at--PageSection standout padding="both">
    <div class="va-ps--CourseCarousel">
      <div class="va-ps--CourseCarousel__head-section">
        <h2 class="va-ps--CourseCarousel__head-section__heading">
          {{ heading }}
        </h2>
        <va-at--Button
          class="va-ps--CourseCarousel__head-section__button"
          iconName="chevron-right"
          :to="allCoursesRoute"
        >
          {{ buttonLabel }}
        </va-at--Button>
      </div>
      <div class="va-ps--CourseCarousel__carousel">
        <va-mo--Carousel gap displayPlaceholder>
          <va-mo--Offer
            v-for="(course, index) in courses"
            :key="index"
            :uid="course.uid"
            :image="course.general__featured_image.thumbnail.url"
            :title="course.general__heading"
            :description="course.general__excerpt"
            :type="courseType"
            fixedWidth
            :price="parseLowestPrice(course.pricing__slices)"
          />
          <template slot="placeholder">
            <va-mo--ContentPlaceholder
              appearance="dark"
              :heading="placeholderData.heading"
              :body="placeholderData.body"
              :buttonLabel="placeholderData.buttonLabel"
              buttonIconName="addNotification"
              centered
              @click="handlePlaceholderClick"
            />
          </template>
        </va-mo--Carousel>
      </div>
    </div>
  </va-at--PageSection>
</template>

<script>
import PageSection from '@/components/atoms/PageSection.vue'
import Button from '@/components/atoms/Button.vue'
import Carousel from '@/components/molecules/Carousel'
import Offer from '@/components/molecules/Offer'
import Icon from '@/components/atoms/Icon'
import ContentPlaceholder from '@/components/molecules/ContentPlaceholder'
import parseLowestPriceFromPricingPlanSlices from '@/assets/js/util/parseLowestPriceFromPricingPlanSlices.js'
import getOfferCategories from '@/assets/js/util/getOfferCategories.js'
import { pages, repeatables } from '@/assets/js/types.js'
import subscribeToNotifications from '@/mixins/usecases/subscribeToNotifications.js'
export default {
  name: 'va-ps--CourseCarousel',
  mixins: [subscribeToNotifications],
  components: {
    'va-at--PageSection': PageSection,
    'va-mo--Offer': Offer,
    'va-mo--Carousel': Carousel,
    'va-at--Icon': Icon,
    'va-mo--ContentPlaceholder': ContentPlaceholder,
    'va-at--Button': Button,
  },

  props: {
    heading: String,
    courses: {
      default: () => [],
    },
  },

  data() {
    return {
      allCoursesRoute: {
        name: 'offers',
        query: {
          exclude: getOfferCategories({ exclude: ['course'] }).map(
            (category) => category.label
          ),
        },
      },

      courseType: repeatables.activity.typeName,
    }
  },

  computed: {
    buttonLabel() {
      return this.$t(`types.${pages.index.typeName}.coursesSection.allCourses`)
    },

    placeholderData() {
      return {
        heading: this.$t(`global.placeholders.courses.heading`),
        body: this.$t(`global.placeholders.courses.body`),
        buttonLabel: this.$t(`global.placeholders.courses.buttonLabel`),
      }
    },
  },

  methods: {
    parseLowestPrice(prcingPlanSlices) {
      return parseLowestPriceFromPricingPlanSlices.call(this, ...arguments)
    },

    handlePlaceholderClick() {
      this.subscribeToNotifications([
        repeatables.activity.categories.find((cat) => cat === 'course'),
      ])
    },
  },
}
</script>

<style lang="scss" scoped>
.va-ps--CourseCarousel {
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
</style>