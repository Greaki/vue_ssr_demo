/**
 * 客户端的入口文件，一般就是一个激活vue实例的作用
 */
import { createVue } from "./main";

// 创建vue,router实例
const { app, router, store } = createVue();

// 如果有state挂载在window上面，就反序列化一下
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
  app.$mount("#app");
});
