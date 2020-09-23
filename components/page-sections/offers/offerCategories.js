import Vue from 'vue'

export const getOfferCategories = () => {
  const repeatables = Vue.prototype.$nuxt.$api.types.repeatables
  return {
    course: repeatables.course,
    event: repeatables.event,
    book: repeatables.product,
    merchandise: repeatables.product,
    download: repeatables.product,
  }
}
