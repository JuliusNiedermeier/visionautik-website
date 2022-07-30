import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/pages/Home/Home.vue'
import Offers from '@/components/pages/Offers/Offers.vue'
import Activity from '@/components/pages/Activity/Activity.vue'
// import Product from '@/components/pages/Product/Product.vue'
// import Cart from '@/components/pages/Cart/Cart.vue'
import About from '@/components/pages/About/About.vue'
import Playground from '@/components/pages/Playground/Playground.vue'
import TeamMember from '@/components/pages/TeamMember/TeamMember.vue'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior(to, from, savedPosition) {
      if (to.hash) {
        return { selector: to.hash, behavior: 'smooth' }
      } else if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    routes: [
      {
        name: 'playground',
        path: '/playground',
        component: Playground,
      },
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
        path: '/offers/activity/:uid',
        component: Activity,
      },
      // {
      //   name: 'product',
      //   path: '/offers/product/:uid',
      //   component: Product,
      // },
      // {
      //   name: 'cart',
      //   path: '/cart',
      //   component: Cart,
      // },
      {
        name: 'about',
        path: '/about',
        component: About,
      },
      {
        name: 'team-member',
        path: '/about/:uid',
        component: TeamMember,
      },
    ],
  })
}
