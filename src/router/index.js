import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/film',
    name: 'Film',
    component: () => import(/* webpackChunkName: "about" */ '../components/Film.vue')
  },
  {
    path: '/',
    name: 'Horizontal',
    component: () => import(/* webpackChunkName: "about" */ '../components/Horizontal.vue')
  },
  {
    path: '/detail/:imdbId',
    name: 'Detail',
    component: () => import(/* webpackChunkName: "about" */ '../components/Detail.vue')
  },

  {
    path: '/coba',
    name: 'Coba',
    component: () => import(/* webpackChunkName: "about" */ '../components/Coba.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
