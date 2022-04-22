<template>
  <div class="container">
    <form class="d-flex flex-column justify-content-center align-items-center" v-on:submit.prevent="register">
      <div class="text-center form-fields-container-style">
        <img src="../assets/img/BoCo.png" class="logo-style">
        <h1 class="text-center">
          Register user!
        </h1>
        <div class="d-flex flex-column flex-shrink-1 align-items-center form-inputs-container-style">
          <div class="text-center d-flex flex-row justify-content-between align-items-center field-container w-100 form-firstname-container-style">
            <label class="form-label field-label">
              Firstname
            </label>
            <input class="form-control w-50" type="text" v-model="firstName">
          </div>
          <div class="text-center d-flex flex-row justify-content-between align-items-center w-100 form-lastname-container-style">
            <label class="form-label field-label">
              Lastname
            </label>
            <input class="form-control w-50" type="text" v-model="lastName">
          </div>
          <div class="text-center d-flex flex-row justify-content-between align-items-center w-100 form-email-container-style">
            <label class="form-label field-label">
              E-mail
            </label>
            <input class="form-control w-50" type="text" v-model="email">
          </div>
          <div class="text-center d-flex flex-row justify-content-between align-items-center w-100 form-username-container-style">
            <label class="form-label field-label">
              Username
            </label>
            <input class="form-control w-50" type="text" v-model="username">
          </div>
          <div class="text-center d-flex flex-row justify-content-between align-items-center w-100 form-password-container-style">
            <label class="form-label field-label">
              Password
            </label>
            <input class="form-control w-50" type="text" v-model="password">
          </div>
          <div class="text-center d-flex flex-row justify-content-between align-items-center w-100 form-repeat-password-container-style">
            <label class="form-label field-label">
              Repeat password
            </label>
            <input class="form-control w-50" type="text" v-model="matchingPassword">
          </div>
        </div>
        <div class="form-btn-container-style">
          <button class="btn btn-primary w-100 form-btn-style form-btn-style" type="submit">
            Register
          </button>
          <span>{{response}}</span>
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
      username:'',
      password:'',
      matchingPassword:'',
      response:'',
    }
  },
  methods:{
    register(){
      console.log(this.firstName)
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
        console.error(error);
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
</style>