<template>
  <div class="container">
    <div class="d-flex justify-content-start align-items-center">
      <div class="align-items-center back-arrow-container" @click="back">
        <i class="fa fa-arrow-left"></i>
        <span class="mx-2">Tilbake</span>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <h2>Mine annonser</h2>
    </div>
    <div class="d-flex justify-content-center search-box-container-style">
      <div class="d-flex search-container">
        <input type="search" placeholder="Søk" class="w-100" />
        <button class="btn btn-primary btn-style" type="button">
          <i class="fa fa-search"></i>
        </button>
      </div>
    </div>
  </div>

  <div>

    <AdListComponent :ads="this.ads"/>
  </div>
</template>

<script>
import AdListComponent from "@/components/AdListComponent";
import lendingService from "@/services/lendingService";

export default {
  name: "MyAds",
  components: {
    AdListComponent,
  },
  created(){
    this.getMyAds()
  },
  data() {
    return {
      ads: [],
    };
  },
  methods: {
    getMyAds(){
      lendingService.getAllAdsForUser(JSON.parse(localStorage.getItem("userId")))
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          //få poststed
          let ad = {
            id: response.data[i].adId,
            title: response.data[i].title,
            img: "ski.jpg",
            place: response.data[i].postalCode.toString(),
            price: response.data[i].price
          }
          this.ads.push(ad)
        }
      })
    },
    back() {
      this.$router.go(-1)
    }
  }
};
</script>

<style scoped>
.search-box-container-style {
  margin-bottom: 20px;
}

.btn-style {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  width: 80px;
}

.categories-card-container-style {
  padding: 10px;
}

@media (min-width: 992px) {
  .search-container {
    width: 50%;
  }
}

@media (max-width: 991px) {
  .search-container {
    width: 80%;
  }
}

.back-arrow-container {
  cursor: pointer;
}
</style>
