<template>
<div class="d-flex justify-content-space-between flex-column height">
  <HeaderComponent />
  <main class="pt-5 pb-5">
    <router-view />
  </main>
  <FooterComponent />
</div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";

const $ = require("jquery");
window.$ = $;
window.jQuery = $;
require("bootstrap/dist/js/bootstrap.min");

export default {
  name: "App",
  components: {
    HeaderComponent,
    FooterComponent
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
  height: 100vh;
}

* {
  font-family: system-ui;
}
.height{
  height: 100%;
}
main{
  flex-grow: 1;
}
</style>
