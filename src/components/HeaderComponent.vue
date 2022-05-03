<template>
  <div>
  <div class="navbar-bg">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light justify-content-between">

        <router-link to="/" class="navbar-brand">
          <img src="../assets/img/BoCo.png" width="30" height="30" class="d-inline-block align-top">
          BorrowCommunity
        </router-link>

        <button class="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation" @click="expandNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end" id="navbarToggler">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item" v-if="this.$store.getters.loggedIn" @click="closeNavbar">
              <router-link to="/new_ad" class="nav-link">
                <i class="fa fa-plus-square"></i>
                Ny annonse
              </router-link>
            </li>
            <li class="nav-item" v-if="this.$store.getters.loggedIn" @click="closeNavbar">
              <router-link to="/messages" class="nav-link">
                <i class="fa fa-comments"></i>
                Meldinger
              </router-link>
            </li>
            <li class="nav-item" v-if="this.$store.getters.loggedIn" @click="closeNavbar">
              <router-link to="/my_profile" class="nav-link">
                <i class="fa fa-user"></i>
                Min profil
              </router-link>
            </li>
            <li class="nav-item" v-if="!this.$store.getters.loggedIn" @click="closeNavbar">
              <router-link to="/login" class="nav-link">
                <i class="fa fa-arrow-right"></i>
                Log in
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
    <div class="d-flex justify-content-center" v-if="GStore.flashMessage !== ''">
      <div id="flashMessageSuccess" class="alert alert-primary mt-5" v-if="GStore.variant === 'Success'">
        {{ GStore.flashMessage }}
      </div>
      <div id="flashMessageError" class="alert alert-primary mt-5" v-if="GStore.variant === 'Error'">
        {{ GStore.flashMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

  export default {
    inject: ["GStore"],
    name:"HeaderComponent",
    watch: {
      $route: "checkLoggedIn"
    },
    methods: {
      expandNavbar() {
        $("#navbarToggler").toggle("collapse");
      },
      closeNavbar() {
        $("#navbarToggler").css("display", "none");
      },
      checkLoggedIn() {
        if(localStorage.getItem('token') || this.$store.getters.loggedIn) {
          this.$store.dispatch("setLoggedIn", true);
        } else {
          this.$store.dispatch("setLoggedIn", false);
        }
      }
    }
  }
</script>
<style scoped>
.navbar-bg {
  background-color: rgba(1, 89, 145, 0.6);
}

#navbarToggler {
  text-align: right;
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