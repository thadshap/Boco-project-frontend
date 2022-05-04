<template>
  <div class="w-100">
    <div class="d-flex justify-content-center">
      <div>
  <div class="main-container">
    <div class="d-flex justify-content-center search-box-container-style">
      <div class="d-flex search-container">
        <input type="search" placeholder="Søk" class="w-100" v-model="searchWord"/>
        <button class="btn btn-primary btn-style" type="button" @click="search">
          <i class="fa fa-search"></i>
        </button>
      </div>
    </div>

    <div>
      <h2 class="category-header">Kategorier</h2>
      <hr>
      <div
        class="d-flex flex-row justify-content-center align-items-center flex-wrap categories-card-container-style"
      >
        <CategoryComponent
          v-for="category in categories"
          :key="category"
          :title="category.title"
          :icon="category.icon"
          @last-clicked-main-cat="chosenMainCat"
        />
      </div>
      <div v-if="subCategories.length !== 0" class="my-5">
        <h5>Underkategori</h5>
        <SubCategoryComponent
          v-for="cat in subCategories"
          :key="cat"
          :label="cat"
          category-type="subCategories"
          @chosen-sub-cat="chosenSubCat"
        />
      </div>
      <div v-if="subSubCategories.length !== 0" class="my-5">
        <h6>Underkategori</h6>
        <SubCategoryComponent
          v-for="cat in subSubCategories"
          :key="cat"
          :label="cat"
          category-type="subSubCategories"
          @chosen-sub-cat="chosenSubSubCat"
        />
      </div>
    </div>

<hr>

    <div class="w-100">
      <div class="filter-and-sort-btn-container">
      <div class="sort-container">
          <button
              class="btn sort-btn"
              type="button"
              v-on:click="showSorting"
          >
            <img height="30" width="30" src="@/assets/img/list.svg" alt="sort icon">
            Sorter
          </button>
          <div class="dropdown-item-container" v-if="showMenuBarSorting">
            <a id="lav-hoy" class="dropdown-item" v-on:click="sortingPicked($event)">laveste - høyeste pris</a
            ><a id="hoy-lav" class="dropdown-item" v-on:click="sortingPicked($event)">høyeste - laveste pris</a
          ><a id="ny-eld" class="dropdown-item" v-on:click="sortingPicked($event)">nyeste - eldste</a
          ><a id="eld-ny" class="dropdown-item" v-on:click="sortingPicked($event)">eldste- nyeste</a>
          </div>
      </div>
      <div>
        <div class="dropdown filter-container">
          <button
              class="btn filter-btn"
              type="button"
              v-on:click="showFiltering"
          >
            <img height="20" width="20" src="@/assets/img/filter.svg" alt="filter icon">
            Filtrer
          </button>
          <div class="dropdown-item-container" v-if="showMenuBarFiltering">
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
      </div>


  <div>
    <hr>
    <AdListComponent :ads="this.ads"/>
  </div>
  </div>
  </div>
    </div>
  </div>
</template>

<script>
import AdListComponent from "@/components/AdListComponent";
import CategoryComponent from "@/components/CategoryComponent";
import SubCategoryComponent from "@/components/SubCategoryComponent";
import { geolocationForUser } from '@/geolocationForUser'
import { computed } from 'vue'
import adsService from "@/services/adsService";
import categoryService from "@/services/categoryService";
import adService from "@/services/adService";

