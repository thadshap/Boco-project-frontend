<template>
  <div class="container main-container">
    <div class="text-center">
      <label id="adHeader" class="form-label">{{ ad.title }}</label>
    </div>
    <div
      id="adPictureDiv"
      class="text-center"
    >
      <img v-for="picture in pictures" :src="picture" :key="picture">
    </div>
    <div class="text-center">
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
        <label class="form-label defined-label"> Utlåner </label>
      </div>
      <div id="lenderDetails">
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
    <div id="distance" class="text-center mt-4">
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
      usersOwnAddress: false,
      userLoggedIn: false,
      date: null,
      showRightArrow: true,
      requestStartDate: "",
      requestEndDate: "",
      showRequestDetails: false,
      userEmail: "",
      reviews: [],
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
  setup() {
    const projection = ref("EPSG:4326")
    const zoom = ref(8)
    const rotation = ref(0)
    const strokeWidth = ref(10)
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
      this.ad.distance = this.$store.getters.currentAd.distance.toFixed(2)
    },
    checkLoggedIn() {
      if(localStorage.getItem('token') || this.$store.getters.loggedIn) {
        this.userLoggedIn = true
      } else {
        this.userLoggedIn = false
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
          var groupId
          var users = [userId,this.lender.id]
          await chatService.createGroupChat(this.ad.title, users)
          .then(response => {
            groupId = response.data.groupId
          })
          .catch(error =>{
            console.log(error)
          })
          this.$store.dispatch("setGroupId", groupId)
          this.$store.dispatch("setGroupName", this.ad.title)
          this.$router.push(`/chat/${groupId}`)
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
    getAdPictures() {
      adService
        .getPicturesForAd(this.$store.getters.currentAd.id)
        .then(response => {
          for(let i = 0; i < response.data.length; i++) {
            this.pictures.push(`data:${response.data[i].type};base64,${response.data[i].base64}`)
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