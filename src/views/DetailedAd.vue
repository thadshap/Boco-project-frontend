<template>
  <div class="container main-container">
    <div class="text-center">
      <label id="adHeader" class="form-label">{{ ad.title }}</label>
    </div>
    <div
      id="adPictureDiv"
      class="text-center"
    >

    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="images-wrapper">
            <img :src="pictures[pictureIndex]" style="width:60vh; height:auto" alt="Bilde av gjenstand.">
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" v-if="showArrows" v-on:click="nextImage" href="#carouselExampleControls" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" v-if="showArrows" v-on:click="prevImage" href="#carouselExampleControls" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>


    </div>
    <div class="text-center pt-2">
      <label class="form-label">
        <label class="defined-label">Leiepris</label> : {{ ad.price }} kr pr/{{ ad.durationType }}
      </label>
    </div>
    <div class="d-flex justify-content-center w-100">
    <div id="description" class="text-center">
      <label id="descriptionLabel" class="form-label">
        {{ ad.description }}
      </label>
    </div>
    </div>
    <div class="text-center mb-4" v-if="!usersOwnAddress">
      <button
        id="startChatButton"
        class="btn btn-primary"
        type="button"
        v-on:click="startChat"
        :disabled="!this.userLoggedIn"
      >
        Send melding
      </button>
      <button
        id="makeRequest"
        class="btn btn-primary"
        type="button"
        v-on:click="makeRequest"
        :disabled="!this.userLoggedIn"
      >
        Forespør lån
      </button><br>
      <div id="time" class="text-center mt-3" v-if="showRequestDetails">
        <label class="defined-label">Tidsperiode </label>
        <div class="date-container">
        <Datepicker class="date-input" v-model="date" range :min-date='new Date()' :disabledDates="disable"/>
        <button
          id="sendRequest"
          class="btn btn-primary"
          type="button"
          v-on:click="sendRequest"
          :disabled="!date"
        >
          Forespør
        </button>
        </div>
      </div>
    </div>
    <div class="text-center">
      <div id="lenderHeader">
        <label class="form-label defined-label" v-if="showRequestDetails"> Utlåner </label>
      </div>
      <div id="lenderDetails" v-if="showRequestDetails">
        <label id="lenderName" class="form-label" v-on:click="seeLenderDetails">
           {{ lender.firstName }} {{ lender.lastName }}<br />
        </label>
        <i
          class="fas fa-check-circle float-end pt-1"
          v-if="lender.verified"
          style="color: var(--bs-blue); font-size: 1.8vh;"
        ></i>
      </div>
      <div class="text-center mt-3 mb-3">
        <label> Vis tidligere anmeldelser for gjenstanden </label>
        <i class="material-icons" v-if="showRightArrow" v-on:click="dropDown"
          >keyboard_arrow_left</i
        ><i class="material-icons" v-on:click="dropDown" v-if="!showRightArrow"
          >keyboard_arrow_down</i
        >
      </div>
      <div id="review" v-for="review in reviews" :key="review">
        <div class="earlierReviews" v-if="!showRightArrow">
          {{ review.rating }} / 10 <i class="fas fa-star" style="color: rgb(255,214,70); font-size:1.6vh;"></i><br>
          {{review.firstName }} {{review.lastName}}<br>
          {{ review.description}}
          <hr>
        </div>
      </div>
    </div>
    <div id="distance" class="text-center mt-4" v-if="showRequestDetails">
      <label class="form-label">
        <label class="defined-label">Avstand</label>  : {{ ad.distance }} km fra din posisjon&nbsp;
      </label>
    </div>
    <div id="address" class="text-center">
      <label class="form-label"> <label class="defined-label">Adresse</label> : {{ ad.streetAddress }}&nbsp; </label>
    </div>
      <ol-map
        :loadTilesWhileAnimating="true"
        :loadTilesWhileInteracting="true"
        style="height: 40vh; padding-bottom: 7vh"
        v-if="showRequestDetails"
      >
        <ol-view
          ref="view"
          :center="coordinate"
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
                :coordinates="coordinate"
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
  props:{
    lat: {type: String},
    lng: {type: String}
  },
  data() {
    return {
      showArrows: true,
      usersOwnAddress: false,
      userLoggedIn: false,
      date: null,
      showRightArrow: true,
      requestStartDate: "",
      requestEndDate: "",
      showRequestDetails: false,
      userEmail: "",
      reviews: [],
      pictureIndex:0,
      disable: [new Date()],
      pictures: [],
      ad: {},
      lender: {},
    };
  },
  async created() {
    await this.checkLoggedIn()
    await this.getCurrentAd();
    await this.setLender();
    await this.getReviews();
    await this.getUnavailableDates();
    await this.getAdPictures();
    this.setLenderId();
    if(this.ad.userId == localStorage.getItem('userId')){
      this.usersOwnAddress = true;
    }
  },
  setup(props) {
    console.log(props)
    console.log(parseFloat(props.lat))
    console.log(parseFloat(props.lng))
    const projection = ref("EPSG:4326")
    const zoom = ref(8)
    const rotation = ref(0)
    const strokeWidth = ref(10)
    const coordinate = [parseFloat(props.lng), parseFloat(props.lat)]
    return {
      projection,
      zoom,
      rotation,
      strokeWidth,
      mapIcon,
      coordinate
    };
  },
  methods: {
    async getCurrentAd(){
      await adService.getAdById(this.$store.getters.currentAd.id).then(response => {
        this.ad = response.data
      }).catch(error => {
        console.log(error)
        this.GStore.flashMessage = "Fikk ikke hentet ut annonsen"
        this.GStore.variant = "Error"
        setTimeout(() => {
          this.GStore.flashMessage = ""
        }, 4000)
      })
      this.getDurationTypeToNorwegian()
    },
    checkLoggedIn() {
      if(localStorage.getItem('token') || this.$store.getters.loggedIn) {
        this.userLoggedIn = true
      } else {
        this.userLoggedIn = false
      }
    },
    nextImage(){
      if(this.pictureIndex==this.pictures.length-1){
        this.pictureIndex=0;
      }else{
        this.pictureIndex++
      }
    },
    prevImage(){
      if(this.pictureIndex==0){
        this.pictureIndex=this.pictures.length-1;
      }else{
        this.pictureIndex--
      }
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
        this.GStore.flashMessage = "Fikk ikke hentet utlåneren av annonsen"
        this.GStore.variant = "Error"
        setTimeout(() => {
          this.GStore.flashMessage = ""
        }, 4000)
      })
      let userId = localStorage.getItem("userId")
      console.log(userId)
      console.log(this.lender.id)
      if (userId != this.lender.id) {
        this.ad.distance = this.$store.getters.currentAd.distance.toFixed(2)
      }
    },
    async startChat() {
      if (this.$store.getters.loggedIn) {
        let userId = localStorage.getItem("userId")
        if (userId != this.lender.id) {
          let groupId
          let users = [userId,this.lender.id]
          await chatService.createGroupChat(this.ad.title, users)
          .then(response => {
            groupId = response.data.groupId
          })
          .catch(error =>{
            console.log(error)
          })
          this.$store.dispatch("setGroupId", groupId)
          this.$store.dispatch("setGroupName", this.ad.title)
          await this.$router.push(`/chat/${groupId}`)
        }else{
          alert('Cannot create chat with self')
        }
      } else {
        await this.$router.push("/login")
      }
    },
    makeRequest() {
      this.showRequestDetails = !this.showRequestDetails
    },
    /**
     * method to calculate the price of the rental depending on the durationType of price
     */
    calculatePrice(duration){
      if (this.ad.durationType === 'måned'){
        return duration/30 * this.ad.price
      }else if (this.ad.durationType === 'dag'){
        return duration*this.ad.price
      }else if (this.ad.durationType === 'time'){
        return duration*this.ad.price*24
      }else if (this.ad.durationType === 'uke'){
        return duration/7 * this.ad.price
      }
      this.showRequestDetails = !this.showRequestDetails;
    },
    async getUserEmail(){
      await userService.getUserById(localStorage.getItem("userId"),).then(response => {
        this.userEmail = response.data.email
      }).catch(error => {
        console.log(error);
        this.GStore.flashMessage = "Fikk ikke hentet emailen din"
        this.GStore.variant = "Error"
        setTimeout(() => {
          this.GStore.flashMessage = ""
        }, 4000)
      })
    },
    async sendRequest(){
      await this.getUserEmail()
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
          Math.round(price),
          this.lender.email,
          this.userEmail,
          this.$store.getters.currentAd.id
      ).then(response => {
        console.log(response)
        this.showRequestDetails = false;
        this.GStore.flashMessage = "Forespørsel om utlån opprettet! Se detaljer på dine sider"
        this.GStore.variant = "Success"
        setTimeout(() => {
          this.GStore.flashMessage = ""
        }, 4000)
        this.$router.push("/")
      }).catch(error => {
        console.log(error);
        this.GStore.flashMessage = "Fikk ikke opprettet forespørsel"
        this.GStore.variant = "Error"
        setTimeout(() => {
          this.GStore.flashMessage = ""
        }, 4000)
      })
    },
    dropDown() {
      this.showRightArrow = !this.showRightArrow;
    },
    setLenderId(){
      localStorage.setItem("lenderId", this.ad.userId);
    },
    seeLenderDetails() {
      this.$router.push({
        name: "UserProfile",
      });
    },
    getAdPictures() {
      adService
        .getPicturesForAd(this.$store.getters.currentAd.id)
        .then(response => {
          for(let i = 0; i < response.data.length; i++) {
            this.pictures.push(`data:${response.data[i].type};base64,${response.data[i].base64}`)
          }
          if(this.pictures.length<2){
            this.showArrows = false;
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
};
</script>

<style scoped>
.main-container{
  font-size: 2.3vh;
  overflow: auto;
  object-fit: cover;
}
.map {
  height: 400px;
  width: 100%;
}
#adPictureDiv{
  padding: 0 10vw 0 10vw;
}
#adPicture{
  width: 250px;
  height: auto;
}
#adHeader{
  font-weight: bold;
  font-size: 4vh;
  color: #015d9a;
}
button{
  padding: 4px;
  font-size: 1.8vh;
}
#description{
  padding: 20px;
  background-color: rgb(230,247,255);
  margin: 10px 0 20px 0;
  font-size: 1.7vh;
  font-style: italic;
  border-radius: 5px;
  width: 700px;
}
  #descriptionLabel{
    font-size: 1.5vh;
    font-style: italic;
  }

  #lenderName, #lenderNumberLabel{
    font-size: 1.8vh;
    color: blue;
    text-decoration: underline;
    cursor: pointer;
    padding-right: 5px;
  }
  #lenderNumber{
    height: 5vh;
  }
  #distance{
    padding: 0px 10px 0px 10px;
  }
  #address{
    padding: 0px 5vw 0px 5vw;
  }
  img{
    height : 300px;
  }
  button{
    margin: 0 10px 0 10px;
    padding: 5px 9px 5px 9px;
  }
  #makeRequest{
    background-color: green;
  }
  .earlierReviews{
    width: 50%;
  }
  #review{
    display: grid;
    justify-items: center;
    font-size: 1.4vh;
  }
  .material-icons{
    cursor: pointer;
    color: #0EA0FF;
    padding: 0.2vw 0.5vw 0 0.5vw;
    position: absolute;
    font-size: 30px;
  }
  #time{
    width: 100%;
    display: grid;
    justify-items: center;
  }
  .cards-wrapper {
  display: flex;
  justify-content: center;
}
.carousel-control-prev,
.carousel-control-next {
  background-color: #e1e1e1;
  width: 5vh;
  height: 5vh;
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
}

  hr{
    margin: 5px;
    background-color: #0EA0FF;
  }
  .defined-label{
    font-weight: bold;
    color: #015d9a;
  }
  .date-container{
    display: inline-flex;
  }
.date-input{
    width: 345px;
  }
#lenderDetails{
  display: inline-flex;
}
</style>