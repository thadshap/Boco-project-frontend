<template>
  <div class="container">
    <div class="d-flex justify-content-start align-items-center">
      <div class="align-items-center back-arrow-container" @click="back">
        <i class="fa fa-arrow-left"></i>
        <span class="mx-2">Tilbake</span>
      </div>
    </div>
    <div class="d-flex flex-column justify-content-center align-items-center">
    <div class="d-flex flex-column justify-content-center align-items-center" v-if="!this.$store.getters.loggedIn">
      <div class="text-center form-elements-container-style">
        <img src="@/assets/img/BoCo.png" class="logo-style" alt="logo">
        <h1 class="text-center">Logg inn</h1>
        <div class="d-flex flex-column flex-shrink-1 align-items-center form-inputs-container-style">
          <div class="text-center form-username-container-style">
            <label class="form-label form-username-label-style">Epost</label>
            <input class="form-control" type="text" v-model="state.email">
            <span id="emailError" class="text-danger w-65" v-if="v$.email.$error">
              {{ v$.email.$errors[0].$message }}
            </span>
          </div>
          <div class="text-center form-password-container-style">
            <label class="form-label form-password-label-style">Passord</label>
            <input class="form-control" type="password" v-model="password">
          </div>
          <div>
            <a href="#" v-on:click="changePassword" class="form-forgot-password-style">Glemt passord?</a>
          </div>
        </div>
        <div class="form-buttons-container-style">
          <div class="d-flex flex-column flex-shrink-1 justify-content-center align-items-center form-signin-btn-container-style">
            <button class="btn btn-primary w-100 form-signin-btn-style" @click="loginSubmit">Logg inn</button>
          </div>
          <div class="d-flex flex-column justify-content-center">

            <FacebookLoginComponent />
            <GoogleLoginComponent />

          </div>
          <div class="d-flex flex-column flex-shrink-1 justify-content-center align-items-center form-register-btn-container-style">
            <router-link to="/register" class="btn btn-primary w-100 form-register-btn-style">Registrer</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import lendingService from "@/services/lendingService";
import { helpers, email } from "@vuelidate/validators";
import { computed, reactive } from "vue";

import FacebookLoginComponent from "@/components/FacebookLoginComponent";
import GoogleLoginComponent from "@/components/GoogleLoginComponent";
import { logIn } from "@/services/loginService";

import chatService from "@/services/chatService";

export default {
  inject: ["GStore"],
  name: "Login",
  components: {
    FacebookLoginComponent,
    GoogleLoginComponent
  },
  setup() {
    const state = reactive({
      email: "",
    })

    const rules = computed(()=> {
      return {
        email: {
          email: helpers.withMessage("Ugyldig epost!", email)
        }
      }
    })
    const v$ = useValidate(rules, state);
    return { state, v$ };
  },

  data(){
    return{
      password:'',
    }
  },
  methods:{
    back() {
      this.$router.go(-1)
    },
    async changePassword (){
      let changePasswordMessage = prompt("Skriv inn e-post")
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (regex.test(changePasswordMessage)) {
        await lendingService.forgotPassword(changePasswordMessage)
          .then(response => {
            this.GStore.flashMessage = "Sent! Sjekk den oppgitte e-posten"
            this.GStore.variant = "Success"
            setTimeout(() => {
              this.GStore.flashMessage = ""
            }, 6000)
            localStorage.setItem("forgotPasswordToken", response.data);
          }).catch(error => {
            this.GStore.flashMessage = "Ops...Noe gikk galt. Har du skrevet riktig email"
            this.GStore.variant = "Error"
            setTimeout(() => {
              this.GStore.flashMessage = ""
            }, 4000)
            console.log(error)
          })
      }
      else {
        this.GStore.flashMessage = "Prøv igjen, e-posten har feil formatering"
        this.GStore.variant = "Error"
        setTimeout(() => {
          this.GStore.flashMessage = ""
        }, 4000)
      }
    },
    async loginSubmit(){
      this.v$.$validate()
      if (this.v$.$error){
        return
      }
      await logIn(this.state.email, this.password)
        .then((response) => {
            console.log(response.status)
            if(response.status === 404) {
              alert("Feil brukernavn eller passord")
              return;
            }
            if(response.status !== 202) {
              console.log("fikk ikke kontakt med backend")
              return
            }
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.id);
            console.log(localStorage.getItem("userId"))
            localStorage.setItem("provider","none")
            this.$store.dispatch("setLoggedIn",true)
            this.$router.push("/")
          })
          .catch(error => {
            console.error(error)
            alert("Nå skjedde det noe galt, prøv på nytt")
          });

        await this.$router.push("/")
        await chatService.getGroupChatsByUserId(parseInt(localStorage.getItem("userId"))) 
        .then(response => {
        this.groups = response.data
        })
        .catch(error => {
        console.log(error)
        })  
  },
  }
};
</script>

<style scoped>

.form-inputs-container-style,
.form-username-container-style,
.form-password-container-style,
.form-signin-btn-container-style,
.form-register-container-style {
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

.form-register-container-style {
  padding-bottom: 20px;
}

.form-register-style {
  background: rgba(13,110,253,0);
  color: blue;
  font-size: 25px;
  text-decoration: none;
}

.back-arrow-container:hover {
  cursor: pointer;
}
</style>
