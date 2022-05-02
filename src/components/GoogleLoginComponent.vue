<template>
  <!--  <div class="g-signin2" :data-onsuccess="onSignIn"></div>-->
    <button class="google btn d-flex justify-content-center align-items-center " id="google-signin-button" data-background="red" data-color="white" data-width="100%">
      <i class="fab fa-google"></i> Login with Google
    </button>

  <!--  <div id="google-signin-button" class="d-flex flex-row justify-content-center w-100"></div>-->

<!--  <div id="gSignInWrapper">-->
<!--  <div id="google-signin-button">-->
<!--    <div id="customBtn" class="customGPlusSignIn google btn w-100">-->
<!--      <i class="fab fa-google"></i>-->
<!--      <span class="buttonText mx-1">Login with Google</span>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div id="name"></div>-->
</template>

<script>
import {googleLogin} from "@/services/loginService";

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
      googleLogin(googleUser.getAuthResponse().id_token);
    },
    // attachSignin(element) {
    //   console.log(element.id);
    //   window.gapi.auth2.attachClickHandler(element, {},
    //     function(googleUser) {
    //       document.getElementById('name').innerText = "Signed in: " +
    //         googleUser.getBasicProfile().getName();
    //     }, function(error) {
    //       alert(JSON.stringify(error, undefined, 2));
    //     });
    // },
  },
  mounted() {
    let gapi = window.gapi;
    // eslint-disable-next-line no-undef
    gapi.signin2.render("google-signin-button", {
      onsuccess: this.onSignIn
    })

    // gapi.load("auth2", function () {
    //   // Retrieve the singleton for the GoogleAuth library and set up the client.
    //   gapi.auth2.init({
    //     client_id: "736018580187-kmhgjhg8i7ttrsh2k2b8gjk6v8jd1nsi.apps.googleusercontent.com",
    //     cookiepolicy: "single_host_origin",
    //     scope: "profile"
    //     // onsuccess: this.onSignIn
    //     // Request scopes in addition to 'profile' and 'email'
    //     //scope: 'additional_scope'
    //   });
    //   this.attachSignin(document.getElementById("customBtn"));
    // });
  },
};
</script>

<style scoped>
/*.google {*/
/*  background-color: #dd4b39;*/
/*  color: white;*/
/*}*/

/*i {*/
/*  color: white;*/
/*}*/

/*#customBtn {*/
/*  display: inline-block;*/
/*  color: #444;*/
/*  width: 190px;*/
/*  border-radius: 5px;*/
/*  background-color: lightcoral;*/
/*  !*border: thin solid #888;*!*/
/*  !*box-shadow: 1px 1px 1px grey;*!*/
/*  white-space: nowrap;*/
/*}*/
/*#customBtn:hover {*/
/*  cursor: pointer;*/
/*}*/
/*span.label {*/
/*  font-family: serif;*/
/*  font-weight: normal;*/
/*}*/
/*span.icon {*/
/*  background: url("/identity/sign-in/g-normal.png") transparent 5px 50%*/
/*    no-repeat;*/
/*  display: inline-block;*/
/*  vertical-align: middle;*/
/*  width: 42px;*/
/*  height: 42px;*/
/*}*/
/*span.buttonText {*/
/*  display: inline-block;*/
/*  vertical-align: middle;*/
/*  padding-left: 42px;*/
/*  padding-right: 42px;*/
/*  font-size: 14px;*/
/*  font-weight: bold;*/
/*  !* Use the Roboto font that is loaded in the <head> *!*/
/*  font-family: "Roboto", sans-serif;*/
/*}*/
</style>
