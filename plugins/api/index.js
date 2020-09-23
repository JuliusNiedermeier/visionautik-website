import Vue from 'vue'
import Query from './query'
import types from './types'
import payment from './payment'

Vue.use({
  install(Vue) {
    Vue.prototype.$api = { Query, types, payment }
  },
})
