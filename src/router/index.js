import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

import Admin from "../views/admin/Index.vue";
// import Test from "@/views/admin/Test.vue";
import Welcome from "../views/Welcome.vue";
// import History from "../views/admin/History.vue";

import Login from "@/views/login/Index.vue";
import LoginMobile from "@/views/login/Mobile.vue";
import LoginToken from "@/views/login/Token";

// import Users from "@/views/users/Index.vue";
// import UsersCreate from "@/views/users/Create.vue";

// import Roles from "@/views/roles/Index.vue";
// import RolesCreate from "@/views/roles/Create.vue";

// import Auths from "@/views/auths/Index.vue";
// import AuthsCreate from "@/views/auths/Create.vue";

// import Cates from "@/views/cates/Index.vue";
// import CatesCreate from "@/views/cates/Create.vue";

// import Goods from "@/views/goods/Index.vue";
// import GoodsCreate from "@/views/goods/Create.vue";

// import Stores from "@/views/stores/Index.vue";
// import StoresCreate from "@/views/stores/Create.vue";

// import Orders from "@/views/orders/Index.vue";
// import OrdersTotal from "@/views/orders/Total.vue";

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
      //   { path: "test", component: Test },

      {
        path: "welcome",
        alias: "/",
        component: Welcome,
        meta: { name1: "后台首页", name2: "后台首页" },
      },
      //   {
      //     path: "users/history",
      //     component: History,
      //     meta: { name1: "后台首页", name2: "访客记录" },
      //   },
      //   {
      //     path: "users",
      //     component: Users,
      //     meta: { name1: "用户管理", name2: "用户列表" },
      //   },
      //   {
      //     path: "users/create",
      //     component: UsersCreate,
      //     meta: { name1: "用户管理", name2: "用户创建" },
      //   },
      //   {
      //     path: "roles",
      //     component: Roles,
      //     meta: { name1: "角色管理", name2: "角色列表" },
      //   },
      //   {
      //     path: "roles/create",
      //     component: RolesCreate,
      //     meta: { name1: "角色管理", name2: "角色创建" },
      //   },
      //   {
      //     path: "auths",
      //     component: Auths,
      //     meta: { name1: "权限管理", name2: "权限列表" },
      //   },
      //   {
      //     path: "auths/create",
      //     component: AuthsCreate,
      //     meta: { name1: "权限管理", name2: "权限创建" },
      //   },
      //   {
      //     path: "cates",
      //     component: Cates,
      //     meta: { name1: "分类管理", name2: "分类列表" },
      //   },
      //   {
      //     path: "cates/create",
      //     component: CatesCreate,
      //     meta: { name1: "分类管理", name2: "分类创建" },
      //   },
      //   {
      //     path: "goods",
      //     component: Goods,
      //     meta: { name1: "门店商品", name2: "商品列表" },
      //   },
      //   {
      //     path: "goods/create",
      //     component: GoodsCreate,
      //     meta: { name1: "门店商品", name2: "商品创建" },
      //   },
      //   {
      //     path: "stores",
      //     component: Stores,
      //     meta: { name1: "门店管理", name2: "门店列表" },
      //   },
      //   {
      //     path: "stores/create",
      //     component: StoresCreate,
      //     meta: { name1: "门店管理", name2: "门店创建" },
      //   },
      //   {
      //     path: "orders",
      //     component: Orders,
      //     meta: { name1: "订单管理", name2: "订单列表" },
      //   },
      //   {
      //     path: "orders/total",
      //     component: OrdersTotal,
      //     meta: { name1: "订单管理", name2: "订单列表" },
      //   },
    ],
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
  // {
  //   path: "/home",
  //   name: "Home",
  //   component: Home,
  // },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
