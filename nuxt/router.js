import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/pages/Home/Home.vue'
import Offers from '@/components/pages/Offers/Offers.vue'
import Activity from '@/components/pages/Activity/Activity.vue'
import Product from '@/components/pages/Product/Product.vue'
import Cart from '@/components/pages/Cart/Cart.vue'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
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
