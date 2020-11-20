<template>
  <div class="about">
    <h1>This is an about page _ new</h1>
    <h2>my name is {{ $store.state.name }}</h2>
    <input
      type="text"
      v-model="name"
      @change="$store.commit('setName', name)"
    />
    <h1>cat: {{ cat }}</h1>
    <h2>store.cat: {{ $store.state.cat }}</h2>
  </div>
</template>

<script>
// import { getCat } from "@/api/cat";

export default {
  name: "about",
  data() {
    return {
      name: "",
      cat: ""
    };
  },
  created() {
    // console.log("created this", this);
  },
  beforeCreate() {},
  mounted() {
    // console.log("this is mounted");
    // getCat().then(res => {
    //   this.cat = res;
    // });
  }
};
</script>
