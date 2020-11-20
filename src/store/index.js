import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

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
      name: "river",
      cat: {}
    },
    mutations: {
      setName(state, newName = "") {
        state.name = newName;
      },
      setCat(state, cat) {
        state.cat = cat;
      }
    },
    actions: {
      getCatText({ commit }) {
        return axios
          .get("https://cat-fact.herokuapp.com/facts/random")
          .then(res => {
            console.log("res", res);
            commit("setCat", res?.data?.text || "");
          });
      }
    },
    modules: {}
  });
}
