import { getMenuApi } from "@/api/auths.js";
import router from "@/router";
export default {
  namespaced: true,
  // ## 数据持久化
  state: {
    menus: [],
  },
  getters: {},
  mutations: {
    SET_MENU(state, payload) {
      state.menus = payload;
      // ## 添加动态路由
      payload.forEach((oneMenu) => {
        if (oneMenu.children && oneMenu.children.length > 0) {
          oneMenu.children.forEach((twoMenu) => {
            router.addRoute("admin", {
              path: twoMenu.url,
              component: () => import("@/views/" + twoMenu.component),
              meta: {
                name1: twoMenu.auth_pname,
                name2: twoMenu.auth_name,
                keep_alive: twoMenu.keep_alive,
              },
            });
          });
        }
      });
    },
    DELETE_USERINFO(state) {
      state.menus = [];
      localStorage.clear();
    },
  },
  actions: {
    async FETCH_MENUS(context) {
      let res = await getMenuApi();
      context.commit("SET_MENU", res.data);
    },
  },
};
