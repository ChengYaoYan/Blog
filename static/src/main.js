import Vue from 'vue';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import axios from 'axios';
import Cookie from 'js-cookie';
import instance from './jsonPlaceHolder.instance';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/basic.scss';
import '../static/fontawesome-free-5.12.0-web/css/all.min.css';

Vue.use(mavonEditor);
Vue.config.productionTip = false;

/* axios */
Vue.prototype.$axiosInstance = instance;
Vue.prototype.$axios = axios;

/* 路由拦截 */
router.beforeEach((to, from, next) => {
  const token = Cookie.get('token');
  if (token) {
    store.dispatch('fetchToken', token);
  }

  if (store.state.token) {
    store.dispatch('fetchIsSignIn', 1);
    next();
  } else if (to.meta.requireAuth) {
    next({ path: '/login' });
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
