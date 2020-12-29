import { repeatables } from '../../../assets/js/types.js'
import subscriptionsRepository from './subscriptionsRepository.js'

export default (req, res) => {
  if (!req.body.subscription || !req.body.recieve || !req.body.lang) {
    console.log(req.body)
    res.status(400).end()
    return
  }

  // Only temporarily!

  const categories = [
    ...repeatables.activity.categories,
    ...repeatables.product.categories,
  ]
  // Always set recieve to all categories
  req.body.recieve = categories

  subscriptionsRepository
    .doc(req.body.subscription.keys.auth)
    .set({
      subscription: req.body.subscription,
      recieve: req.body.recieve,
      lang: req.body.lang.toLowerCase(),
    })
    .then(() => {
      res.status(200).end()
    })
    .catch((error) => {
      console.error(error)
      res.status(400).end()
    })
}
