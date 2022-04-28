<template>
  <div class="project-card-container">
    <div class="project-card d-flex justify-content-center">
      <div class="ad-img-container-style d-flex align-items-center justify-content-center">
<!--        <img :src="getImgUrl(image)" class="ad-img-style rounded-top rounded-bottom"/>-->
      </div>
      <div class="d-flex flex-column ad-details-container-style">
        <div class="d-flex flex-column align-items-start">
          <h3 class="ad-heading-style" style="margin-bottom: 10px;">
            <b> Tittel {{ title }}</b>
          </h3>
          <h4>Eier: {{ ownerName }}</h4>
          <h4>Låner: {{ borrowerName }}</h4>
          <h4>Leie fra: {{ price }}</h4>
          <h4>Leie til: {{ price }}</h4>
          <h4>Total pris: {{ price }} kr</h4>
          <h4>Aktiv: {{ active }} </h4>
        </div>
        <div class="d-flex flex-column justify-content-between" :class="'align-items-end, h-100'">
          <a v-on:click="goToDetailedRentalView" class="btn btn-outline-primary btn-sm rounded-pill my-3 mw-100" role="button" >
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
import lendingService from "@/services/lendingService";

export default {
  name: "Rental",
  data(){
    return {
      ownerName: "",
      borrowerName: ""
    }
  },
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
    // localStorage.setItem("currentAd",)
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
},
  created() {
    lendingService.getUserById(this.borrower)
        .then(response => {
          this.borrowerName = response.data.firstName + " " + response.data.lastName
          console.log(response.data)
          console.log(response.status)
          console.log(this.ownerName)
          if(response.status!==200){
            //legg til nettverksfeil tilbakemelding
            alert("fikk ikke kontakt med backend")
            return
          }
          // alert(response.data)
          // this.$router.push("/login")
        })
        .catch(function (error) {
          console.log(error);
        });
    lendingService.getUserById(this.owner)
        .then(response => {
          this.ownerName = response.data.firstName + " " + response.data.lastName
          console.log(response.data)
          console.log(response.status)
          console.log(this.ownerName)
          if(response.status!==200){
            //legg til nettverksfeil tilbakemelding
            alert("fikk ikke kontakt med backend")
            return
          }
          // alert(response.data)
          // this.$router.push("/login")
        })
        .catch(function (error) {
          console.log(error);
        });
  }
};
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
    /*display: flex;*/
    /*justify-content: center;*/
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
</style>