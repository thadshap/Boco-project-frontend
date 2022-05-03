<template>
  <div class="container">
    <div class="d-flex justify-content-center search-box-container-style">
      <div class="d-flex search-container">
        <input type="search" placeholder="Søk" class="w-100" v-model="searchWord"/>
        <button class="btn btn-primary btn-style" type="button" @click="search">
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
          @last-clicked-main-cat="chosenMainCat"
        />
      </div>
      <div v-if="chosenMainCategory !== ''" class="my-5">
        <h5>Underkategori</h5>
        <SubCategoryComponent
          v-for="cat in subCategories"
          :key="cat"
          :label="cat"
          category-type="subCategories"
          @chosen-sub-cat="chosenSubCat"
        />
      </div>
      <div v-if="chosenSubCategory !== ''" class="my-5">
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
            <a class="dropdown-item" href="#">max-pris:<br>
              <input
                type="number"
                v-model="priceRangeValue"
            />
              <input
                  type="button"
                  v-on:click="filterByPriceRange"
                  value="filtrer"
              /></a
            ><a class="dropdown-item" href="#">max-avstand:<br>
            <input
                type="number"
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

    <AdListComponent :ads="this.ads"/>
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
      adsRightFormat:[],
      categories: [],
      subCategories: [],
      subSubCategories: [],
      chosenMainCategory: "",
      chosenSubCategory: "",
      chosenSubSubCategory: ""
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
      this.showMenuBarFiltering = !this.showMenuBarFiltering
    },
    async sortingPicked(e){
      this.ads = [];
      this.sorting = e.currentTarget.id;
      this.showMenuBarSorting = false;
      console.log(this.sorting);
      if(this.sorting == "lav-hoy"){
        await this.sortByIncreasingPrice()
      } else if(this.sorting == "hoy-lav"){
        await this.sortByDecreasingPrice()
      } else if (this.sorting == "ny-eld"){
        //TODO
      } else if (this.sorting == "eld-ny"){
        //TODO
      }
    },
    async filterByPriceRange(){
      this.showMenuBarFiltering = false;
      console.log("hei")
    },
    async filterByDistanceRange(){

    },
    async sortByIncreasingPrice(){
      await adsService.sortListOfAdsByIncreasingPrice(this.adsRightFormat).then(response => {
        this.adsRightFormat = response.data;
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
          .catch(error => {
            console.error(error)
          })
    },
    async sortByDecreasingPrice(){
      await adsService.sortListByDescendingPrice(this.adsRightFormat).then(response => {
        this.adsRightFormat = response.data;
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
          .catch(error => {
            console.error(error)
          })
    },
    getRandomAds(){
      adsService.getPageWithRandomAds(5)
          .then(response => {
            this.adsRightFormat = response.data
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
          .catch(error => {
            console.error(error)
          })
    },
    getAdsWhenOnMainpage(){
      if(this.$route.name === "/") this.getRandomAds()
    },
    async getMainCategories() {
      await categoryService
        .getAllParentCategories()
        .then(response => {
          for(let i = 0; i < response.data.length; i++) {
            let cat = {
              title: response.data[i].name,
              icon: response.data[i].icon
            }
            this.categories.push(cat)
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
        .getAllSubCategoriesForCategory(title)
        .then(response => {
          for(let i = 0; i < response.data.length; i++) {
            this.subCategories.push(response.data[i].name)
          }

          categoryService
            .getAllAdsForCategoryAndSubCategories(title)
            .then(response => {
              console.log(response)
            })
            .catch(error => {
              console.log(error)
            })

        })
        .catch(error => {
          console.log(error)
        })
    },
    async chosenSubCat(subCat) {
      this.chosenSubCategory = subCat
      this.subSubCategories = []

      await categoryService
        .getAllSubCategoriesForCategory(subCat)
        .then(response => {
          if(response.status !== 204) {
            for(let i = 0; i < response.data.length; i++) {
              this.subSubCategories.push(response.data[i].name)
            }
          }

          categoryService
            .getAllAdsForCategoryAndSubCategories(subCat)
            .then(response => {
              console.log(response)
            })
            .catch(error => {
              console.log(error)
            })

        })
        .catch(error => {
          console.log(error)
        })
    },
    chosenSubSubCat(subSubCat) {
      this.chosenSubSubCategory = subSubCat

      categoryService
        .getAllAdsForCategoryAndSubCategories(subSubCat)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
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
              img: "ski.jpg",
              place: res.data[i].city,
              price: res.data[i].price
            }
            this.ads.push(ad)
          }
        })
        .catch(err => {
          console.log(err)
        })
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
  },
  updated() {
    console.log("Main page updated");
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
