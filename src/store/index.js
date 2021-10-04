import Vue from "vue";
import Vuex from "vuex";

import login from "@/store/login";
import auths from "@/store/auths";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    auths,
  },
});
