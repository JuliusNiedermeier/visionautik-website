import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home/Home'
import Offers from '@/pages/Offers/Offers'
import Activity from '@/pages/Activity/Activity'
import Product from '@/pages/Product/Product'
import Cart from '@/pages/Cart/Cart'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        name: 'home',
        path: '/',
        component: Home,
      },
      {
        name: 'offers',
        path: '/offers',
        component: Offers,
      },
      {
        name: 'activity',
        path: '/offers/activity/:offer',
        component: Activity,
      },
      {
        name: 'product',
        path: '/offers/product/:offer',
        component: Product,
      },
      {
        path: '/cart',
        component: Cart,
      },
    ],
  })
}
