<template>
  <div class="container">
    <div
      id="adPictureDiv"
      class="text-center"
    >
      <img src={{picture}}>
    </div>
    <div class="text-center">
      <label id="adHeader" class="form-label">{{ ad.title }}</label>
    </div>
    <div class="text-center">
      <label class="form-label">
        Leiepris : {{ ad.price }} kr pr/{{ ad.durationType }}
      </label>
    </div>
    <div id="description" class="text-center">
      <label id="descriptionLabel" class="form-label">
        {{ ad.description }}
      </label>
    </div>
    <div class="text-center">
      <button
        id="startChatButton"
        class="btn btn-primary"
        type="button"
        v-on:click="startChat"
      >
        Send melding
      </button>
      <button
        id="makeRequest"
        class="btn btn-primary"
        type="button"
        v-on:click="makeRequest"
      >
        Forespør lån
      </button><br>
      <div id="time" class="text-center" v-if="showRequestDetails">
        Tidsperiode:
        <Datepicker v-model="date" range :min-date='new Date()' :disabledDates="disable"/>
        <button
          id="sendRequest"
          class="btn btn-primary"
          type="button"
          v-on:click="sendRequest"
          :disabled="!date"
        >
          Send forespørselen
        </button>
      </div>
    </div>
    <div class="text-center">
      <div id="lenderHeader">
        <label class="form-label"> Utlåner: </label>
      </div>
      <div id="lenderDetails">
        <label id="lenderName" class="form-label" v-on:click="seeLenderDetails">
          {{ lender.firstName }} {{ lender.lastName }}<br />
        </label>
        <i
          class="fas fa-check-circle"
          v-if="lender.verified"
          style="color: var(--bs-blue); padding: 0.5vw"
        ></i>
      </div>
      <div class="text-center">
        <label> Vis tidligere anmeldelser for gjenstanden </label>
        <i class="material-icons" v-if="showRightArrow" v-on:click="dropDown"
          >keyboard_arrow_left</i
        ><i class="material-icons" v-on:click="dropDown" v-if="!showRightArrow"
          >keyboard_arrow_down</i
        >
      </div>
      <div id="review" v-for="review in reviews" :key="review">
        <div class="earlierReviews" v-if="!showRightArrow">
          {{ review.rating }} / 10 <i class="fas fa-star" style="color: rgb(255,214,70);"></i><br>
          {{review.firstName }} {{review.lastName}}<br>
          {{ review.description}}
        </div>
      </div>
    </div>
    <div id="distance" class="text-center">
      <label class="form-label">
        Avstand : {{ ad.distance }} km fra din posisjon&nbsp;
      </label>
    </div>
    <div id="address" class="text-center">
      <label class="form-label"> Adresse : {{ ad.streetAddress }}&nbsp; </label>
    </div>
      <ol-map
        :loadTilesWhileAnimating="true"
        :loadTilesWhileInteracting="true"
        style="height: 40vh; padding-bottom: 7vh"
      >
        <ol-view
          ref="view"
          :center="[ad.lat, ad.lng]"
          :rotation="rotation"
          :zoom="zoom"
          :projection="projection"
        />

        <ol-tile-layer>
          <ol-source-osm />
        </ol-tile-layer>

        <ol-vector-layer>
          <ol-source-vector>
            <ol-feature>
              <ol-geom-point
                :coordinates="[ad.lat, ad.lng]"
              ></ol-geom-point>
              <ol-style>
                <ol-style-stroke :width="strokeWidth"></ol-style-stroke>
                <ol-style-icon :src="mapIcon" :scale="0.1"></ol-style-icon>
              </ol-style>
            </ol-feature>
          </ol-source-vector>
        </ol-vector-layer>
      </ol-map>
    </div>
</template>

<script>
import { ref } from "vue";
import mapIcon from "@/assets/img/mapIcon.png";
import Datepicker from "@vuepic/vue-datepicker";
import adService from "@/services/adService";
import reviewService from "@/services/reviewService";
import userService from "@/services/userService";
import rentalService from "@/services/rentalService";
import chatService from "@/services/chatService";
import moment from 'moment';

