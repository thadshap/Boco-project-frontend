<template>
  <div class="container">
    <div id="adPictureDiv" class="text-center" v-for="picture in pictures" :key="picture">
      <img id="adPicture" src=mapIcon alt="Bilde av gjenstanden som blir utlånt">
    </div>
    <div class="text-center">
      <label id="adHeader" class="form-label">Stekeovn{{ headerText }}</label>
    </div>
    <div class="text-center">
      <label class="form-label">Leiepris : 10{{rentalPrice}} kr pr/dag{{unitPeriod}}</label>
    </div>
    <div id="description" class="text-center">
      <label id="descriptionLabel" class="form-label">
        {{ description }} Veldig fin til å bake
      </label>
    </div>
    <div class="text-center">
      <button id="startChatButton" class="btn btn-primary" type="button" v-on:click="startChat">
        Send melding
      </button>
      <button id="makeRequest" class="btn btn-primary" type="button" v-on:click="makeRequest">
        Forespør lån
      </button><br>
      <div id="time" class="text-center" v-if="showRequestDetails">
      Tidsperiode:
        <Datepicker v-model="date" range />


      <button id="sendRequest" class="btn btn-primary" type="button" v-on:click="sendRequest">
        Send forespørselen
      </button>
      </div>
    </div>
    <div class="text-center">
      <div id="lenderHeader">
        <label class="form-label">
          Utlåner:
        </label>
      </div>
      <div id="lenderDetails">
        <label id="lenderName" class="form-label">
          {{ lender.name}} Kari Jahnsen<br>
        </label>
        <i class="fas fa-check-circle" v-if="trustedUser" style="color: var(--bs-blue);padding: 0.5vw;"></i>
      </div>
      <div id="lenderNumber">
        <label id="lenderNumberLabel" class="form-label">
          tlf : 444444 444{{ lender.number}}<br>
        </label>
      </div>
      <div class="text-center">
        <label >
          Vis tidligere anmeldelser for gjenstanden
        </label>
        <i class="material-icons" v-if="showRightArrow" v-on:click="dropDown">keyboard_arrow_left</i><i class="material-icons" v-on:click="dropDown" v-if="!showRightArrow">keyboard_arrow_down</i>
      </div>
      <div id="review" v-for="review in reviews" :key="review">
        <div id="earlierReviews" v-if="!showRightArrow">
        {{review.name}}<br>
        {{review.rating}}
        {{review.message}}
        </div>
      </div>
    </div>
    <div id="distance" class="text-center">
      <label class="form-label">
        Avstand : {{ distance}}10 km fra din posisjon&nbsp;
      </label>
    </div>
    <div id ="address" class="text-center">
      <label class="form-label">
        Adresse : {{ address }}&nbsp;
      </label>
    </div>
    <div class="text-center" style="padding: 0px;">
      <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height:40vh;padding-bottom: 7vh;">

        <ol-view ref="view" :center="[latitudeForItem, longitudeForItem]" :rotation="rotation" :zoom="zoom" :projection="projection" />

        <ol-tile-layer>
          <ol-source-osm />
        </ol-tile-layer>

        <ol-vector-layer>
          <ol-source-vector>
            <ol-feature>
              <ol-geom-point :coordinates="[latitudeForItem, longitudeForItem]"></ol-geom-point>
              <ol-style>
                  <ol-style-stroke :width="strokeWidth"></ol-style-stroke>
                <ol-style-icon :src="mapIcon" :scale="0.1"></ol-style-icon>
              </ol-style>
            </ol-feature>
          </ol-source-vector>
        </ol-vector-layer>

      </ol-map>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import mapIcon from '@/assets/img/mapIcon.png'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  components: { Datepicker },
  name: "DetailedAd",
  data() {
    return {
      date : null,
      reviews : [{ name : 'per persen', rating : '5/10', message : 'Veldig fin, litt upraktisk, men ellers kjempe fin jeg liker veldig veldig godt'}],
      showRightArrow : true,
      trustedUser : true,
      requestStartDate : '',
      requestEndDate : '',
      showRequestDetails : false,
      headerText : '',
      rentalPrice : null,
      unitPeriod : '',
      description : '',
      lender : {
        name : '',
        number: null,
      },
      distance : null,
      address : '',
      pictures : [],
      latitudeForItem: 10,
      longitudeForItem:64
    };
  },
  setup(){
    const projection = ref('EPSG:4326')
    const zoom = ref(8)
    const rotation = ref(0)
    const strokeWidth = ref(10)
    return {
      projection,
      zoom,
      rotation,
      strokeWidth,
      mapIcon
    }
  },
  methods : {
    startChat (){

    },
    makeRequest (){
      if(this.showRequestDetails){
        this.showRequestDetails = false;
      } else {
        this.showRequestDetails = true;
      }
    },
    sendRequest (){

    },
    dropDown (){
      if(this.showRightArrow){
        this.showRightArrow = false;
      } else {
        this.showRightArrow = true;
      }
    }
  }
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
  #earlierReviews{
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