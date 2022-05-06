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
            <div class="header">Bekreft leieforhold</div>
            <div>Venligst bekreft eller avslå leieforhold.</div>
          </div>
          <div class="me-auto w-100 user-info">
            <div class="d-inline-flex w-100 password-container">
              <label class="form-label password-label">Tittel på annonse</label>
              <text class="user-input" >{{ this.title }}</text>
            </div>
            <div>
              <br>
            </div>
            <div class="d-inline-flex w-100 password-container">
              <label class="form-label password-label">Navn på lånetaker</label>
                            <text class="user-input" >{{ this.borrower }}</text>
            </div>
            <div>
              <br>
            </div>
            <div class="d-inline-flex w-100 password-container">
              <label class="form-label password-label">Leie fra</label>
              <text class="user-input" >{{ this.rentFrom }}</text>
            </div>
            <div>
              <br>
            </div>
            <div class="d-inline-flex w-100 password-container">
              <label class="form-label password-label">Leie til</label>
              <text class="user-input" >{{ this.rentTo }}</text>
            </div>
            <div>
              <br>
            </div>
            <div class="d-inline-flex w-100 password-container">
              <label class="form-label password-label">Avlysningsfrist</label>
              <text class="user-input" >{{ this.deadline }}</text>
            </div>
            <div>
              <br>
            </div>
            <div class="d-inline-flex w-100 password-container">
              <label class="form-label password-label">Samlet pris</label>
              <text class="user-input" >{{ this.price }}</text>
            </div>
          </div>
          <button id="change" class="btn btn-primary w-100 update-user-info-btn" type="button" @click="approve()">Godta leieforhold</button>
          <button id="changes" class="btn btn-primary w-100 update-user-info-decline-btn" type="button" @click="decline()">Avslå leieforhold</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rentalService from "@/services/rentalService";
import adService from "@/services/adService";

export default {
  name: "ResetPassword",
  data(){
    return{
      dateOfRental: "",
      rentFrom: "",
      rentTo: "",
      deadline: "",
      price: null,
      borrower: "",
      title: "",
      adId: null,
      id: null,
      rentalId:"",
      ownerId:"",
    };
  },
  async mounted() {
    //kan legges til en sjekk her for å se at det ikke er noe suspekt
    //med det som er skrevet i url-en
    this.rentalId = this.$route.query.rentalId
    await rentalService.getRentalById(this.rentalId)
        .then(response => {
          this.dateOfRental = response.data.dateOfRental
          this.rentFrom =  response.data.rentFrom
          this.rentTo = response.data.rentTo
          this.deadline = response.data.deadline
          this.price = response.data.price
          this.borrower = response.data.borrower
          this.title = response.data.title
          this.adId = response.data.adId
          this.id = response.data.id
        })
        .catch(error => {
          console.error(error)
          this.$router.push("/")
        })
    await adService.getAdById(this.adId)
    .then(response => {
      this.ownerId = response.data.userId
    })

    if(this.ownerId !== parseInt(localStorage.getItem("userId"))){
      await this.$router.push("/")
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    async approve() {
      await rentalService.approveRental(this.rentalId)
      .then(response => {
        if(response.status === 200){
          alert("Leieforholdet er nå godtatt")
          this.$router.push({
            name: "My Rentals",
            query:{
              redirect: "/profile/rentals"
            }
          })
        }
      })
    },
    async decline() {
      await rentalService.declineRental(this.rentalId)
      .then(response => {
        if(response.status === 200){
          alert("Leieforholdet er nå avslått")
          this.$router.push("/")
        }
      })
      .catch(error => {
        console.error(error)
      })
    }
  }
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
.update-user-info-decline-btn{
  background: red;
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
  .update-user-info-decline-btn{
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
  .update-user-info-decline-btn{
    font-size: 0.9em;
  }
}
@media (max-width: 300px){
  .password-label{
    font-size: 0.6em;
  }
}
</style>
