import { postLoginApi } from "@/api/login";

export default {
  namespaced: true,
  state: {
    uname: "",
    roleName: "",
    token: "",
  },
  getters: {},
  mutations: {
    SET_USERINFO(state, payload) {
      state.uname = payload.uname;
      state.roleName = payload.roleName;
      state.token = payload.token;

      localStorage.setItem("roleName", payload.roleName);
      localStorage.setItem("token", payload.token);
      localStorage.setItem("uname", payload.uname);
    },
  },
  actions: {
    async FETCH_MB_LOGIN(context, payload) {
      let res = await postLoginApi(payload);
      if (res.meta.state == 200) {
        context.commit("SET_USERINFO", res.data);
      }
      return res;
    },
  },
};
