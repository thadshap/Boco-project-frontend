<template>
  <main class="page projets-page">
    <section class="portfolio-block project-no-images">
      <div class="container">
        <div class="d-flex flex-row flex-wrap">

          <AdComponent
            v-for="ad in ads"
            :key="ad"
            :title="ad.title"
            :image="ad.img"
            :place="ad.place"
            :price="ad.price"
          />

        </div>
      </div>
    </section>
  </main>
</template>

<script>
import AdComponent from "@/components/AdComponent";
import axios from "axios"

export default {
  name: "AdListComponent",
  components: {
    AdComponent
  },
  data() {
    return{
        ads: [
          {
            title: "Ski",
            img: "ski.jpg",
            place: "Trondheim",
            price: 200
          },
          {
            title: "Space",
            img: "space.jpg",
            place: "Tromsø",
            price: 100
          },
          {
            title: "Spaceman",
            img: "spaceman.jpg",
            place: "Kristiansand",
            price: 300
          },
          {
            title: "Ski",
            img: "ski.jpg",
            place: "Molde",
            price: 400
          },
          {
            title: "Ski",
            img: "ski.jpg",
            place: "Oslo",
            price: 500
          },
        ]
    };
  },

  props: {
    myAds:{
      type:Boolean,
      required:true,
    },
    loanedAds:{
      type:Boolean,
      required:true,
    }
  },

  methods: {
    async mounted() {
      this.setAdSpecification()
      await this.getAds()
    },
    setAdSpecification(){


      if(this.myAds){
        this.adSpecification = "myAds"
      }
      else if(this.loanedAds){
        this.adSpecification = "loanedAds"
      }
      else{
        this.adSpecification = "allAds"
      }

    },
    async getAds(){

        let url = "http://localhost:8081/getads/ellernoe"+this.adSpecification

        let jwtToken = JSON.parse(window.localStorage.getItem("token"))

        await axios
            .get( url, {
              headers:{
                Authorization: "Bearer" + " " + jwtToken,
              },
            })
            .then(response => {
              this.ads = response.data
            })
      },
    }

};
</script>

<style scoped></style>
