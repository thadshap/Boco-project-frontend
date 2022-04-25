<template>
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
          <div class="d-inline-flex w-100 email-container">
            <label class="form-label email-label">Epost</label>
            <input class="user-input" type="email" id="email" name="email" :placeholder="email" v-model="state.emailChange" v-on:change="disableChangeBtn">
            <span class="text-danger w-65" v-if="v$.emailChange.$error">
              {{ v$.emailChange.$errors[0].$message }}
            </span>
          </div>
          <div class="d-inline-flex w-100 password-container">
            <label class="form-label password-label">Passord</label>
            <input class="user-input" type="password" id="password" placeholder="********" v-model="state.passwordChange" v-on:change="disableChangeBtn">
            <span class="text-danger" v-if="v$.passwordChange.$error">
              {{ v$.passwordChange.$errors[0].$message }}
            </span>
          </div>
        </div>
        <button class="btn btn-primary w-100 update-user-info-btn" type="button" :disabled="disableBtn === true" @click="submit">Endre</button>
      </div>
    </div>
  </div>
</template>

<script>
import { email, minLength, helpers } from "@vuelidate/validators";
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
      email: "thadsha1710@live.no",
      password: "heisann",
      disableBtn: true,
      firstnameChange: "",
      lastnameChange: "",
      url: null,
    };
  },
  setup(){
    const state = reactive({
      emailChange:"",
      passwordChange:""
    });
    const rules = computed(()=>{
      return{
        emailChange:{
          email: helpers.withMessage("Ugyldig epost!", email)
        },
        passwordChange:{
          minLength: helpers.withMessage("Passordet må minst bestå av 8 karakterer", minLength(8))
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
    getUserInfo(){
      //  TODO: her burde det settes lik den informasjonen som hentes fra databasen som
      this.firstname = ''
      this.lastname = ''
      this.email = ''
      this.password = ''
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
      if (this.state.emailChange !== this.email){
        // TODO: endre inn på databasen
        this.state.emailChange = this.email
      }
      if (this.state.passwordChange !== this.password){
        // TODO: endre inn på databasen
        this.state.passwordChange = this.password
      }
    },
    disableChangeBtn(){
      if (this.firstnameChange === '' && this.lastnameChange === '' && this.state.emailChange === '' && this.state.passwordChange === '' || this.v$.$error) this.disableBtn = true
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
.password-label, .email-label, .lastname-label, .firstname-label{
  font-size: 1.2em;
}
.user-input{
  background: rgba(230,247,255,0.43);
  border-radius: 4px;
  border: 0.5px solid rgb(201,197,197);
  height: 35px;
  width: 65%;
}
.firstname-container,.lastname-container,.email-container,.password-container{
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
</style>