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
        <div class="d-flex flex-column align-content-center flex-wrap">
          <div class="d-flex flex-column user-img-container">
            <input class="d-none" type="file" @input="onFileChange" accept="image/*" ref="fileInput"/>
            <img alt="Profilbilde" class="ms-auto user-img" v-if="url" :src="url" width="150" height="200">
            <button class="btn btn-primary me-auto w-100 user-img-upload-btn" type="button" @click="chooseImages">Endre profilbilde</button>
          </div>
        </div>
        <div class="w-100 user-info-container">
          <div class="header">Om meg</div>
          <div class="mt-auto w-100 personal-info">
            <div class="d-inline-flex w-100 firstname-container">
              <label class="form-label firstname-label">Fornavn</label>
              <input class="user-input" type="text" id="firstname" :placeholder="firstname" v-model="firstnameChange" v-on:change="disableChangeBtn">
            </div>
            <div class="d-inline-flex w-100 lastname-container">
              <label class="form-label lastname-label">Etternavn</label>
              <input class="user-input" type="text" id="lastname" :placeholder="lastname" v-model="lastnameChange" v-on:change="disableChangeBtn">
            </div>
          </div>
          <div class="header">Brukeropplysning</div>
          <div class="me-auto w-100 user-info">
            <div class="d-inline-flex w-100 username-container">
              <label class="form-label username-label">Brukernavn</label>
              <input class="user-input" type="text" id="username" name="username" :placeholder="username" v-model="usernameChange" v-on:change="disableChangeBtn">
            </div>
            <div class="d-inline-flex w-100 email-container">
              <label class="form-label email-label">Epost</label>
              <input class="user-input" type="email" id="email" name="email" :placeholder="email" v-model="state.emailChange" v-on:change="disableChangeBtn">
              <span id="emailError" class="text-danger w-65" v-if="v$.emailChange.$error">
                {{ v$.emailChange.$errors[0].$message }}
              </span>
            </div>
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
          <button id="change" class="btn btn-primary w-100 update-user-info-btn" type="button" :disabled="disableBtn === true" @click="submit">Endre</button>
          <button class="btn btn-primary w-100 delete-user-btn" type="button"  @click="deleteUser">Slett konto</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { email, minLength, helpers, sameAs } from "@vuelidate/validators";
import { computed, reactive } from "vue";
import useValidate from "@vuelidate/core";
import lendingService from "../services/lendingService";


