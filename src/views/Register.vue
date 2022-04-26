<template>
  <div class="container">
    <div class="d-flex justify-content-start align-items-center">
      <div class="align-items-center back-arrow-container" @click="back">
        <i class="fa fa-arrow-left"></i>
        <span class="mx-2">Tilbake</span>
      </div>
    </div>
    <div class="d-flex flex-column justify-content-center align-items-center">
      <div class="text-center form-fields-container-style">
        <img src="@/assets/img/BoCo.png" class="logo-style" alt="BorrowCommunity-logo">
        <h1 class="text-center">
          Registrer bruker!
        </h1>
        <div class="d-flex flex-column flex-shrink-1 align-items-center form-inputs-container-style">
          <div class="text-center d-flex flex-row justify-content-between align-items-center field-container w-100 form-firstname-container-style">
            <label class="form-label field-label">
              Fornavn:
            </label>
            <input class="form-control w-50" type="text" id="firstname" v-model="state.firstname">
          </div>
          <span id="firstnameError" class="text-danger w-65" v-if="v$.firstname.$error">
              {{ v$.firstname.$errors[0].$message }}
          </span>
          <div class="text-center d-flex flex-row justify-content-between align-items-center w-100 form-lastname-container-style">
            <label class="form-label field-label">
              Etternavn:
            </label>
            <input class="form-control w-50" type="text" id="lastname" v-model="state.lastname">
          </div>
          <span id="lastnameError" class="text-danger w-65" v-if="v$.lastname.$error">
              {{ v$.lastname.$errors[0].$message }}
          </span>
          <div class="text-center d-flex flex-row justify-content-between align-items-center w-100 form-email-container-style">
            <label class="form-label field-label">
              Epost:
            </label>
            <input class="form-control w-50" type="text" id="email" v-model="state.email">
          </div>
          <span id="emailError" class="text-danger w-65" v-if="v$.email.$error">
              {{ v$.email.$errors[0].$message }}
          </span>
          <div class="text-center d-flex flex-row justify-content-between align-items-center w-100 form-password-container-style">
            <label class="form-label field-label">
              Passord:
            </label>
            <input class="form-control w-50" type="password" id="password" v-model="state.password">
          </div>
          <span id="passwordError" class="text-danger w-65" v-if="v$.password.$error">
              {{ v$.password.$errors[0].$message }}
          </span>
          <div class="text-center d-flex flex-row justify-content-between align-items-center w-100 form-repeat-password-container-style">
            <label class="form-label field-label">
              Gjenta passord:
            </label>
            <input class="form-control w-50" type="password" id="repeatPassword" v-model="state.repeatPassword">
          </div>
          <span id="repeatPasswordError" class="text-danger w-65" v-if="v$.repeatPassword.$error">
              {{ v$.repeatPassword.$errors[0].$message }}
          </span>
        </div>
        <span>{{response}}{{error}}</span>
        <div class="form-btn-container-style">
          <button class="btn btn-primary w-100 form-btn-style form-btn-style" @click="register" id="registerBtn">
            Registrer
          </button>
          <router-link to="/login" class="btn btn-primary w-100 form-login-btn-style">
            Logg inn
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {computed, reactive} from "vue";
import {email, helpers, minLength, required, sameAs} from "@vuelidate/validators";
import useValidate from "@vuelidate/core";
export default {
  name: "Register",

  data(){
    return{
      response:'',
      error:'',
    }
  },
  setup(){
    const state = reactive({
      firstname:"",
      lastname:"",
      email:"",
      password:"",
      repeatPassword: ""
    });
    const rules = computed(()=>{
      return{
        firstname:{
          required: helpers.withMessage("Må fylles ut", required)
        },
        lastname:{
          required: helpers.withMessage("Må fylles ut", required)
        },
        email:{
          email: helpers.withMessage("Ugyldig epost!", email),
          required: helpers.withMessage("Må fylles ut", required)
        },
        password:{
          minLength: helpers.withMessage("Passordet må minst bestå av 8 karakterer", minLength(8)),
          required: helpers.withMessage("Må fylles ut", required)
        },
        repeatPassword:{
          sameAs: helpers.withMessage('Passordet er ikke lik det oppgitte passordet over',sameAs(state.password)),
          required: helpers.withMessage("Må fylles ut", required)
        }
      };
    });
    const v$ = useValidate(rules, state);
    return { state, v$ };
  },
  methods:{
    back() {
      this.$router.go(-1)
    },
    register(){
      this.v$.$validate()

      if(this.v$.$error) {
        return
      }

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
          repeatPassword: this.repeatPassword,
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