import Vue from "vue";
import VueRouter from "vue-router";
import Admin from "../views/admin/index.vue";
import Welcome from "../views/Welcome.vue";
import Login from "@/views/login/Index.vue";
import LoginMobile from "@/views/login/Mobile.vue";
import LoginToken from "@/views/login/Token";
import Map from "@/views/map";
import GaoDe from "@/views/gaode";
import Test from "@/views/test";

Vue.use(VueRouter);

// ##重写底层代码 自己捕捉错误
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: "/",
    alias: "/welcome",
    name: "admin", //跳转 添加路由规则
    component: Admin,
    meta: { name1: "后台首页", name2: "后台首页" },
    children: [
      {
        path: "welcome",
        alias: "/",
        component: Welcome,
        meta: { name1: "后台首页", name2: "后台首页" },
      },
    ],
  },
  {
    path: "/map",
    name: "map",
    component: Map,
  },
  {
    path: "/gaode",
    name: "gaode",
    component: GaoDe,
  },
  {
    path: "/test",
    name: "test",
    component: Test,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/login/sms",
    component: LoginMobile,
  },
  {
    path: "/login/token",
    component: LoginToken,
  },
  {
    path: "/404",
    component: () => import("@/components/NotFound.vue"),
  },
  { path: "*", redirect: "/404" },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
