<template>
  <div class="w-100">
    <div class="d-flex justify-content-center">
      <div>
        <div class="main-container">
          <div class="d-flex justify-content-center search-box-container-style">
            <div class="d-flex search-container">
              <input
                type="search"
                placeholder="Søk"
                class="w-100"
                v-model="searchWord"
              />
              <button
                class="btn btn-primary btn-style"
                type="button"
                @click="search"
              >
                <i class="fa fa-search"></i>
              </button>
            </div>
          </div>

          <div>
            <h3 class="category-header">Kategorier</h3>
            <hr />
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
            <div v-if="subCategories.length !== 0" class="mt-3">
              <h4 class="category-header">Underkategori</h4>
              <hr />
              <SubCategoryComponent
                v-for="cat in subCategories"
                :key="cat"
                :label="cat"
                category-type="subCategories"
                @chosen-sub-cat="chosenSubCat"
              />
            </div>
            <div v-if="subSubCategories.length !== 0" class="mt-5">
              <h5 class="category-header">... underkategori</h5>
              <hr />
              <SubCategoryComponent
                v-for="cat in subSubCategories"
                :key="cat"
                :label="cat"
                category-type="subSubCategories"
                @chosen-sub-cat="chosenSubSubCat"
              />
            </div>
          </div>

          <hr />

          <div class="w-100">
            <div class="filter-and-sort-btn-container">
              <div class="sort-container">
                <button
                    id="sort"
                  class="btn sort-btn"
                  type="button"
                  v-on:click="showSortingOptions"
                  :disabled="disableSortingAndFiltering"
                >
                  <img
                    height="30"
                    width="30"
                    src="@/assets/img/list.svg"
                    alt="sort icon"
                  />
                  Sorter
                </button>
                <div id="sortItems" class="dropdown-item-container" v-if="showMenuBarSorting">
                  <a
                    id="lav-hoy"
                    class="dropdown-item"
                    v-on:click="sortingPicked($event)"
                    >laveste - høyeste pris</a
                  ><a
                    id="hoy-lav"
                    class="dropdown-item"
                    v-on:click="sortingPicked($event)"
                    >høyeste - laveste pris</a
                  ><a
                    id="ny-eld"
                    class="dropdown-item"
                    v-on:click="sortingPicked($event)"
                    >nyeste - eldste</a
                  ><a
                    id="eld-ny"
                    class="dropdown-item"
                    v-on:click="sortingPicked($event)"
                    >eldste- nyeste</a
                  >
                </div>
              </div>
              <div>
                <div class="dropdown filter-container">
                  <button
                    id="filter"
                    class="btn filter-btn"
                    type="button"
                    v-on:click="showFilteringOptions"
                    :disabled="disableSortingAndFiltering"
                  >
                    <img
                      height="20"
                      width="20"
                      src="@/assets/img/filter.svg"
                      alt="filter icon"
                    />
                    Filtrer
                  </button>
                  <div
                      id="filterItems"
                    class="dropdown-item-container"
                    v-if="showMenuBarFiltering"
                  >
                    <a class="dropdown-item" href="#"
                      >max-pris:<br />
                      <input id="priceValue" type="number" v-model="rangeValuePrice" />
                      <input
                          id="pricerange"
                        type="button"
                        v-on:click="filter('price')"
                        value="filtrer"
                    /></a>
                    <a class="dropdown-item" href="#"
                      >max-avstand:<br />
                      <input id="distanceValue" type="number" v-model="rangeValueDistance" />
                      <input
                        id="distanceRange"
                        type="button"
                        v-on:click="filter('distance')"
                        value="filtrer"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <hr />
            <h3 class="category-header">{{ titleHeader }}</h3>

            <AdListComponent :ads="this.ads" />
            <Pagination
              :total-pages="totalPages"
              :current-page="currentPage"
              @pageChanged="onPageChange"
            />
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
import Pagination from "@/components/Pagination";
import { geolocationForUser } from "@/geolocationForUser";
import { computed } from "vue";
import adsService from "@/services/adsService";
import categoryService from "../services/categoryService";
import adService from "../services/adService";

