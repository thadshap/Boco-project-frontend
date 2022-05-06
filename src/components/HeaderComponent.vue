<template>
  <div class="navbar-bg">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light justify-content-between">

        <router-link  to="/" class="navbar-brand">
          <img @click="refresh" src="../assets/img/BoCo.png" width="30" height="30" class="d-inline-block align-top">
          <text @click="refresh">BorrowCommunity</text>
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
              <router-link to="/groups" class="nav-link">
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
</template>

<script>
import $ from "jquery";

  export default {
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
      },
      refresh(){
        this.$router.push("/")
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
</style>
