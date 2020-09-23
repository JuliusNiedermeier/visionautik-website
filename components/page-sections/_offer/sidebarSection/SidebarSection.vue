<template>
  <component :is="sidebar" />
</template>

<script>
import CourseSidebar from './components/CourseSidebar'
import EventSidebar from './components/EventSidebar'
import ProductSidebar from './components/ProductSidebar'
export default {
  components: {
    'va-course-sidebar': CourseSidebar,
    'va-event-sidebar': EventSidebar,
    'va-product-sidebar': ProductSidebar,
  },

  computed: {
    sidebar() {
      switch (this.$route.params.type) {
        case 'course':
          return CourseSidebar
          break
        case 'event':
          return EventSidebar
          break
        case 'product':
          return ProductSidebar
          braek
      }
    },
  },
}
</script>

<style>
</style>