export default {
  name: "MainPage",
  components: {
    AdListComponent,
    CategoryComponent,
    SubCategoryComponent,
    Pagination,
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
      titleHeader: "Nyeste gjenstander for utlån",
      disableSortingAndFiltering: false,
      searchWord: "",
      rangeValueDistance: 0,
      rangeValuePrice: 0,
      showUnderCategories: 0,
      sorting: "",
      showMenuBarSorting: false,
      showMenuBarFiltering: false,
      ads: [],
      cachedAds: [],
      sortedAds: [],
      totalPages: 0,
      adsPerPage: 4,
      categories: [],
      subCategories: [],
      subSubCategories: [],
      chosenMainCategory: "",
      chosenSubCategory: "",
      chosenSubSubCategory: "",
      currentCategoryName: "",
      currentPage: 1,
    };
  },
  //TODO oppdater antall sider når man filtrerer
  methods: {
    showSortingOptions() {
      this.showMenuBarFiltering = false;
      this.showMenuBarSorting = !this.showMenuBarSorting;
    },
    showFilteringOptions() {
      this.showMenuBarSorting = false;
      this.showMenuBarFiltering = !this.showMenuBarFiltering;
    },
    async sortingPicked(e) {
      this.sorting = e.currentTarget.id;
      this.showMenuBarSorting = false;
      this.sortedAds = this.cachedAds.slice();
      if (this.sorting === "lav-hoy") {
        this.sortedAds.sort((a, b) => {
          return a.price - b.price;
        });
      } else if (this.sorting === "hoy-lav") {
        this.sortedAds.sort((a, b) => {
          return b.price - a.price;
        });
      } else if (this.sorting === "ny-eld") {
        this.sortedAds.sort((a, b) => {
          return b.id - a.id;
        });
      } else if (this.sorting === "eld-ny") {
        this.sortedAds.sort((a, b) => {
          return a.id - b.id;
        });
      }
      await this.displayAds(1, this.sortedAds);
    },
    async filter(filterType) {
      this.showMenuBarFiltering = false;
      if (this.currentCategoryName !== "") {
        await this.filterWithCategory(filterType);
      } else {
        await this.filterWithoutCategory(filterType);
      }
      this.setNrOfPages(this.sortedAds);
      await this.displayAds(1, this.sortedAds);
    },
    async filterWithCategory(filterType) {
      let rangeValue = "";
      if (filterType === "price") {
        rangeValue = this.rangeValuePrice;
      }
      if (filterType === "distance") {
        rangeValue = this.rangeValueDistance;
      }

      await adsService.filterAdsInCategoryByDistanceOrPrice(
        filterType,
        this.currentCategoryName,
        rangeValue,
        true,
        this.currPos.lat,
        this.currPos.lng
      );

      this.sortedAds = []
        .then((response) => {
          for (let i = 0; i < response.data.body.length; i++) {
            let ad = {
              id: response.data.body[i].adId,
              title: response.data.body[i].title,
              city: response.data.body[i].city,
              postalCode: response.data.body[i].postalCode.toString(),
              streetAddress: response.data.body[i].streetAddress,
              price: response.data.body[i].price,
              distance: response.data.body[i].distance,
              userId: response.data.body[i].userId,
              lat: response.data.body[i].lat,
              lng: response.data.body[i].lng,
            };
            this.sortedAds.push(ad);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async filterWithoutCategory(filterType) {
      let rangeValue = "";
      if (filterType === "price") {
        this.titleHeader = "Gjenstander for utlån filtrert etter pris";
        rangeValue = this.rangeValuePrice;
      }
      if (filterType === "distance") {
        this.titleHeader = "Gjenstander for utlån filtrert etter avstander";
        rangeValue = this.rangeValueDistance;
      }
      this.sortedAds = [];

      await adsService
        .filterAdsForPriceOrDistance(
          filterType,
          rangeValue,
          true,
          this.currPos.lat,
          this.currPos.lng
        )
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            let ad = {
              id: response.data[i].adId,
              title: response.data[i].title,
              city: response.data[i].city,
              postalCode: response.data.body[i].postalCode.toString(),
              streetAddress: response.data.body[i].streetAddress,
              price: response.data[i].price,
              userId: response.data[i].userId,
              distance: response.data[i].distance,
              lat: response.data[i].lat,
              lng: response.data[i].lng,
            };
            //TODO noe med bilder
            this.sortedAds.push(ad);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async getRandomAds() {
      await adsService
        .getPageWithRandomAds(20,this.currPos.lat, this.currPos.lng)
          .then(response => {
            for (let i = 0; i < response.data.length; i++) {
              let ad = {
                id: response.data[i].adId,
                title: response.data[i].title,
                city: response.data[i].city,
                postalCode: response.data[i].postalCode.toString(),
                streetAddress: response.data[i].streetAddress,
                price: response.data[i].price,
                distance: response.data[i].distance,
                lat: response.data[i].lat,
                lng: response.data[i].lng,
                userId: response.data[i].userId
              }
              this.cachedAds.push(ad)
            }
          })
          .catch(error => {
            console.error(error)
          })
    },
    async displayAds(page, adArray) {
      this.ads = [];
      for (
        let i = this.adsPerPage * (page - 1);
        i < this.adsPerPage * page;
        i++
      ) {
        if (adArray[i] === undefined) break;
        this.ads.push(adArray[i]);
      }
      await this.getPictureForAd();
    },
    setNrOfPages(adArray) {
      this.totalPages = Math.ceil(adArray.length / this.adsPerPage);
    },
    async chosenMainCat(title) {
      this.titleHeader = "Gjenstander for utlån i kategorien " + title;
      this.disableSortingAndFiltering = true;
      this.currentCategoryName = title;
      this.chosenMainCategory = title;
      this.subCategories = [];
      this.subSubCategories = [];

      for (let i = 0; i < this.$store.getters.getSubCategories.length; i++) {
        if (this.$store.getters.getSubCategories[i].parentCat === title) {
          this.subCategories.push(
            this.$store.getters.getSubCategories[i].title
          );
        }
      }

      await categoryService
        .getAllAdsForCategoryAndSubCategories(title, this.currPos)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            this.sortedAds = [];
            for (let i = 0; i < response.data.length; i++) {
              let ad = {
                id: response.data[i].adId,
                title: response.data[i].title,
                city: response.data[i].city,
                postalCode: response.data.body[i].postalCode.toString(),
                streetAddress: response.data.body[i].streetAddress,
                price: response.data[i].price,
                userId: response.data[i].userId,
                distance: response.data[i].distance,
                lat: response.data[i].lat,
                lng: response.data[i].lng,
              }
              this.sortedAds.push(ad)
              console.log(ad)
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });

      this.setNrOfPages(this.sortedAds)
      await this.displayAds(1, this.sortedAds);
    },
    async chosenSubCat(subCat) {
      this.titleHeader = "Gjenstander for utlån i kategorien " + subCat;
      this.disableSortingAndFiltering = false;
      this.currentCategoryName = subCat;
      this.chosenSubCategory = subCat;
      this.subSubCategories = [];

      for (let i = 0; i < this.$store.getters.getSubSubCategories.length; i++) {
        if (this.$store.getters.getSubSubCategories[i].parentCat === subCat) {
          console.log(this.$store.getters.getSubSubCategories[i])
          this.subSubCategories.push(
            this.$store.getters.getSubSubCategories[i].title
          );
        }
      }

      await categoryService
          .getAllAdsForCategoryAndSubCategories(subCat, this.currPos)
          .then(response => {
            if(response.status === 200) {
              this.sortedAds = []
              for(let i = 0; i < response.data.length; i++) {
                let ad = {
                  id: response.data[i].adId,
                  title: response.data[i].title,
                  city: response.data[i].city,
                  postalCode: response.data.body[i].postalCode.toString(),
                  streetAddress: response.data.body[i].streetAddress,
                  price: response.data[i].price,
                  userId: response.data[i].userId,
                  distance: response.data[i].distance,
                  lat: response.data[i].lat,
                  lng: response.data[i].lng
                }
                this.sortedAds.push(ad)
              }
            }
          })
          .catch(error => {
            console.log(error)
          })

      this.setNrOfPages(this.sortedAds)
      await this.displayAds(1, this.sortedAds);
    },
    async chosenSubSubCat(subSubCat) {
      this.chosenSubSubCategory = subSubCat;
      this.titleHeader = "Gjenstander for utlån i kategorien " + subSubCat;
      this.currentCategoryName = subSubCat;

      await categoryService
        .getAllAdsForCategoryAndSubCategories(subSubCat, this.currPos)
        .then((response) => {
          if (response.status === 200) {
            this.sortedAds = [];
            for (let i = 0; i < response.data.length; i++) {
              let ad = {
                id: response.data[i].adId,
                title: response.data[i].title,
                city: response.data[i].city,
                postalCode: response.data.body[i].postalCode.toString(),
                streetAddress: response.data.body[i].streetAddress,
                price: response.data[i].price,
                userId: response.data[i].userId,
                distance: response.data[i].distance,
                lat: response.data[i].lat,
                lng: response.data[i].lng,
              }
              this.sortedAds.push(ad)
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });

      this.setNrOfPages(this.sortedAds)
      await this.displayAds(1, this.sortedAds);
    },
    async getPictureForAd() {
      for (let i = 0; i < this.ads.length; i++) {
        await adService
          .getPictureForAd(this.ads[i].id)
          .then((response) => {
            this.ads[
              i
              ].img = `data:${response.data.type};base64,${response.data.base64}`;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    async getAllCategories() {
      if(this.$store.getters.getMainCategories.length !== 0) {
        return
      }

      await categoryService
        .getAllCategories()
        .then(response => {
          let mainCategories = [];
          let subCategories = [];
          let subSubCategories = [];
          for(let i = 0; i < response.data.length; i++) {
            switch (response.data[i].level) {
              case 1:
                mainCategories.push({
                  title: response.data[i].name,
                  icon: response.data[i].icon,
                  id: response.data[i].id,
                  child: response.data[i].child,
                  parent: response.data[i].parent
                })
                break;
              case 2:
                subCategories.push({
                  parentCat: response.data[i].parentName,
                  title: response.data[i].name,
                  id: response.data[i].id,
                  child: response.data[i].child,
                  parent: response.data[i].parent
                })
                break;
              case 3:
                subSubCategories.push({
                  parentCat: response.data[i].parentName,
                  title: response.data[i].name,
                  id: response.data[i].id,
                  child: response.data[i].child,
                  parent: response.data[i].parent
                })
                break;
            }
            this.$store.dispatch("setMainCategories", mainCategories)
            this.$store.dispatch("setSubCategories", subCategories)
            this.$store.dispatch("setSubSubCategories", subSubCategories)

            this.categories = []
            this.categories = mainCategories
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

    async search() {
      if (this.searchWord === "") {
        return;
      }
      await adsService
        .getAdsBySearch(this.searchWord, this.currPos.lat, this.currPos.lng)
        .then(response => {
          this.sortedAds = []
          for(let i = 0; i < response.data.length; i++) {
            let ad = {
              id: response.data[i].adId,
              title: response.data[i].title,
              city: response.data[i].city,
              postalCode: response.data.body[i].postalCode.toString(),
              streetAddress: response.data.body[i].streetAddress,
              price: response.data[i].price,
              userId: response.data[i].userId,
              lat: response.data[i].lat,
              lng: response.data[i].lng,
              distance: response.data[i].distance,
            }
            this.sortedAds.push(ad)
          }
        })
        .catch((error) => {
          console.error(error);
        });
      this.setNrOfPages(this.sortedAds);
      await this.displayAds(1, this.sortedAds);
    },
    onPageChange(page) {
      this.currentPage = page;
      if (this.sortedAds.length === 0)
        this.displayAds(this.currentPage, this.cachedAds);
      else this.displayAds(this.currentPage, this.sortedAds);
    },
  },
  async mounted() {
    await this.getAllCategories();
    await this.getRandomAds();
    await this.setNrOfPages(this.cachedAds);
    await this.displayAds(1, this.cachedAds);
  },
  updated() {
    this.displayAds(this.currentPage, this.cachedAds);
    this.getAllCategories();
    this.categories = this.$store.getters.getMainCategories;
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

.filter-and-sort-btn-container {
  display: flex;
  justify-content: left;
  margin-left: 12px;
}
.sort-container,
.filter-container {
  display: table-row;
  text-align: left;
}
.main-container {
  display: table-row;
}
.category-header,
.newest-items-header {
  color: #015d9a;
  font-weight: initial;
  margin-block-end: 0px;
}
.sort-btn,
.filter-btn {
  margin-left: 0px;
  padding-left: 0px;
  color: #0495f3ff;
  font-weight: inherit;
  font-size: 19px;
}
.dropdown-item-container {
  border-radius: 7px;
  background-color: rgba(230, 247, 255, 0.6);
}
hr {
  margin: 5px;
}
SubCategoryComponent {
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
a {
  cursor: pointer;
}
.filtering {
  background-color: #0b5ed7;
  color: white;
}
</style>
