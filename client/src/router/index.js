import Vue from "vue";
import VueRouter from "vue-router";
import Auth from "../hoc/Auth";
import LandingView from "../views/LandingView";
import LandingTabView from "../views/LandingTabView";
import TestAuth from "../hoc/TestAuth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Landing",
    component: TestAuth(LandingTabView, false),
    children: [
      {
        path: "",
        name: "landing popular",
        component: LandingView,
      },
      {
        path: "recent",
        name: "landing recent",
        component: LandingView,
      },
    ],
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
      import("../hoc/TestAuth").then(async ({ default: Auth }) => {
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
    path: "/user/:userId",
    name: "userpage",
    component: () =>
      import("../hoc/TestAuth").then(async ({ default: Auth }) => {
        const Page = await import("../views/UserView").then(
          ({ default: Page }) => Page
        );
        return Auth(Page, true);
      }),
  },
  {
    path: "/edit",
    name: "edit",
    component: () =>
      import("../hoc/TestAuth").then(async ({ default: Auth }) => {
        const Page = await import("../views/EditView").then(
          ({ default: Page }) => Page
        );
        return Auth(Page, true);
      }),
  },
  {
    path: "/loading",
    name: "loading",
    component: () => import("../components/Loading/Loading"),
  },
  {
    path: "/test",
    name: "test",
    component: () =>
      import("../hoc/TestAuth").then(async ({ default: Auth }) => {
        const Page = await import("../views/TestView").then(
          ({ default: Page }) => Page
        );
        return Auth(Page, true);
      }),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
