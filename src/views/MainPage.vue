<template>
  <div class="container">
    <div class="d-flex justify-content-center search-box-container-style">
      <div class="d-flex search-container">
        <input type="search" placeholder="Søk" class="w-100" />
        <button class="btn btn-primary btn-style" type="button">
          <i class="fa fa-search"></i>
        </button>
      </div>
    </div>

    <div>
      <h3>Categories</h3>
      <div
        class="d-flex flex-row justify-content-center align-items-center flex-wrap categories-card-container-style"
      >
        <CategoryComponent
          v-for="category in categories"
          :key="category"
          :title="category.title"
          :icon="category.icon"
        />
      </div>
    </div>
    <div class="d-inline-flex d-sm-flex justify-content-sm-start">
      <div>
        <div>
          <button
              class="btn btn-primary"
              type="button"
              v-on:click="showSorting"
          >
            Sorter
          </button>
          <div style="text-align: left" v-if="showMenuBarSorting">
            <a id="lav-hoy" class="dropdown-item" v-on:click="sortingPicked($event)">laveste - høyeste pris</a
            ><a id="hoy-lav" class="dropdown-item" v-on:click="sortingPicked($event)">høyeste - laveste pris</a
          ><a id="ny-eld" class="dropdown-item" v-on:click="sortingPicked($event)">nyeste - eldste</a
          ><a id="eld-ny" class="dropdown-item" v-on:click="sortingPicked($event)">eldste- nyeste</a>
          </div>
        </div>
      </div>
      <div>
        <div class="dropdown">
          <button
              class="btn btn-primary"
              type="button"
              v-on:click="showFiltering"
          >
            Filtrer
          </button>
          <div style="text-align: left" v-if="showMenuBarFiltering">
            <a class="dropdown-item" href="#">Pris 0-{{priceRangeValue}}kr<br>
              <input
                class="form-range"
                type="range"
                min="0"
                max="1000"
                step="50"
                v-model="priceRangeValue"
            /></a
            ><a class="dropdown-item" href="#">Avstand 0-{{distanceRangeValue}} km<br>
            <input
                class="form-range"
                type="range"
                min="0"
                max="60"
                step="2"
                v-model="distanceRangeValue"
            />
          </a
          >
          </div>
        </div>
        </div>
      </div>
  <div>
    <h3>Newest items</h3>

    <AdListComponent v-bind:ads="this.ads"/>
  </div>
  </div>
</template>

<script>
import AdListComponent from "@/components/AdListComponent";
import CategoryComponent from "@/components/CategoryComponent";
import { geolocationForUser } from "@/geolocationForUser";
import { computed } from "vue";
import lendingService from "@/services/lendingService";

export default {
  name: "MainPage",
  components: {
    AdListComponent,
    CategoryComponent,
  },
  setup() {
    const { coords } = geolocationForUser();
    const currPos = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude,
    }));
    return { currPos };
  },
  data() {
    return {
      priceRangeValue : 0,
      distanceRangeValue : 0,
      showUnderCategories : 0,
      sorting : '',
      showMenuBarSorting : false,
      showMenuBarFiltering : false,
      ads:[],
      categories: [
        {
          title: "Verktøy",
          icon: "fa-hammer",
        },
        {
          title: "Bil",
          icon: "fa-car",
        },
        {
          title: "Båt",
          icon: "fa-ship",
        },
      ],
    };
  },
  methods: {
    showSorting() {
      console.log(new URL(location.href).searchParams.get('page'));
      this.showMenuBarFiltering = false;
      if (this.showMenuBarSorting) {
        this.showMenuBarSorting = false;
      } else {
        this.showMenuBarSorting = true;
      }
    },
    showFiltering() {
      this.showMenuBarSorting = false;
      if (this.showMenuBarFiltering) {
        this.showMenuBarFiltering = false;
      } else {
        this.showMenuBarFiltering = true;
      }
    },
    sortingPicked(e){
      this.sorting = e.currentTarget.id;
      this.showMenuBarSorting = false;
      console.log(this.sorting);
    },
    getRandomAds(){
      lendingService.getPageWithRandomAds(24)
          .then(response => {
            for (let i = 0; i < response.data.length; i++) {
              console.log(i)
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
          .catch(error => {
            console.error(error)
          })
    },
    getAdsWhenOnMainpage(){
      if(this.$route.name === "/") this.getRandomAds()
    },
  },
  watch:{
    $route:"getAdsWhenOnMainpage"
  },
  created() {
    this.getRandomAds()
    //TODO send disse koordinatene til backend
    /*
    this.currPos.value.lat;
    this.currPos.value.lng;

     */
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
a{
  border: #0b5ed7 solid 1px;
  cursor: pointer;
}
.filtering{
  background-color: #0b5ed7;
  color: white;
}
button{
  margin: 5px;
}
</style>