export default {
  name: "MainPage",
  components: {
    AdListComponent,
    CategoryComponent,
    SubCategoryComponent
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
      searchWord: "",
      priceRangeValue : 0,
      distanceRangeValue : 0,
      showUnderCategories : 0,
      sorting : '',
      showMenuBarSorting : false,
      showMenuBarFiltering : false,
      ads:[],
      categories: [],
      subCategories: [],
      subSubCategories: [],
      chosenMainCategory: "",
      chosenSubCategory: "",
      chosenSubSubCategory: "",
      adImg: ""
    };
  },
  methods: {
    showSorting() {
      console.log(new URL(location.href).searchParams.get('page'));
      this.showMenuBarFiltering = false;
      this.showMenuBarSorting = !this.showMenuBarSorting;
    },
    showFiltering() {
      this.showMenuBarSorting = false;
      this.showMenuBarFiltering = !this.showMenuBarFiltering;
    },
    sortingPicked(e){
      this.sorting = e.currentTarget.id;
      this.showMenuBarSorting = false;
      console.log(this.sorting);
    },
    async getRandomAds(){
      await adsService
        .getPageWithRandomAds(5)
          .then(response => {
            console.log(response)
            for (let i = 0; i < response.data.length; i++) {
              let ad = {
                id: response.data[i].adId,
                title: response.data[i].title,
                place: response.data[i].city,
                price: response.data[i].price
              }

              this.ads.push(ad)
            }
          })
          .catch(error => {
            console.error(error)
          })

      for(let i = 0; i < this.ads.length; i++) {
        await adService
          .getPicturesForAd(this.ads[i].id)
          .then(response => {
            let img = `data:${response.data[0].type};base64,${response.data[0].base64}`;
            this.ads[i].img = img
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    getAdsWhenOnMainpage(){
      if(this.$route.name === "/") this.getRandomAds()
    },
    async getMainCategories() {
      await categoryService
        .getAllParentCategories()
        .then(response => {
          if(response.status !== 204) {
            for(let i = 0; i < response.data.length; i++) {
              let cat = {
                title: response.data[i].name,
                icon: response.data[i].icon
              }
              this.categories.push(cat)
            }
          } else {
            console.log("Fikk ingen kategorier fra server...")
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    async chosenMainCat(title) {
      this.chosenMainCategory = title
      this.subCategories = []
      this.subSubCategories = []

      await categoryService
        .getAllAdsForCategoryAndSubCategories(title, this.currPos)
        .then(response => {
          if(response.status === 200) {
            console.log(response)
            this.ads = []
            for(let i = 0; i < response.data.length; i++) {
              let ad = {
                id: response.data[i].adId,
                title: response.data[i].title,
                place: response.data[i].city,
                price: response.data[i].price
              }
              this.ads.push(ad)
            }
          }
        })
        .catch(error => {
          console.log(error)
        })

      for(let i = 0; i < this.ads.length; i++) {
        await adService
          .getPicturesForAd(this.ads[i].id)
          .then(response => {
            let img = `data:${response.data[0].type};base64,${response.data[0].base64}`;
            this.ads[i].img = img
          })
          .catch(error => {
            console.log(error)
          })
      }

      await categoryService
        .getAllSubCategoriesForCategory(title)
        .then(response => {
          if(response.status === 200) {
            for(let i = 0; i < response.data.length; i++) {
              this.subCategories.push(response.data[i].name)
            }
          } else {
            console.log("Fikk ingen underkategorier fra server...")
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    async chosenSubCat(subCat) {
      this.chosenSubCategory = subCat
      this.subSubCategories = []

      await categoryService
        .getAllAdsForCategoryAndSubCategories(subCat, this.currPos)
        .then(response => {
          if(response.status === 200) {
            this.ads = []
            for(let i = 0; i < response.data.length; i++) {
              let ad = {
                id: response.data[i].adId,
                title: response.data[i].title,
                place: response.data[i].city,
                price: response.data[i].price
              }
              this.ads.push(ad)
            }
          }
        })
        .catch(error => {
          console.log(error)
        })

      for(let i = 0; i < this.ads.length; i++) {
        await adService
          .getPicturesForAd(this.ads[i].id)
          .then(response => {
            let img = `data:${response.data[0].type};base64,${response.data[0].base64}`;
            this.ads[i].img = img
          })
          .catch(error => {
            console.log(error)
          })
      }

      await categoryService
        .getAllSubCategoriesForCategory(subCat)
        .then(response => {
          if(response.status === 200) {
            for(let i = 0; i < response.data.length; i++) {
              this.subSubCategories.push(response.data[i].name)
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    async chosenSubSubCat(subSubCat) {
      this.chosenSubSubCategory = subSubCat

      await categoryService
        .getAllAdsForCategoryAndSubCategories(subSubCat)
        .then(response => {
          if(response.status === 200) {
            this.ads = []
            for(let i = 0; i < response.data.length; i++) {
              let ad = {
                id: response.data[i].adId,
                title: response.data[i].title,
                place: response.data[i].city,
                price: response.data[i].price
              }
              this.ads.push(ad)
            }
          }
        })
        .catch(error => {
          console.log(error)
        })

      for(let i = 0; i < this.ads.length; i++) {
        await adService
          .getPicturesForAd(this.ads[i].id)
          .then(response => {
            let img = `data:${response.data[0].type};base64,${response.data[0].base64}`;
            this.ads[i].img = img
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    async search() {
      if(this.searchWord === "") {
        return
      }

      await adsService
        .getAdsBySearch(this.searchWord)
        .then(res => {
          this.ads = []
          console.log("Received from server")
          console.log(res.data)
          for(let i = 0; i < res.data.length; i++) {
            let ad = {
              id: res.data[i].adId,
              title: res.data[i].title,
              place: res.data[i].city,
              price: res.data[i].price
            }
            this.ads.push(ad)
          }
        })
        .catch(err => {
          console.log(err)
        })

      for(let i = 0; i < this.ads.length; i++) {
        await adService
          .getPicturesForAd(this.ads[i].id)
          .then(response => {
            let img = `data:${response.data[0].type};base64,${response.data[0].base64}`;
            this.ads[i].img = img
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },
  watch:{
    $route: "getAdsWhenOnMainpage",
  },
  created() {
    this.getRandomAds();
    this.getMainCategories();
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

.filter-and-sort-btn-container{
  display: flex;
  justify-content: right;
  margin-right: 12px;
}
.sort-container, .filter-container{
  display: table-row;
  text-align: left;
}
.main-container{
  display: table-row;
}
.category-header, .newest-items-header{
  color: #015d9a;
  font-weight: initial;
  margin-block-end: 0px;
}
.sort-btn, .filter-btn{
  margin-left: 0px;
  padding-left: 0px;
  color: #0495F3FF;
  font-weight: inherit;
  font-size: 19px;
}
.dropdown-item-container{
  border-radius: 7px;
  background-color: rgba(230, 247, 255, 0.6);
}
hr{
  margin: 5px;
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
  cursor: pointer;
}
.filtering{
  background-color: #0b5ed7;
  color: white;
}
</style>
