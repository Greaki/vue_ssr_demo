<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" v-if="0" />
    <h2>{{ $store.state.cat }}</h2>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { getCat } from "@/api/cat";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  mounted() {
    console.log("111");
    getCat();
    this.$store.dispatch("getCatText");
  }
};
</script>
