import router from "@/router";
// import store from "@/store";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
// ## 白名单
const whiteList = ["/login", "/login/sms", "/login/token", "/404"];
// ## 导航守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (whiteList.indexOf(to.path) != -1) {
    next();
  } else {
    // let token = store.state.login.token;
    // if (token) {
    //   if (store.state.auths.menus.length <= 0) {
    //     // console.log("重新获取");
    //     store.dispatch("auths/FETCH_MENUS");
    //   }
    //   next();
    // } else {
    //   next({ path: "/login" });
    // }
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});
