<template>

    <button class="google btn d-flex justify-content-center align-items-center " id="google-signin-button" data-background="red" data-color="white" data-width="100%">
      <i class="fab fa-google"></i> Login with Google
    </button>

</template>

<script>
import { googleLogin } from "@/services/loginService";

export default {
  name: "GoogleLoginComponent",
  data() {
    return {
      auth2: null,
      googleUser: {}
    }
  },
  methods: {
    onSignIn(googleUser) {
      let profile = googleUser.getBasicProfile();
      console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log("Name: " + profile.getName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
      console.log(googleUser.getAuthResponse().id_token);
      console.log(googleUser.getAuthResponse().id_token);
      googleLogin(googleUser.getAuthResponse().id_token)
        .then(response => {
          localStorage.setItem("token", response.data.token)
          this.$router.push("/")
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        });
    },
    onFailure(error) {
      console.log(error)
    }
  },
  mounted() {
    let gapi = window.gapi;
    
    // eslint-disable-next-line no-undef
    gapi.signin2.render("google-signin-button", {
      onsuccess: this.onSignIn,
      onfailure: this.onFailure
    })
  },
};
</script>

<style scoped>

</style>
