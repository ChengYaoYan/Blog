import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isSignIn: 0,
    token: '',
  },

  mutations: {
    changeIsSignIn(state, flag) {
      state.isSignIn = flag;
    },
    setToken(state, token) {
      state.token = token;
    },
  },

  actions: {
    fetchIsSignIn(context, flag) {
      context.commit('changeIsSignIn', flag);
    },
    fetchToken(context, token) {
      context.commit('setToken', token);
    },
  },
});
