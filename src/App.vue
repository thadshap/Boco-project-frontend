<template>
<div class="d-flex justify-content-space-between flex-column height">
  <HeaderComponent />
  <div class="d-flex justify-content-center" v-if="GStore.flashMessage !== ''">
    <div id="flashMessageSuccess" class="alert alert-primary mt-5" v-if="GStore.variant === 'Success'">
      {{ GStore.flashMessage }}
    </div>
    <div id="flashMessageError" class="alert alert-primary mt-5" v-if="GStore.variant === 'Error'">
      {{ GStore.flashMessage }}
    </div>
  </div>
  <main class="pt-5 pb-5">
    <router-view />
  </main>
  <FooterComponent />
</div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";
import { getUserInfo } from "@/services/loginService";
import userService from "@/services/userService";

const $ = require("jquery");
window.$ = $;
window.jQuery = $;
require("bootstrap/dist/js/bootstrap.min");

export default {
  inject: ["GStore"],
  name: "App",
  components: {
    HeaderComponent,
    FooterComponent
  },
  async mounted() {
    if(this.$store.getters.getProfileEmail !== "") {
      return
    }

    await getUserInfo()
      .then(response => {
        let profile = {
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          verified: response.data.verified,
          rating: response.data.rating,
          nrOfReviews: response.data.nrOfReviews
        }

        this.$store.dispatch("setProfile", profile)
      })
      .catch(error => {
        console.log(error)
      })

    await userService
      .getProfilePicture(localStorage.getItem("userId"))
      .then(response => {
        this.$store.dispatch(
          "setProfilePicture",
          `data:${response.data.type};base64,${response.data.base64}`
        );
      })
      .catch(error => {
        console.log(error)
      })
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
#flashMessageSuccess{
  background-color: rgba(3, 153, 27, 0.50);
  color: #015601;
}
#flashMessageError{
  background-color: rgba(139, 0, 0, 0.50);
  color: #5e0000;
}
</style>
