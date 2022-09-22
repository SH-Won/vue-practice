import Vue from 'vue'
import App from './App.vue'
import router from './router'
import LazyImageLoad from '@/utils/LazyImageLoad';

Vue.config.productionTip = false
Vue.directive('lazyload',LazyImageLoad);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
