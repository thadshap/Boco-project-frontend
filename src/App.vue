<template>
  <HeaderComponent />
  <main class="pt-5 pb-5">
    <router-view />
    <div class="d-flex justify-content-center" v-if="GStore.flashMessage !== ''">
      <div id="flashMessageSuccess" class="alert alert-primary mt-5" v-if="GStore.variant === 'Success'">
        {{ GStore.flashMessage }}
      </div>
      <div id="flashMessageError" class="alert alert-primary mt-5" v-if="GStore.variant === 'Error'">
        {{ GStore.flashMessage }}
      </div>
    </div>
  </main>
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
#flashMessageSuccess{
  background-color: rgba(3, 153, 27, 0.50);
  color: #015601;
}
#flashMessageError{
  background-color: rgba(139, 0, 0, 0.50);
  color: #5e0000;
}
</style>
