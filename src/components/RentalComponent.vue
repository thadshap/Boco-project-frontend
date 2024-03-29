<template>
  <div class="project-card-container">
    <div class="project-card d-flex justify-content-center">
      <div class="d-flex flex-column ad-details-container-style w-100">
        <div class="d-flex flex-column align-items-start w-100">
          <h3 class="ad-heading-style w-100" style="margin-bottom: 10px;">
            <b> {{ title }}</b>
          </h3>
          <div style="border: solid rgba(1, 87, 103, 0.4);background-color: rgba(70, 156, 175, 0.2); width: 100%">
          <p class="pt-1">Eier: {{ owner }}</p>
          <p>Låner: {{ borrower }}</p>
          <p>Leie fra: {{ rentFrom }}</p>
          <p>Leie til: {{ rentTo }}</p>
          <p>Total pris: {{ price }} kr</p>
          </div>
          <div id="review" v-if="showReviewBox" class="w-100 mt-2 mb-2 p-2" style="display:table-column;">
            <h5 class="mb-0">Legg igjen en anmeldelse av dette lånet!</h5>
            <hr class="mt-0">
            <p class="d-flex justify-content-between">Din beskrivelse av leieforholdet: <input type="text" maxlength="120" v-model="description"></p>
            <p class="d-flex justify-content-between">Din rating av leieforholdet på en skala fra 1-10: <input type="number" min="1" max="10" v-model="rating" v-on:change="enableSendRequestButton=true"></p>

            <a v-if="this.enableSendRequestButton" v-on:click="sendReview" class="btn btn-outline-primary btn-sm rounded-pill my-3 mw-100" role="button" >
              Send tilbakemelding
            </a>
          </div>
        </div>
        <div class="d-flex flex-column justify-content-between" :class="'align-items-end, h-100'">
          <a id="goToDetailedRentalView" v-if="active" v-on:click="goToDetailedRentalView" class="btn btn-outline-primary btn-sm rounded-pill my-3 mw-100" role="button" >
            <i class="fa fa-envelope" style="margin-right: 5px;"></i>
            Rediger lån (Kommer snart)
          </a>
          <a id="goToDetailedView" v-on:click="goToDetailedView" class="btn btn-outline-primary btn-sm rounded-pill mw-100" role="button">
            <i class="fa fa-arrow-circle-right" style="margin-right: 5px;"></i>
            Til annonse
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rentalService from "@/services/rentalService";
import adService from "@/services/adService";
export default {
  inject : ["GStore"],
  name: "Rental",
  props: {
    id: {
      type: Number,
      required: true,
    },
    adId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    borrower: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    deadline: {
      type: String,
    },
    rentTo: {
      type: String,
    },
    rentFrom: {
      type: String,
    },
    dateOfRental: {
      type: String,
    },
    reviewed: {
      type: Boolean,
    }
  },
  data() {
    return {
      showReviewBox : false,
      rating : 0,
      description : "",
      enableSendRequestButton : false,
      ownerId : null,
      userId: null
    };
  },
  created() {
    this.checkIfReviewBoxShouldEnable()
  },
  methods: {
    async sendReview() {
      await rentalService.deleteRental(this.$props.id, this.description, this.rating).then(response => {
        console.log(response)
        this.showReviewBox = false
        this.GStore.flashMessage = "Tilbakemelding opprettet!"
        this.GStore.variant = "Success"
        setTimeout(() => {
          this.GStore.flashMessage = ""
        }, 4000)
      }).catch(error => {
        console.log(error)
        this.GStore.flashMessage = "Tilbakemelding ikke mulig å opprette"
        this.GStore.variant = "Success"
        setTimeout(() => {
          this.GStore.flashMessage = ""
        }, 4000)
      })
    },
    async checkIfReviewBoxShouldEnable(){
      await this.getOwnerId()
      if( (!this.active) &&
          (this.rentTo < new Date().toLocaleDateString('en-CA')) &&
          (this.userId != this.ownerId) &&
          (!this.reviewed)){
        this.showReviewBox = true
      }
    },
    async getOwnerId(){
      this.userId = localStorage.getItem("userId")
      await adService.getAdById(this.$props.adId).then(response => {
        this.ownerId = response.data.userId
      }).catch(error => {
        console.log(error)
      })
    },
    goToDetailedView() {
      const rental = {
        id: this.$props.adId
      };
      this.$store.dispatch("setCurrentAd", rental)
      this.$router.push({
        path: "/ad/:id",
        name: "Ad",
        params: {
          id: this.$props.adId
        }
      })
    },
    goToDetailedRentalView() {
      this.$router.push({
        path: "/rental/:id",
        name: "Rental",
        params: {
          id: this.$props.id
        }
      })
    },
  },
}
</script>

<style scoped>
.project-card-container {
  padding: 20px;
}

.project-card {
  background-color: white;
  box-shadow: 0 2px 5px 0 #000000;
  border-top: 5px solid #0EA0FF;
  border-radius: 20px;
  padding: 20px;
  min-height: 100%;
}

.project-card:hover {
  cursor: pointer;
  box-shadow: 0 0 20px 5px #007FD1;
}

.ad-img-container-style {
  width: 100%;
}

.ad-img-style {
  object-fit: contain;
  max-width: 100%;
}

.ad-heading-style {
  font-size: 2.5em;
}

@media screen and (min-width: 992px) {
  .project-card-container {
    width: 50%;
  }
}

@media screen and (max-width: 992px) {
  .project-card-container {
    width: 100%;
  }

  .project-card {
    max-width: 100%;
  }
}

@media screen and (max-width: 576px) {
  .project-card {
    flex-flow: column;
  }

  .ad-details-container-style {
    padding: 0;
  }
}

@media screen and (min-width: 576px) {
  .ad-details-container-style {
    padding-left: 20px;
    width: 50%;
  }
}
#review{
  border : 2px #0EA0FF solid;
  padding: 3px;
  margin-bottom: 5px;
}
</style>
