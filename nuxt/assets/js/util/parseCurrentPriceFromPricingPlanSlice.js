export default (pricingPlanSlice) => {
  const relevantPriceOptions = pricingPlanSlice.items.filter((priceOption) => {
    return !(new Date(priceOption.effective_date) > new Date())
  })

  if (relevantPriceOptions.length === 0) return null

  const currentPriceOption = relevantPriceOptions.reduce(
    (previous, current) => {
      return new Date(previous.effective_date || 0) <
        new Date(current.effective_date || 0)
        ? current
        : previous
    }
  )

  return currentPriceOption.price
}
