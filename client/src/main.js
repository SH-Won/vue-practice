import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from '@/store'
import LazyImageLoad from "@/utils/LazyImageLoad";

Vue.config.productionTip = false;
Vue.directive("lazyload", LazyImageLoad);

// main 시작점
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
