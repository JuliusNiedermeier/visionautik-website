import Prismic from 'prismic-javascript'
import subscriptionsRepository from './subscriptionsRepository.js'
import { repeatables } from '../../../assets/js/types.js'
import push from 'web-push'
import dotenv from 'dotenv'
dotenv.config()

push.setVapidDetails(
  'http://visionautik.de',
  process.env.WEBPUSH_PUBLIC_KEY,
  process.env.WEBPUSH_PRIVATE_KEY
)

export default async (req, res) => {
  console.log('PUSH ENDPOINT CALLED')
  if (
    !req.body.secret ||
    req.body.secret !== process.env.PUSH_NOTIFICATIONS_ENDOINT_SECRET
  ) {
    res.status(403).end()
    return
  }

  if (req.body.type === 'test-trigger' || !req.body.documents) {
    res.status(200).end()
    return
  }

  try {
    let subscriptionDocuments = await subscriptionsRepository.get()
    if (subscriptionDocuments.size === 0) {
      res.status(200).end()
      return
    }

    const subscriberLanguages = new Set()
    subscriptionDocuments.forEach((doc) =>
      subscriberLanguages.add(doc.data().lang)
    )

    let localizedNotifications = {}
    const api = await Prismic.api(process.env.PRISMIC_ENDPOINT)
    for (const lang of subscriberLanguages) {
      const predicate = Prismic.Predicates.any(
        'document.id',
        req.body.documents
      )
      const response = await api.query(predicate, {
        orderings: '[document.first_publication_date desc]',
        lang: lang,
        fetch: [],
      })

      const validTypes = [
        repeatables.activity.typeName,
        repeatables.product.typeName,
      ]

      const validResults = response.results.filter((result) =>
        validTypes.includes(result.type)
      )

      if (response.results_size === 0 || !validResults.length) continue

      localizedNotifications[lang] = []

      validResults.forEach((result) => {
        localizedNotifications[lang].push(
          JSON.stringify({
            title: result.data.general__heading,
            body: result.data.general__excerpt,
            image: result.data.general__featured_image.url,
            icon: '/icon.png',
            badge: '',
          })
        )
      })
    }

    subscriptionDocuments.forEach((doc) => {
      if (!localizedNotifications[doc.data().lang]) return

      localizedNotifications[doc.data().lang].forEach((notification) => {
        push
          .sendNotification(doc.data().subscription, notification)
          .catch(() => {
            subscriptionsRepository.doc(doc.id).delete()
          })
      })
    })
    res.status(200).end()
    return
  } catch (error) {
    console.error(error)
    res.status(500).end()
    return
  }
}
