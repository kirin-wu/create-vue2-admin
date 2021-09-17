import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import Admin from "../views/admin/Index.vue";
import Welcome from "../views/admin/Welcome.vue";
import Users from "@/views/users/Index.vue";
import UsersCreate from "@/views/users/Create.vue";
import Roles from "@/views/roles/Index.vue";
import RolesCreate from "@/views/roles/Create.vue";
import Auth from "@/views/auth/Index.vue";
import Login from "@/views/login/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Admin,
    children: [
      { path: "welcome", alias: "/", component: Welcome },
      { path: "users", component: Users },
      { path: "users/create", component: UsersCreate },
      { path: "roles", component: Roles },
      { path: "roles/create", component: RolesCreate },
      { path: "auth", component: Auth },
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
