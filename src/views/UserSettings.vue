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
            <img class="ms-auto user-img" v-if="url" :src="url">
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
          <div class="header">Bruker opplysning</div>
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
              <label class="form-label password-label">Befrekt passord*</label>
              <input class="user-input" type="password" id="repeatPassword" placeholder="********" v-model="state.repeatPasswordChange" v-on:change="disableChangeBtn">
              <span id="repeatPasswordError" class="text-danger" v-if="v$.repeatPasswordChange.$error">
                {{ v$.repeatPasswordChange.$errors[0].$message }}
              </span>
            </div>
          </div>
          <button id="change" class="btn btn-primary w-100 update-user-info-btn" type="button" :disabled="disableBtn === true" @click="submit">Endre</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { email, minLength, helpers, sameAs } from "@vuelidate/validators";
import { computed, reactive } from "vue";
import useValidate from "@vuelidate/core";

export default {
  inject: ["GStore"],
  name: "UserSettings",
  data(){
    return{
    // TODO: her burde det lagres en array som tar imot info om brukeren fra databasen
      firstname: "Thadsha",
      lastname: "Paramsothy",
      username: "Thadsha1710",
      email: "thadsha1710@live.no",
      password: "heisann",
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
  created() {
    this.disableChangeBtn()
    //TODO: alltid vis informasjonen om en bruker når siden blir åpnet
  },
  methods:{
    back() {
      this.$router.go(-1)
    },
    getUserInfo(){
      //  TODO: her burde det settes lik den informasjonen som hentes fra databasen som
      this.firstname = ''
      this.lastname = ''
      this.username = ''
      this.email = ''
      this.password = ''
      this.repeatPassword = ''
    },
    changeUserInfo(){
      // TODO:isteden for this.firstname og sånt så må man hente fra den arrayen som sendes fra databasen om en bruker
      if (this.firstnameChange !== this.firstname){
        // TODO: endre inn på databasen
        this.firstnameChange = this.firstname
      }
      if (this.lastnameChange !== this.lastname){
        // TODO: endre inn på databasen
        this.lastnameChange = this.lastname
      }
      if (this.usernameChange !== this.username){
        // TODO: endre inn på databasen
        this.usernameChange = this.username
      }
      if (this.state.emailChange !== this.email){
        // TODO: endre inn på databasen
        this.state.emailChange = this.email
      }
      if (this.state.passwordChange !== this.password){
        // TODO: endre inn på databasen
        this.state.passwordChange = this.password
      }
      if (this.state.repeatPasswordChange !== this.repeatPassword){
        // TODO: endre inn på databasen
        this.state.repeatPasswordChange = this.repeatPassword
      }
    },
    disableChangeBtn(){
      if (this.firstnameChange === '' && this.lastnameChange === '' && this.usernameChange === '' &&this.state.emailChange === '' && this.state.passwordChange === '' && this.state.repeatPasswordChange === ''|| this.v$.$error) this.disableBtn = true
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
      // TODO: sette inn eksisterende profilbilde fra databasen
    },
    submit(){
      this.v$.$validate()
      if (this.v$.$error){
        this.disableBtn = true
      }
      else {
        this.GStore.flashMessage = "Brukerendringen har blitt fullført!"
        this.GStore.variant = "Success"
        setTimeout(() => {
          this.GStore.flashMessage = ""
        }, 4000)
        this.firstnameChange = ""
        this.lastnameChange = ""
        this.usernameChange = ""
        this.emailChange = ""
        this.passwordChange = ""
        this.disableBtn = true
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
.user-img-upload-btn{
  font-size: 1em;
}
.user-img{
  border-radius: 1px;
  margin-bottom: 10px;
  height:200px;
  width: 150px;
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
  padding: 10px;
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
  padding: 10px;

}
.password-label, .email-label, .lastname-label, .firstname-label, .username-label{
  font-size: 1.2em;
}
.user-input{
  background: rgba(230,247,255,0.43);
  border-radius: 4px;
  border: 0.5px solid rgb(201,197,197);
  height: 35px;
  width: 65%;
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
  font-size: 30px;
  margin-top: 20px;
}
span{
  display: flex;
  width: 75%;
  left: 35%;
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
</style>