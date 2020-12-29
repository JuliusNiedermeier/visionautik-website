import { repeatables, pages } from '@/assets/js/types.js'

/**
 * To learn more about Link Resolving check out the Prismic documentation
 */

export default function (doc) {
  if (doc.isBroken) {
    return '/404'
  }

  if (doc.type === pages.index.typeName) {
    return '/'
  }

  if (doc.type === repeatables.activity.typeName) {
    return '/offers/activity/' + doc.uid
  }

  return '/404'
}
