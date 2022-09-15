import Vue from 'vue'
import VueRouter from 'vue-router'

import LandingView from '../views/LandingView';
import LoginView from '../views/LoginView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingView
  },
  {
    path: '/todos',
    name : 'todos',
    component : () => import('../views/TodosView.vue'),
  },
  {
    path:'/article/:id',
    name:'detailArticle',
    component : () => import('../views/DetailArticleView.vue')
  },
  {
    path:'/login',
    name:'login',
    component : () => import('../views/LoginView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
