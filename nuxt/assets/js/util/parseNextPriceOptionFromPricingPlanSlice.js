export default (pricingPlanSlice) => {
  const nextPriceOptions = pricingPlanSlice.items.filter((priceOption) => {
    return new Date(priceOption.effective_date) > new Date()
  })

  if (nextPriceOptions.length === 0) return { price: null, effectiveDate: null }

  const nextPriceOption = nextPriceOptions.reduce((previous, current) => {
    return new Date(previous.effective_date) < new Date(current.effective_date)
      ? previous
      : current
  })

  return {
    price: nextPriceOption.price,
    effectiveDate: nextPriceOption.effective_date,
  }
}
