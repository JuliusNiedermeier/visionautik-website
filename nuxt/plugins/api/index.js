import query from './query'
import types from './types'
import payment from './payment'

export default (context, inject) => {
  const api = { Query: query(context), types, payment }
  inject('api', api)
  context.$api = api
}
