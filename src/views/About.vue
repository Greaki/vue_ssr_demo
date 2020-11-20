<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>my name is {{ $store.state.name }}</h2>
    <input
      type="text"
      v-model="name"
      @change="$store.commit('setName', name)"
    />
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {
      name: ""
    };
  },
  created() {
    debugger;
    console.log("created this", this);
  },
  mounted() {
    console.log("this is mounted");
  }
};
</script>
