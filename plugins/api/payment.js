const getCurrentPriceFromPricingTier = (pricingTier) => {
  let currentPriceOption = null

  for (const priceOption of pricingTier.items) {
    if (!priceOption.effective_date && !currentPriceOption) {
      currentPriceOption = priceOption
      continue
    }

    if (
      new Date(priceOption.effective_date) < new Date() &&
      (!currentPriceOption ||
        new Date(priceOption.effective_date) >
          new Date(currentPriceOption ? currentPriceOption.effective_date : ''))
    ) {
      currentPriceOption = priceOption
    }
  }

  return currentPriceOption ? currentPriceOption.price : null
}

const getNextPriceFromPricingTier = (pricingTier) => {}

export default { getCurrentPriceFromPricingTier, getNextPriceFromPricingTier }
