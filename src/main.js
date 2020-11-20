import Vue from "vue";
import App from "./App.vue";
import { createRouter } from "./router";
import { createStore } from "./store";

Vue.config.productionTip = false;

/**
 * 需要工厂函数，每次产生新的数据
 */
export function createVue(context) {
  const router = createRouter();
  const store = createStore();
  const app = new Vue({
    store,
    router,
    context,
    render: h => h(App) // 不挂载，因为main不是最终执行，它只起到一个新建app实例的作用
  });
  return { app, router, store }; // 返回app 和 router， 给客户端和服务端入口文件使用
}

// ssr的时候不要继续new了，因为会导致首屏组件执行了两次，有点污染
// new Vue({
//   store: createStore(),
//   router: createRouter(),
//   render: h => h(App)
// }).$mount("#app");
