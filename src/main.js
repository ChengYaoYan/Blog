import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/basic.scss";
import "../static/fontawesome-free-5.12.0-web/css/all.min.css";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import axios from "axios";
import instance from "./jsonPlaceHolder.instance";
import Cookie from "js-cookie";

Vue.use(mavonEditor);
Vue.config.productionTip = false;

/* axios */
Vue.prototype.$axiosInstance = instance;
Vue.prototype.$axios = axios;

/* 路由拦截 */
router.beforeEach((to, from, next) => {
  let token = Cookie.get("token");
  if (token) {
    store.dispatch("fetchToken", token);
  }

  if (store.state.token) {
    store.dispatch("fetchIsSignIn", 1);
    next();
  } else {
    if (to.meta.requireAuth) {
      next({ path: "/login" });
    } else {
      next();
    }
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
