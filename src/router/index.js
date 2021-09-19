import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import Admin from "../views/admin/Index.vue";
import Test from "@/views/admin/Test.vue";
import Welcome from "../views/admin/Welcome.vue";
import History from "../views/admin/History.vue";
import Users from "@/views/users/Index.vue";
import UsersCreate from "@/views/users/Create.vue";
import Roles from "@/views/roles/Index.vue";
import RolesCreate from "@/views/roles/Create.vue";
import Auths from "@/views/auths/Index.vue";
import AuthsCreate from "@/views/auths/Create.vue";
import Login from "@/views/login/Index.vue";

Vue.use(VueRouter);

// ##重写底层代码 自己捕捉错误
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: "/",
    component: Admin,
    children: [
      { path: "welcome", alias: "/", component: Welcome },
      { path: "test", component: Test },
      { path: "history", component: History },
      { path: "users", component: Users },
      { path: "users/create", component: UsersCreate },
      { path: "roles", component: Roles },
      { path: "roles/create", component: RolesCreate },
      { path: "auths", component: Auths },
      { path: "auths/create", component: AuthsCreate },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
