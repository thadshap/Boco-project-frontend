<template>
  <div class="project-card-container">
    <div class="project-card d-flex justify-content-center">
      <div class="ad-img-container-style d-flex align-items-center justify-content-center">
        <img :src="getImgUrl(image)" class="ad-img-style rounded-top rounded-bottom"/>
      </div>
      <div class="d-flex flex-column ad-details-container-style">
        <div class="d-flex flex-column align-items-start">
          <h3 class="ad-heading-style" style="margin-bottom: 10px;">
            <b> Tittel {{ title }}</b>
          </h3>
          <h4>Eier: {{ owner }} kr</h4>
          <h4>Låner: {{ borrower }} </h4>
          <h4>Leie fra: {{ price }} </h4>
          <h4>Leie til: {{ price }} </h4>
          <h4>Total pris: {{ price }} kr</h4>
          <h4>Aktiv: {{ active }} kr</h4>
          <h5 class="opacity-75"> {{ place }}</h5>
        </div>
        <div class="d-flex flex-column justify-content-between" :class="'align-items-end, h-100'">
          <a v-on:click="goToDetailedRentalView" class="btn btn-outline-primary btn-sm rounded-pill my-3 mw-100" role="button" v-if="this.$store.getters.loggedIn">
            <i class="fa fa-envelope" style="margin-right: 5px;"></i>
            Rediger lån
          </a>
          <a v-on:click="goToDetailedView" class="btn btn-outline-primary btn-sm rounded-pill mw-100" role="button">
            <i class="fa fa-arrow-circle-right" style="margin-right: 5px;"></i>
            Til annonse
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      borrower: {
        type: Number,
        required: true,
      },
      owner: {
        type: Number,
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
},
methods: {
  getImgUrl(img) {
    return require("../assets/img/" + img);
  },
  goToDetailedView(){
    console.log(this.$props.adId);
    this.$router.push({
      path: "/ad/:id",
      name : "Ad",
      params : {
        id : this.$props.adId
      }
    })
  },
  goToDetailedRentalView(){
    console.log(this.$props.id);
    this.$router.push({
      path: "/rental/:id",
      name : "Rental",
      params : {
        id : this.$props.id
      }
    })
  },
}
};
</script>

<style scoped>

</style>
