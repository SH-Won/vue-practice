import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../hoc/Auth'
import LandingView from '../views/LandingView';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingView,
  },
  {
    path: '/todos',
    name : 'todos',
    component : () => import('../views/TodosView.vue'),
  },
  {
    path:'/article/:id',
    name:'detailArticle',
    component : () => import('../hoc/Auth').then( async ({default : Auth}) => {
        const Page = await import('../views/DetailArticleView').then(({default : Page}) => Page);
        return Auth(Page,false);
    })
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
