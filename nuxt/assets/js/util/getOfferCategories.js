import { repeatables } from '@/assets/js/types.js'

export default (options) => {
  let offerCategories = [
    ...repeatables.activity.categories.map((category) => {
      return { label: category, parentType: repeatables.activity.typeName }
    }),
    ...repeatables.product.categories.map((category) => {
      return { label: category, parentType: repeatables.product.typeName }
    }),
  ]

  if (options && options.exclude && typeof options.exclude === 'object') {
    offerCategories = offerCategories.filter(
      (category) => !options.exclude.includes(category.label)
    )
  }

  return offerCategories
}
