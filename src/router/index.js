import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

// const router = new VueRouter({
//   routes
// });

// export default router;

/**
 * 需要导出工厂函数，因为每一次请求都对应一个新的实例，不能相互污染
 */
export function createRouter() {
  return new VueRouter({
    mode: "history",
    routes
  });
}