export default {
  inject : ["GStore"],
  components: { Datepicker },
  name: "DetailedAd",
  data() {
    return {
      date: null,
      showRightArrow: true,
      requestStartDate: "",
      requestEndDate: "",
      showRequestDetails: false,
      reviews: [],
      disable: [new Date()],
      ad: {

      },
      lender: {
      },
    };
  },
  async created() {
    await this.getCurrentAd();
    await this.setLender();
    await this.getReviews();
    await this.getUnavailableDates();
    this.setLenderId();
  },
  setup() {
    const projection = ref("EPSG:4326");
    const zoom = ref(8);
    const rotation = ref(0);
    const strokeWidth = ref(10);
    return {
      projection,
      zoom,
      rotation,
      strokeWidth,
      mapIcon
    };
  },
  methods: {
    async getCurrentAd(){
      await adService.getAdById(this.$store.getters.currentAd.id).then(response => {
        this.ad = response.data;
      }).catch(error => {
        console.log(error);
        this.GStore.flashMessage = "Fikk ikke hentet ut annonsen"
        this.GStore.variant = "Error"
        setTimeout(() => {
          this.GStore.flashMessage = ""
        }, 4000)
      })
      this.getDurationTypeToNorwegian()
    },
    getDurationTypeToNorwegian(){
      if (this.ad.durationType == 'MONTH'){
        this.ad.durationType = "måned"
      }else if (this.ad.durationType == 'DAY'){
        this.ad.durationType = "dag"
      }else if (this.ad.durationType == 'HOUR'){
        this.ad.durationType = "time"
      }else if (this.ad.durationType == 'WEEK'){
        this.ad.durationType = "uke"
      }
    },
    async getReviews(){
      await reviewService.getAllReviewsForAd(this.$store.getters.currentAd.id).then(response => {
        this.reviews = response.data;
        for(let i=0; i<response.data.length; i++){
          this.setNameOfUserLeftReview(response.data[i].userId, i)
        }
      }).catch(error => {
        console.log(error);
        this.GStore.flashMessage = "Fikk ikke hentet ut anmeldelsene"
        this.GStore.variant = "Error"
        setTimeout(() => {
          this.GStore.flashMessage = ""
        }, 4000)
      })
    },
    async setNameOfUserLeftReview(id, i){
      await userService.getUserById(id).then(response => {
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
    async getUnavailableDates(){
      await adService.getAllUnavailableDatesForAd(1).then(response => {
        console.log(response.data)
        this.disable = response.data;
      }).catch(error => {
        console.log(error);
        this.GStore.flashMessage = "Fikk ikke hentet utilgjengelige datoer for annonsen"
        this.GStore.variant = "Error"
        setTimeout(() => {
          this.GStore.flashMessage = ""
        }, 4000)
      })
    },
    async setLender(){
      await userService.getUserById(this.ad.userId).then(response => {
        this.lender = response.data
      }).catch(error => {
        console.log(error);
        this.GStore.flashMessage = "Fikk ikke hentet uttlåneren av annonsen"
        this.GStore.variant = "Error"
        setTimeout(() => {
          this.GStore.flashMessage = ""
        }, 4000)
      })
    },
    async startChat() {
      if (this.$store.getters.loggedIn) {
        var userId = localStorage.getItem("userId")
        if (userId != this.lender.id) {
          await chatService.createGroupChatWithTwoUsers(this.ad.title, userId, this.lender.id)
          this.$router.push("/messages")
        }else{
          alert('Cannot create chat with self')
        }
      } else {
        this.$router.push("/login")
      }      
    },
    makeRequest() {
      this.showRequestDetails = !this.showRequestDetails
    },
    /**
     * method to calculate the price of the rental depending on the durationType of price
     */
    calculatePrice(duration){
      if (this.ad.durationType == 'måned'){
        return duration/30 * this.ad.price
      }else if (this.ad.durationType == 'dag'){
        return duration*this.ad.price
      }else if (this.ad.durationType == 'time'){
        return duration*this.ad.price*24
      }else if (this.ad.durationType == 'uke'){
        return duration/7 * this.ad.price
      }
      this.showRequestDetails = !this.showRequestDetails;
    },
    async sendRequest(){
      const datefrom = moment(this.date[0]).format('YYYY-MM-DD')
      const dateto = moment(this.date[1]).format('YYYY-MM-DD')
      const diffTime = Math.abs(this.date[1] - this.date[0] + 1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const price = this.calculatePrice(diffDays)
      await rentalService.createRental(
          new Date().toLocaleDateString('en-CA'),
          datefrom,
          dateto,
          datefrom,
          price,
          this.lender.id,
          localStorage.getItem("userId"),
          this.$store.getters.currentAd.id
      ).then(response => {
        console.log(response)
        this.showRequestDetails = false;
        this.GStore.flashMessage = "Forespørsel om utlån opprette! Se detaljer på dine sider"
        this.GStore.variant = "Success"
        setTimeout(() => {
          this.GStore.flashMessage = ""
        }, 40000)
      }).catch(error => {
        console.log(error);
        this.GStore.flashMessage = "Fikk ikke oprettet forespørsel"
        this.GStore.variant = "Error"
        setTimeout(() => {
          this.GStore.flashMessage = ""
        }, 4000)
      })
    },
    dropDown() {
      if (this.showRightArrow) {
        this.showRightArrow = false;
      } else {
        this.showRightArrow = true;
      }
    },
    setLenderId(){
      localStorage.setItem("lenderId", this.ad.userId);
    },
    seeLenderDetails() {
      this.$router.push({
        name: "UserProfile",
      });
    },
  },
};
</script>

<style scoped>
.map {
  height: 400px;
  width: 100%;
}
  #adPictureDiv{
    padding: 10vw 10vw 0 10vw;
  }
  #adPicture{
    width: 250px;
    height: auto;
  }
  #adHeader{
    font-weight: bold;
    font-size: 22px;
  }
  button{
    padding: 4px;
    font-size: 14px;
  }
  #description{
    padding: 0px 10px 0px 10px;
  }
  #descriptionLabel{
    font-size: 12px;
    font-style: italic;
  }
  i{
    color: blue;
    padding: 0.5vw;
  }
  #lenderDetails{
    height: 4vh;
  }
  #lenderName, #lenderNumberLabel{
    font-size: 12px;
    color: blue;
    text-decoration: underline;
    cursor: pointer;
  }
  #lenderNumber{
    height: 5vh;
  }
  #lenderHeader{
    height: 2vh;
  }
  #distance{
    padding: 0px 10px 0px 10px;
  }
  #address{
    padding: 0px 5vw 0px 5vw;
  }
  img{
    width : 30vw;
  }
  button{
    margin: 5px;
  }
  #makeRequest{
    background-color: green;
  }
  .earlierReviews{
    border-style: solid;
    border-color: grey;
    width: 50%;
  }
  #review{
    display: grid;
    justify-items: center;
    font-size: 10px;
  }
  .material-icons{
    cursor: pointer;
  }
  #time{
    width: 30%;
  }
  #time{
    width: 100%;
    display: grid;
    justify-items: center;
  }

</style>