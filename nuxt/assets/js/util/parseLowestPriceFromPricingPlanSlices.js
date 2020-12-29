import parseCurrentPriceFromPricingPlanSlice from '@/assets/js/util/parseCurrentPriceFromPricingPlanSlice.js'

export default (pricingPlanSlices) => {
  if (!pricingPlanSlices || pricingPlanSlices.length === 0) return null

  const prices = pricingPlanSlices
    .map((pricingPlanSlice) =>
      parseCurrentPriceFromPricingPlanSlice(pricingPlanSlice)
    )
    .filter((price) => price)

  if (prices.length === 0) return null

  return prices.reduce((previous, current) =>
    current < previous ? current : previous
  )
}
