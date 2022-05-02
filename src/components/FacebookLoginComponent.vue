<template>
  
  <button class="fb-login-button fb btn w-100" @click="logInWithFacebook" data-width="" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="true">
    <i class="fab fa-facebook-f"></i> Login with Facebook
  </button>
  
</template>

<script>
import { facebookLogin } from "@/services/loginService";

export default {
  name: "FacebookLoginComponent",
  methods: {
    initFacebook() {
      window.fbAsyncInit = function() {
        window.FB.init({
          appId: "1181763609285094", //You will need to change this
          status: true, // This is important, it's not enabled by default
          xfbml: true,
          version: "v2.7"
        });

      };
    },
    loadFacebookSDK(d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    },
    async logInWithFacebook() {
      window.FB.login(response => {
        if(response.status === "connected") {
          facebookLogin(response.authResponse.accessToken)
            .then(response => {
              localStorage.setItem("token", response.data.token)
              this.$router.push("/")
              console.log(response)
            })
            .catch(error => {
              console.log(error)
            })
        }
      });
      return false;
    },
  },
  async mounted() {
    await this.loadFacebookSDK(document, "script", "facebook-jssdk");
    await this.initFacebook();
  },
};
</script>

<style scoped>
.fb {
  background-color: #3B5998;
  color: white;
}
</style>
