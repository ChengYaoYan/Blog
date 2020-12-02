import Vue from "vue";
import VueRouter from "vue-router";
import CommonLayout from "../components/CommonLayout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: CommonLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/Home.vue"),
      },
      {
        path: "detail:id",
        name: "Detail",
        component: () =>
          import(/* webpackChunkName: "detail" */ "../views/Detail.vue"),
      },
      {
        path: "personal",
        name: "Personal",
        component: () =>
          import(/* webpackChunkName: "personal" */ "../views/Personal.vue"),
        meta: {
          requireAuth: false,
        },
      },
      {
        path: "article",
        name: "Article",
        component: () =>
          import(/* webpackChunkName: "article" */ "../views/Article.vue"),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "article/edit",
        name: "Edit",
        component: () =>
          import(/* webpackChunkName: "edit" */ "../views/Edit.vue"),
        meta: {
          requireAuth: true,
        },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "signIn" */ "../views/Login.vue"),
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  // linkActiveClass: 'router-link-active'
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
