<template>
<div class="container">
<div class="d-flex justify-content-start align-items-center">
  <div class="align-items-center back-arrow-container" @click="back">
    <i class="fa fa-arrow-left"></i>
    <span class="mx-2">Tilbake</span>
  </div>
</div>
<div class="d-sm-flex flex-grow-1 justify-content-sm-center align-items-sm-center w-100 main-container">
  <div class="text-end">
    <div class="w-100 user-info-container">
      <div class="header-container">
      <div class="header">Reset passord</div>
      <div>Venligst fyll ut begge feltene under. Pass på at passordet inneholder minst 8 karakterer.</div>
      </div>
      <div class="me-auto w-100 user-info">
        <div class="d-inline-flex w-100 password-container">
          <label class="form-label password-label">Passord</label>
          <input class="user-input" type="password" id="password" placeholder="********" v-model="state.passwordChange" v-on:change="disableChangeBtn">
          <span id="passwordError" class="text-danger" v-if="v$.passwordChange.$error">
                {{ v$.passwordChange.$errors[0].$message }}
              </span>
        </div>
        <div class="d-inline-flex w-100 password-container">
          <label class="form-label password-label">Bekreft passord*</label>
          <input class="user-input" type="password" id="repeatPassword" placeholder="********" v-model="state.repeatPasswordChange" v-on:change="disableChangeBtn">
          <span id="repeatPasswordError" class="text-danger" v-if="v$.repeatPasswordChange.$error">
                {{ v$.repeatPasswordChange.$errors[0].$message }}
              </span>
        </div>
      </div>
      <button id="change" class="btn btn-primary w-100 update-user-info-btn" type="button" :disabled="disableBtn === true" @click="submit">Reset passord</button>
    </div>
  </div>
</div>
</div>
</template>

<script>
import { minLength, helpers, sameAs } from "@vuelidate/validators";
import { computed, reactive } from "vue";
import useValidate from "@vuelidate/core";
import lendingService from "../services/lendingService";

export default {
  inject: ["GStore"],
  name: "ResetPassword",
  data(){
    return{
      // TODO: her burde det lagres en array som tar imot info om brukeren fra databasen
      password: "",
      repeatPassword: "",
      disableBtn: true,
    };
  },
  setup(){
    const state = reactive({
      passwordChange:"",
      repeatPasswordChange: ""
    });
    const rules = computed(()=>{
      return{
        passwordChange:{
          minLength: helpers.withMessage("Passordet må minst bestå av 8 karakterer", minLength(8))
        },
        repeatPasswordChange:{
          sameAs: helpers.withMessage('Passordet er ikke lik det oppgitte passordet over',sameAs(state.passwordChange))
        }
      };
    });
    const v$ = useValidate(rules, state);
    return { state, v$ };
  },
  created() {
    this.disableChangeBtn()
  },
  methods:{
    back() {
      this.$router.go(-1)
    },
    changePassword: async function(){
      // TODO:endre siste parameteren på linje 85 ang token, vet ikke om den heter token
      this.password = this.state.passwordChange
      this.repeatPassword = this.state.repeatPasswordChange
      await lendingService.renewPassword(this.password,this.repeatPassword,localStorage.getItem("account").accessToken)
        .then(response => {
          this.GStore.flashMessage = "Passoret har blitt endret!"
          this.GStore.variant = "Success"
          setTimeout(() => {
            this.GStore.flashMessage = ""
          }, 4000)
          console.log(response)
        }).catch(error => {
          this.GStore.flashMessage = "Fikk ikke endret passordet!"
          this.GStore.variant = "Error"
          setTimeout(() => {
            this.GStore.flashMessage = ""
          }, 4000)
          console.log(error)
        })
    },
    disableChangeBtn(){
      if (this.state.passwordChange === '' && this.state.repeatPasswordChange === ''|| this.v$.$error) this.disableBtn = true
      else if (this.state.passwordChange === '' && this.state.repeatPasswordChange !== '' || this.state.passwordChange !== '' && this.state.repeatPasswordChange === '') this.disableBtn = true
      else this.disableBtn = false
    },
    submit(){
      this.v$.$validate()
      if (this.v$.$error){
        this.disableBtn = true
      }
      else {
        this.changePassword()
        this.state.passwordChange = ""
        this.state.repeatPasswordChange = ""
        this.disableBtn = true
        // TODO: gå til log inn siden
      }
    }
  },
};
</script>

<style scoped>
.main-container{
  background: rgb(230,247,255);
  padding: 2em;
  text-align: center;
  height: 100%;
}
.user-info-container{
  text-align: center;
  padding-top: 1em;
}
.user-info{
  background: rgba(255,253,253,0.74);
  border-radius: 4px;
  text-align: center;
  padding: 4%;
}
.password-label{
  font-size: 1.2em;
}
.user-input{
  background: rgba(230,247,255,0.43);
  border-radius: 4px;
  border: 0.5px solid rgb(201,197,197);
  height: 35px;
  width: 50%;
  font-size: 1em;
}
.password-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.update-user-info-btn{
  background: #0D6EFD;
  border-radius: 6px;
  text-align: center;
  font-size: 1.5em;
  margin-top: 20px;
}
 #passwordError, #repeatPasswordError{
  display: flex;
  width: 50%;
  left: 50%;
  position: relative;
}
.header-container{
   padding: 20px;
 }
.header{
  font-weight: bold;
  font-size: 2em;
  padding-bottom: 10px;
}
.back-arrow-container {
  cursor: pointer;
}

@media (max-width: 573px) {
  .password-label{
    font-size: 1em;
  }
  .user-input{
    height: 30px;
    font-size: 0.7em;
  }
  .update-user-info-btn{
    font-size: 1em;
  }
  #passwordError, #repeatPasswordError{
    font-size: 0.7em;
  }
}
@media (max-width: 370px){
  .password-label{
    font-size: 0.9em;
  }
  .user-input{
    height: 25px;
    font-size: 0.5em;
  }
  .update-user-info-btn{
    font-size: 0.9em;
  }
}
@media (max-width: 300px){
  .password-label{
    font-size: 0.6em;
  }
}
</style>