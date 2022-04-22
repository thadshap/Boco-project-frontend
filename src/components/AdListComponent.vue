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
// import axios from "axios"

export default {
  name: "AdListComponent",
  components: {
    AdComponent,
  },
  data() {
    return{
        ads: []
    };
  },
  // methods: {
  //   async mounted() {
  //     await this.getAds();
  //   },
  //   async getAds(){
  //       console.log("hei")
  //       //denne må endres utifra props som spør om ulike ads
  //       let adSpecification=""
  //       let url= "http://localhost:8080/getads/ellernoe"+adSpecification
  //
  //       //må fikse jwttoken etter det er klart på login
  //       let user = JSON.parse(window.localStorage.getItem("currentUser"))
  //       let jwtToken = user.jwtResponse.jwtToken
  //       console.log(jwtToken)
  //
  //       await axios
  //           .get( url, {
  //             headers:{
  //               Authorization: "Bearer" + " " + this.$store.getters.token,
  //             },
  //           })
  //           .then(response => {
  //             this.ads = response.data
  //           })
  //     },
  //   }

};
</script>

<style scoped>

</style>
