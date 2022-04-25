<template>
  <div class="container">
    <div class="d-flex justify-content-start align-items-center">
      <div class="align-items-center back-arrow-container" @click="back">
        <i class="fa fa-arrow-left"></i>
        <span class="mx-2">Tilbake</span>
      </div>
    </div>
    <form class="d-flex flex-column justify-content-center align-items-center" v-on:submit.prevent="register">
      <div class="text-center form-fields-container-style">
        <img src="../assets/img/BoCo.png" class="logo-style">
        <h1 class="text-center">
          Register user!
        </h1>
        <div class="d-flex flex-column flex-shrink-1 align-items-center form-inputs-container-style">
          <div class="text-center d-flex flex-row justify-content-between align-items-center field-container w-100 form-firstname-container-style">
            <label class="form-label field-label">
              First Name:
            </label>
            <input class="form-control w-50" type="text" v-model="firstName">
          </div>
          <div class="text-center d-flex flex-row justify-content-between align-items-center w-100 form-lastname-container-style">
            <label class="form-label field-label">
              Last Name:
            </label>
            <input class="form-control w-50" type="text" v-model="lastName">
          </div>
          <div class="text-center d-flex flex-row justify-content-between align-items-center w-100 form-email-container-style">
            <label class="form-label field-label">
              E-mail:
            </label>
            <input class="form-control w-50" type="text" v-model="email">
          </div>
          <div class="text-center d-flex flex-row justify-content-between align-items-center w-100 form-password-container-style">
            <label class="form-label field-label">
              Password:
            </label>
            <input class="form-control w-50" type="text" v-model="password">
          </div>
          <div class="text-center d-flex flex-row justify-content-between align-items-center w-100 form-repeat-password-container-style">
            <label class="form-label field-label">
              Repeat password:
            </label>
            <input class="form-control w-50" type="text" v-model="matchingPassword">
          </div>
        </div>
        <span>{{response}}{{error}}</span>
        <div class="form-btn-container-style">
          <button class="btn btn-primary w-100 form-btn-style form-btn-style" type="submit">
            Register
          </button>
          <router-link to="/login" class="btn btn-primary w-100 form-login-btn-style">
            Login
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",

  data(){
    return{
      firstName:'',
      lastName:'',
      email:'',
      password:'',
      matchingPassword:'',
      response:'',
      error:'',
    }
  },
  methods:{
    back() {
      this.$router.go(-1)
    },
    register(){
      const options = {
        method: 'POST',
        url: 'http://localhost:8080/auth/register',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer'
        },
        data: {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          matchingPassword: this.matchingPassword,
        }
      }
      axios.request(options).then(response =>
        this.response = response.data
      ).catch(function (error) {
        console.log(error);
      });
    }
  }
}



</script>

<style scoped>
.logo-style {
  max-width: 15vw;
  margin-bottom: 20px;
}

.form-fields-container-style {
  background: #d6dde7;
  box-shadow: 0px 0px 10px 2px;
  padding: 20px;
}

.form-inputs-container-style {
  padding-top: 20px;
}



.form-firstname-container-style,
.form-lastname-container-style,
.form-email-container-style,
.form-username-container-style,
.form-password-container-style,
.form-repeat-password-container-style {
  margin-bottom: 10px;
}

.form-btn-container-style {
  max-width: 80vw;
}

.form-btn-style {
  margin-bottom: 10px;
  font-size: 25px;
  margin-top: 20px;
}

.back-arrow-container:hover {
  cursor: pointer;
}
.form-login-btn-style{
  background: rgba(13,110,253,0);
  border-color: rgba(255,255,255,0);
  color: blue;
  font-size: 25px;
}
</style>