export default {
  inject: ["GStore"],
  name: "UserSettings",
  data(){
    return{
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      disableBtn: true,
      firstnameChange: "",
      lastnameChange: "",
      usernameChange: "",
      url: null,
    };
  },
  setup(){
    const state = reactive({
      emailChange:"",
      passwordChange:"",
      repeatPasswordChange: ""
    });
    const rules = computed(()=>{
      return{
        emailChange:{
          email: helpers.withMessage("Ugyldig epost!", email)
        },
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
  created: async function() {
    /**
    await this.disableChangeBtn()
    await this.getUserInfo()
     */
  },
  methods:{
    back() {
      this.$router.go(-1)
    },
    getUserInfo:async function(){
      await lendingService.getUserById(localStorage.getItem("account").id)
        .then(response => {
          this.firstname = response.data.firstname
          this.lastname = response.data.lastname
          this.username = response.data.username
          this.email = response.data.email
          this.password = response.data.password
        }).catch(error => {
          this.GStore.flashMessage = "Fikk ikke hentet brukeren!"
          this.GStore.variant = "Error"
          setTimeout(() => {
            this.GStore.flashMessage = ""
          }, 4000)
          console.log(error)
        })
    },
    changeUserInfo:async function(){
      this.firstname = this.firstnameChange
      this.lastname = this.lastnameChange
      this.username = this.usernameChange
      this.email = this.state.emailChange
      this.password = this.state.passwordChange
      await lendingService.updateUser(this.firstname,this.lastname,this.email,this.password,localStorage.getItem("account").id)
      .then(response => {
        this.GStore.flashMessage = "Brukerendringen har blitt fullført!"
        this.GStore.variant = "Success"
        setTimeout(() => {
          this.GStore.flashMessage = ""
        }, 4000)
        console.log(response)
      }).catch(error => {
          this.GStore.flashMessage = "Fikk ikke endret bruker informasjonen!"
          this.GStore.variant = "Error"
          setTimeout(() => {
            this.GStore.flashMessage = ""
          }, 4000)
          console.log(error)
        })
    },
    disableChangeBtn(){
      if (this.firstnameChange === '' && this.lastnameChange === '' && this.usernameChange === '' && this.state.emailChange === '' && this.state.passwordChange === '' && this.state.repeatPasswordChange === ''|| this.v$.$error) this.disableBtn = true
      else if (this.state.passwordChange === '' && this.state.repeatPasswordChange !== '' || this.state.passwordChange !== '' && this.state.repeatPasswordChange === '') this.disableBtn = true
      else this.disableBtn = false
    },
    chooseImages() {
      this.$refs.fileInput.click()
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    existingUserImg(){
      // TODO: sette inn eksisterende profilbilde fra databasen hvis den eksisterer
    },
    submit(){
      this.v$.$validate()
      if (this.v$.$error){
        this.disableBtn = true
      }
      else {
        this.changeUserInfo()
        this.firstnameChange = ""
        this.lastnameChange = ""
        this.usernameChange = ""
        this.state.emailChange = ""
        this.state.passwordChange = ""
        this.state.repeatPasswordChange = ""
        this.disableBtn = true
      }
    },
    deleteUser:async function(){
      let deleteAccount = prompt("Hvis du er sikker på å slette kontoen din, tast inn 'JA':");
      if (deleteAccount == "JA") {
        await lendingService.deleteUser(localStorage.getItem("account").id)
          .then(response => {
            this.GStore.flashMessage = "Kontoen har blitt sletta"
            this.GStore.variant = "Success"
            setTimeout(() => {
              this.GStore.flashMessage = ""
            }, 4000)
            console.log(response)
          }).catch(error => {
            this.GStore.flashMessage = "Fikk slettet brukeren!"
            this.GStore.variant = "Error"
            setTimeout(() => {
              this.GStore.flashMessage = ""
            }, 4000)
            console.log(error)
          })
        //TODO: når brukeren blir slettet så sendes brukeren til hjemmesiden og er ikke pålogget
      } else return
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
.user-img-upload-btn{
  font-size: 1em;
}
.user-img{
  border-radius: 1px;
  margin-bottom: 10px;
  object-fit:cover;
  object-position:50% 50%;
}
.user-img-container{
  display: flex;
  justify-content: center;
  align-items: center;
}
.user-info-container{
  text-align: center;
  padding-top: 1em;
}
.personal-info{
  background: rgba(255,253,253,0.74);
  border-radius: 4px;
  text-align: center;
  padding: 4%;
  margin-bottom: 20px;
}
.firstname-label{
  border-width: 8px;
  text-align: left;
}
.user-info{
  background: rgba(255,253,253,0.74);
  border-radius: 4px;
  text-align: center;
  padding: 4%;

}
.password-label, .email-label, .lastname-label, .firstname-label, .username-label{
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
.firstname-container,.lastname-container,.email-container,.password-container, .username-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.update-user-info-btn{
  background: #03991b;
  border-radius: 6px;
  text-align: center;
  font-size: 1.5em;
  margin-top: 20px;
}
.update-user-info-btn:hover{
  background: rgba(3, 153, 27, 0.7);
}
.delete-user-btn{
  background: rgb(227, 2, 2);
  border-radius: 6px;
  text-align: center;
  font-size: 1.5em;
  margin-top: 20px;
}
.delete-user-btn:hover{
  background: rgba(227, 2, 2, 0.7);
}
#emailError, #passwordError, #repeatPasswordError{
  display: flex;
  width: 50%;
  left: 50%;
  position: relative;
}
.header{
  display: flex;
  justify-content: left;
  font-weight: bold;
  color: rgba(44, 62, 80, 0.8);
}
.back-arrow-container {
  cursor: pointer;
}
@media (max-width: 573px) {
  .password-label, .email-label, .lastname-label, .firstname-label, .username-label{
    font-size: 1em;
  }
  .user-input{
    height: 30px;
    font-size: 0.7em;
  }
  .update-user-info-btn, .delete-user-btn{
    font-size: 1em;
  }
  .user-img-upload-btn{
    font-size: 0.9em;
  }
  #emailError, #passwordError, #repeatPasswordError{
    font-size: 0.7em;
  }
}
@media (max-width: 370px){
  .password-label, .email-label, .lastname-label, .firstname-label, .username-label{
    font-size: 0.9em;
  }
  .user-input{
    height: 25px;
    font-size: 0.5em;
  }
  .update-user-info-btn, .delete-user-btn{
    font-size: 0.9em;
  }
  .user-img-upload-btn{
    font-size: 0.7em;
  }
}
@media (max-width: 300px){
  .password-label, .email-label, .lastname-label, .firstname-label, .username-label{
    font-size: 0.6em;
  }
}
</style>