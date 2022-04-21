<template>
  <div class="d-sm-flex flex-grow-1 justify-content-sm-center align-items-sm-center w-100 main-container">
    <div class="text-end">
      <div class="d-flex flex-column align-content-center flex-wrap">
        <div class="d-flex flex-column">
          <img class="ms-auto" style="border-radius: 1px;width: 150px;height: 150px;text-align: center;margin-bottom: 10px;">
          <button class="btn btn-primary me-auto" type="button" style="font-size: 22px;width: 100%;">Edit picture</button>
        </div>
      </div>
      <div class="w-100 user-info-container">
        <div class="mt-auto w-100 personal-info">
          <div class="d-inline-flex firstname-container">
            <label class="form-label firstname-label">Fornavn</label>
            <input class="firstname-input" type="text">
          </div>
          <div class="d-inline-flex lastname-container">
            <label class="form-label lastname-label">Etternavn</label>
            <input class="lastname-input" type="text">
          </div>
        </div>
        <div class="me-auto user-info">
          <div class="d-inline-flex epost-container">
            <label class="form-label epost-label">Epost</label>
            <input class="epost-input" type="text">
          </div>
          <div class="d-inline-flex password-container">
            <label class="form-label password-label">Passord</label>
            <input class="password-input" type="password">
          </div>
        </div>
        <button class="btn btn-primary update-user-info-btn" type="button">Endre</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserSettings",
  data(){
    return{

    };
  },
  methods:{

  },
};
</script>

<style scoped>
.main-container{
  background: rgb(230,247,255);
  padding: 2em;
  text-align: center;
  height: 100%;
  margin-top: 100px;
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
.password-label, .epost-label, .lastname-label, .firstname-label{
  font-size: 1.5em;
}
.password-input, .epost-input, .lastname-input, .firstname-input{
  background: rgba(230,247,255,0.43);
  border-radius: 4px;
  border: 0.5px solid rgb(201,197,197);
  height: 35px;
  width: 65%;
}
.firstname-container,.lastname-container,.epost-container,.password-container{
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