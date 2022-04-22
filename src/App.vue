<template>
  <HeaderComponent />
  <router-view />
  <div class="d-flex justify-content-center" v-if="GStore.flashMessage !== ''">
    <div id="flashMessage" class="alert alert-primary mt-5">
      {{ GStore.flashMessage }}
    </div>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent";

const $ = require("jquery");
window.$ = $;
window.jQuery = $;
require("bootstrap/dist/js/bootstrap.min");

export default {
  inject: ["GStore"],
  name: "App",
  components: {
    HeaderComponent
  }
}
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.css";
@import "assets/fonts/fontawesome-all.min.css";
@import "assets/fonts/material-icons.min.css";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  font-family: system-ui;
}
</style>
