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
      categories: [
        {
          title: "Verktøy",
          icon: "fa-hammer",
          subCategories: [
            "Sag",
            "Hammer",
            "Vater"
          ]
        },
        {
          title: "Kjøretøy",
          icon: "fa-car",
          subCategories: [
            "Bil",
            "Båt",
            "Sykkel",
            "Sparkesykkel"
          ]
        },
        {
          title: "Lyd",
          icon: "fa-headphones",
          subCategories: [
            "Høyttaler",
            "CD-Spiller",
            "Platespiller",
            "Hodetelefoner"
          ]
        },
        {
          title: "Sport",
          icon: "fa-dumbbell",
          subCategories: [
            {
              title: "Ballsport",
              subCategories: [
                "Håndball",
                "Fotball",
                "Basketball",
                "Annet"
              ]
            }
          ]
        }
      ],
      subCategories: [],
      subSubCategories: [],
      chosenMainCategory: "",
      chosenSubCategory: ""
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
    getRandomAds(){
      adsService.getPageWithRandomAds(5)
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
          .catch(error => {
            console.error(error)
          })
    },
    getAdsWhenOnMainpage(){
      if(this.$route.name === "/") this.getRandomAds()
    },
    chosenMainCat(title) {
      this.chosenMainCategory = title

      for(let i = 0; i < this.categories.length; i++) {
        if(this.categories[i].title === title) {
          if(this.categories[i].subCategories.some(x => x.title !== null && x.title !== undefined)) {
            for(let j = 0; j < this.categories[i].subCategories.length; j++) {
              this.subCategories = this.categories[i].subCategories[j].title
            }
          } else {
            for(let j = 0; j < this.categories[i].subCategories.length; j++) {
              this.subCategories = this.categories[i].subCategories[j]
            }
          }
        }
      }
    },
    chosenSubCat(subCat) {
      this.chosenSubCat = subCat

      for(let i = 0; i < this.categories.length; i++) {
        this.subSubCategories = this.categories[3].subCategories
        // for(let j = 0; j < this.categories[i].subCategories.length; j++) {
        //
        // }
      }
    },
    search() {
      if(this.searchWord === "") {
        return
      }

      adsService
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
