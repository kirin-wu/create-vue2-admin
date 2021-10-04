import { postLoginApi } from "@/api/login";
import { postSmsSendApi } from "../api/login";
import { postSmsLoginApi, postTokenLoginApi } from "@/api/login.js";

export default {
  namespaced: true,
  // ## 数据持久化
  state: {
    uname: localStorage.getItem("uname") || "",
    roleName: localStorage.getItem("roleName") || "",
    token: localStorage.getItem("token") || "",
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
    DELETE_USERINFO(state) {
      state.uname = "";
      state.roleName = "";
      state.token = "";
      localStorage.clear();
    },
  },
  actions: {
    // ## 发送短信
    async FETCH_SMS_SEND(context, payload) {
      let res = await postSmsSendApi(payload);
      if (res.meta.state == 200) {
        context.commit("SET_USERINFO", res.data);
      }
      return res;
    },
    // ## 短信登录
    async FETCH_SMS_LOGIN(context, payload) {
      let res = await postSmsLoginApi(payload);
      if (res.meta.state == 200) {
        context.commit("SET_USERINFO", res.data);
      }
      return res;
    },

    // ## 密保登录
    async FETCH_MB_LOGIN(context, payload) {
      let res = await postLoginApi(payload);
      if (res.meta.state == 200) {
        context.commit("SET_USERINFO", res.data);
      }
      return res;
    },

    // ## 令牌登录
    async FETCH_TOKEN_LOGIN(context, payload) {
      let res = await postTokenLoginApi(payload);
      if (res.meta.state == 200) {
        context.commit("SET_USERINFO", res.data);
      }
      return res;
    },
  },
};
