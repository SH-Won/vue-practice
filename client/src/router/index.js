import Vue from "vue";
import VueRouter from "vue-router";
import Auth from "../hoc/Auth";
import LandingView from "../views/LandingView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Auth(LandingView, false),
  },
  {
    path: "/todos",
    name: "todos",
    component: () => import("../views/TodosView.vue"),
  },
  {
    path: "/article/:id",
    name: "detailArticle",
    component: () =>
      import("../hoc/Auth").then(async ({ default: Auth }) => {
        const Page = await import("../views/DetailArticleView").then(
          ({ default: Page }) => Page
        );
        return Auth(Page, false);
      }),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/edit",
    name: "edit",
    component: () =>
      import("../hoc/Auth").then(async ({ default: Auth }) => {
        const Page = await import("../views/EditView").then(
          ({ default: Page }) => Page
        );
        return Auth(Page, true);
      }),
    props: true,
  },
  {
    path: "/loading",
    name: "loading",
    component: () => import("../components/Loading/Loading"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/TestView"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
