import query from './query'
import types from './types'
import payment from './payment'

export default (context, inject) => {
  const cms = { Query: query(context), types, payment }

  inject('api', cms)
  context.$api = cms

  inject('cms', cms)
  context.$cms = cms
}
