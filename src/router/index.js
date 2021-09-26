import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("@/views/Users.vue"),
  },
  {
    path: "/carServices",
    name: "carServices",
    component: () => import("@/views/CarServices.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
