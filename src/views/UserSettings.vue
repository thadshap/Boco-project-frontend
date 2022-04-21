<template>
  <div class="d-sm-flex flex-grow-1 justify-content-sm-center align-items-sm-center w-100 main-container">
    <div class="text-end">
      <div class="d-flex flex-column align-content-center flex-wrap">
        <div class="d-flex flex-column">
          <img class="ms-auto user-img">
          <button class="btn btn-primary me-auto user-img-upload-btn" type="button">Edit picture</button>
        </div>
      </div>
      <div class="w-100 user-info-container">
        <div class="mt-auto w-100 personal-info">
          <div class="d-inline-flex firstname-container">
            <label class="form-label firstname-label">Fornavn</label>
            <input class="user-input" type="text" id="firstname" :placeholder="firstname" v-model="firstnameChange" v-on:change="disableChangeBtn">
          </div>
          <div class="d-inline-flex lastname-container">
            <label class="form-label lastname-label">Etternavn</label>
            <input class="user-input" type="text" id="lastname" :placeholder="lastname" v-model="lastnameChange" v-on:change="disableChangeBtn">
          </div>
        </div>
        <div class="me-auto user-info">
          <div class="d-inline-flex email-container">
            <label class="form-label email-label">Epost</label>
            <input class="user-input" type="email" id="email" :placeholder="email" v-model="emailChange" v-on:change="disableChangeBtn">
          </div>
          <div class="d-inline-flex password-container">
            <label class="form-label password-label">Passord</label>
            <input class="user-input" type="password" id="password" placeholder="********" v-model="passwordChange" v-on:change="disableChangeBtn">
          </div>
        </div>
        <button class="btn btn-primary update-user-info-btn" type="button" :disabled="disableBtn === true">Endre</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserSettings",
  data(){
    return{
    //her burde det lagres en array som tar imot info om brukeren fra databasen
      firstname: "Thadsha",
      lastname: "Paramsothy",
      email: "thadsha1710@live.no",
      password: "heisann",
      disableBtn: true,
      firstnameChange: '',
      lastnameChange: '',
      emailChange: '',
      passwordChange: '',
    };
  },
  created() {
    this.disableChangeBtn()
  },
  methods:{
    getUserInfo(){
      //Her burde det settes lik den informasjonen som hentes fra databasen som
      this.firstname = ''
      this.lastname = ''
      this.email = ''
      this.password = ''
    },
    changeUserInfo(){
      // isteden for this.firstname og sånt så må man hente fra den arrayen som sendes fra databasen om en bruker
      if (this.firstnameChange !== this.firstname){
        // endre inn på databasen
        this.firstnameChange = this.firstname
      }
      if (this.lastnameChange !== this.lastname){
        // endre inn på databasen
        this.lastnameChange = this.lastname
      }
      if (this.emailChange !== this.email){
        // endre inn på databasen
        this.emailChange = this.email
      }
      if (this.passwordChange !== this.password){
        // endre inn på databasen
        this.passwordChange = this.password
      }
    },
    disableChangeBtn(){
      if (this.firstnameChange === '' && this.lastnameChange === '' && this.emailChange === '' && this.passwordChange === '') this.disableBtn = true
      else this.disableBtn = false
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
  width: 100%;
}
.user-img{
  border-radius: 1px;
  width: 150px;
  height: 150px;
  text-align: center;
  margin-bottom: 10px;
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
}
.firstname-label{
  border-width: 8px;
  text-align: left;
}
.user-info{
  background: rgba(255,253,253,0.74);
  border-radius: 4px;
  text-align: center;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
}
.password-label, .email-label, .lastname-label, .firstname-label{
  font-size: 1.5em;
}
.user-input{
  background: rgba(230,247,255,0.43);
  border-radius: 4px;
  border: 0.5px solid rgb(201,197,197);
  height: 35px;
  width: 65%;
}
.firstname-container,.lastname-container,.email-container,.password-container{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.update-user-info-btn{
  background: #03991b;
  border-radius: 6px;
  text-align: center;
  font-size: 30px;
  width: 100%;
  margin-top: 20px;
}
</style>