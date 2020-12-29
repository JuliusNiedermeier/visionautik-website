import query from './queryFactory'
import types from '@/assets/js/types.js'
import payment from './payment'

export default (context, inject) => {
  const cms = { Query: query(context), types, payment }
  inject('cms', cms)
  context.$cms = cms
}
