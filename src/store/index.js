import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: {}
// });

export function createStore() {
  return new Vuex.Store({
    state: {
      name: "river"
    },
    mutations: {
      setName(state, newName = "") {
        state.name = newName;
      }
    },
    actions: {},
    modules: {}
  });
}
