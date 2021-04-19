import Vue from "vue";
import Vuex from "vuex";
import persistedState from "vuex-persistedstate";
import user from "./modules/user";
import artical from "./modules/artical";
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [persistedState({ storage: window.sessionStorage })],

  modules: {
    user,
    artical,
  },
});
