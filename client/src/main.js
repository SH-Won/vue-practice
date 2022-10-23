import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from '@/store'
import LazyImageLoad from "@/utils/LazyImageLoad";

Vue.config.productionTip = false;
Vue.directive("lazyload", LazyImageLoad);

// main 시작점
// git pull request test
// git pull request test 2
// git pull request test 3
// git pull request test 4

const hotfix = {
  name : 'hotfix/#5_AddToken221023_master',
  time : '06:28'
}
const hofix1 = {
  name : 'hotfix/#5_AddToken221023_master_v1',
  time : '06:29',
}
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
