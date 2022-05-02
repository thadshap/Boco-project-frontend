<template>
<!--  <button class="button" @click="logInWithFacebook"> Login with Facebook</button>-->
  <button class="fb-login-button fb btn w-100" @click="logInWithFacebook" data-width="" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="true">
    <i class="fab fa-facebook-f"></i> Login with Facebook
  </button>
<!--  <div @click="logInWithFacebook" class="fb-login-button w-100" data-width="" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="true"></div>-->
</template>

<script>
import {facebookLogin} from "@/services/loginService"

export default {
  name: "FacebookLoginComponent",
  methods: {
    async logInWithFacebook() {
      window.FB.login(response => {
        if(response.status === "connected") {
          facebookLogin(response.authResponse.accessToken)
          console.log(response)
          console.log(response)
        }
        if (response.authResponse) {
          alert("You are logged in &amp; cookie set!");
          // Now you can redirect the user or do an AJAX request to
          // a PHP script that grabs the signed request from the cookie.
        } else {
          alert("User cancelled login or did not fully authorize.");
        }
        console.log(window.FB.getLoginStatus(response => {
          console.log(response)
        }))
      });
      return false;
    },
  }
};
</script>

<style scoped>
.fb {
  background-color: #3B5998;
  color: white;
}
</style>
