<template>
  <div class="container">
    <form class="d-flex flex-column justify-content-center align-items-center" v-on:submit.prevent="loginSubmit">
      <div class="text-center form-elements-container-style">
        <img src="assets/img/BoCo.png" class="logo-style">
        <h1 class="text-center">Log in</h1>
        <div class="d-flex flex-column flex-shrink-1 align-items-center form-inputs-container-style">
          <div class="text-center form-username-container-style">
            <label class="form-label form-username-label-style">E-mail</label>
            <input class="form-control" type="text" v-model="email">
          </div>
          <div class="text-center form-password-container-style">
            <label class="form-label form-password-label-style">Password</label>
            <input class="form-control" type="password" v-model="password">
          </div>
          <div>
            <a href="#" class="form-forgot-password-style">Forgot password?</a>
          </div>
        </div>
        <div class="form-buttons-container-style">
          <div class="d-flex flex-column flex-shrink-1 justify-content-center align-items-center form-signin-btn-container-style">
            <button class="btn btn-primary w-100 form-signin-btn-style" type="submit">Sign in</button>
          </div>
          <div>
            <button class="btn btn-primary w-100 form-continue-with-facebook-btn" type="button">
              <i class="fab fa-facebook facebook-icon-style"></i>
              Continue with Facebook
            </button>
            <button class="btn btn-primary w-100 form-continue-with-google-btn" type="button">
              <i class="fab fa-google google-icon-style"></i>
              Continue with Google
            </button>
          </div>
          <div class="d-flex flex-column flex-shrink-1 justify-content-center align-items-center form-register-btn-container-style">
            <router-link to="/register" class="btn btn-primary w-100 form-register-btn-style">Register</router-link>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Login",
  data(){
    return{
      email:'',
      password:'',
    }
  },
  methods:{
    loginSubmit(){
      const options = {
        method: 'POST',
        url: 'http://localhost:8080/auth/login',
        headers: {
        'Content-Type': 'application/json'
      },
      data: {email: this.email, password: this.password}
      };
      axios.request(options).then(function (response) {
        localStorage.setItem('token',response.data);
        console.log(localStorage.getItem('token'))
      }).catch(function (error) {
        console.error(error);
      });
    }
  }
};
</script>

<style scoped>

.form-inputs-container-style,
.form-username-container-style,
.form-password-container-style,
.form-signin-btn-container-style,
.form-register-btn-container-style {
  padding-top: 20px;
}


.form-elements-container-style {
  width: max-content;
  background: #d6dde7;
  box-shadow: 0px 0px 10px 2px;
  padding: 5vw;
}

.logo-style {
  max-width: 15vw;
  margin-bottom: 20px;
}

.form-username-label-style {
  font-size: 20px;
}

.form-password-container-style {
  padding-bottom: 20px;
}

.form-password-label-style {
  font-size: 20px;
}

.form-buttons-container-style {
  max-width: 80vw;
}

.form-forgot-password-style {
  font-style: italic;
}

.form-signin-btn-container-style {
  padding-bottom: 20px;
}

.form-signin-btn-style {
  margin-bottom: 10px;
  font-size: 25px;
}

.form-continue-with-facebook-btn {
  font-size: 20px;
  background: rgb(66,103,178);
}

.facebook-icon-style {
  font-size: 20px;
  margin: 10px;
}

.form-continue-with-google-btn {
  font-size: 20px;
  background: rgb(74,97,221);
  margin-top: 10px;
  border-color: rgba(255,255,255,0);
  color: rgb(255,255,255);
}

.google-icon-style {
  font-size: 20px;
  margin: 10px;
}

.form-register-btn-container-style {
  padding-bottom: 20px;
}

.form-register-btn-style {
  background: rgba(13,110,253,0);
  border-color: rgba(255,255,255,0);
  color: var(--bs-blue);
  font-size: 25px;
}
</style>