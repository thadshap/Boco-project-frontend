<template>
  <div class="text-center d-flex flex-column justify-content-center justify-content-sm-center">
    <div>
      <img>
    </div>
    <div class="d-flex flex-column justify-content-center align-items-center justify-content-sm-end align-items-sm-start" style="text-align: center;">
      <div class="d-flex flex-column mx-auto justify-content-sm-start align-items-sm-start">

        <label class="form-label">Fornavn: {{lender.firstname}}<br></label>
        <label class="form-label">Etternavn: {{lender.lastname}}</label>
        <label class="form-label">Email: {{lender.email}}</label>
      </div>
      <div class="mx-auto justify-content-sm-start align-items-sm-center">
        <label v-if="lender.trusted">
          Denne brukeren er markert som verifisert
          <i class="fas fa-check-circle" style="background: var(--bs-white);border-color: var(--bs-blue);color: var(--bs-blue);"></i>
        </label><br>
        <label class="form-label" style="font-style: italic;">
          Brukeren sin vurdering er {{lender.rate}}/10
        </label>
        <i class="fas fa-star" style="color: rgb(255,214,70);"></i>
      </div>
    </div>
    <div>
      <label class="form-label">Anmeldelser for denne brukeren&nbsp;</label>
      <i class="material-icons" v-if="showRightArrow" v-on:click="dropDown">keyboard_arrow_left</i>
      <i class="material-icons" v-if="!showRightArrow" v-on:click="dropDown">keyboard_arrow_down</i>
      <div id="review" v-for="review in reviews" :key="review">
        <div class="earlierReviews" v-if="!showRightArrow">
          {{review.rating}}/10<i class="fas fa-star" style="color: rgb(255,214,70);"></i><br>
          {{review.firstName }} {{review.lastName}}<br>
          {{review.description}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userService from "@/services/userService";
import reviewService from "@/services/reviewService";
export default {
  name: "UserProfile",
  data(){
    return {
      showRightArrow : true,
      lender : {
      },
      reviews : [
          ],

    }
  },
  methods : {
    dropDown (){
      if(this.showRightArrow){
        this.showRightArrow = false;
      } else {
        this.showRightArrow = true;
      }
    },
    async getLender(){
      await userService
      .getUserById(parseInt(localStorage.getItem("lenderId"))) //TODO: in DetailedAd.vue change this.user.id in seeLenderDetails method so this method works
      .then(response => {
        this.lender.firstname = response.data.firstName
        this.lender.lastname = response.data.lastName
        this.lender.trusted = response.data.verified
        this.lender.email = response.data.email
        this.lender.rating = response.data.rating
      })      
      .catch(error =>{
        console.log(error);
      });
    },
    async getReviewsByLender(){
      await reviewService
      .getReviewsByUserId(parseInt(localStorage.getItem("lenderId")))
      .then(response =>{
        console.log(response.data)
        this.reviews = response.data
        for(let i=0; i<response.data.length; i++){
          this.setNameOfUserLeftReview(response.data[i].userId, i)
        }
      })
      .catch(error => {
        console.log(error)
      });
    },
  async setNameOfUserLeftReview(id, i){
    await userService.getUserById(id).then(response => {
      console.log(response.data)
      this.reviews[i].firstName = response.data.firstName;
      this.reviews[i].lastName = response.data.lastName;
    }).catch(error => {
      console.log(error);
      this.GStore.flashMessage = "Fikk ikke hentet navn på anmeldelsene"
      this.GStore.variant = "Error"
      setTimeout(() => {
        this.GStore.flashMessage = ""
      }, 4000)
    })
  },
  },
  async mounted(){
    await this.getLender()
    await this.getReviewsByLender()
  }
}
</script>

<style scoped>
.material-icons{
  cursor: pointer;
}
.earlierReviews{
  border-style: solid;
  border-color: grey;
  width: 40%;
}
#review{
  display: grid;
  justify-items: center;
  font-size: 10px;
}
</style>