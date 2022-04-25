<template>
  <div class="d-flex justify-content-center align-items-center">
    <div
      class="d-flex flex-row justify-content-start align-items-center flex-wrap mx-auto w-100"
    >
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
</template>

<script>
import AdComponent from "@/components/AdComponent";
import axios from "axios"

export default {
  name: "AdListComponent",
  components: {
    AdComponent,
  },
  data() {
    return{
        ads: [],
        adSpecification:{
          type:String
        }
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
