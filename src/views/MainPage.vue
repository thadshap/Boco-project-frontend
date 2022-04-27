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

    <div :class="{ 'd-flex flex-column': chosenMainCategory !== '' }">
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
        />
      </div>
    </div>
  </div>

  <div>
    <h3>Newest items</h3>

    <AdListComponent
    :my-ads="false"
    :loaned-ads="false"/>
  </div>
</template>

<script>
import AdListComponent from "@/components/AdListComponent";
import CategoryComponent from "@/components/CategoryComponent";
import SubCategoryComponent from "@/components/SubCategoryComponent";
import { geolocationForUser } from '@/geolocationForUser'
import { computed } from 'vue'

export default {
  name: "MainPage",
  components: {
    AdListComponent,
    CategoryComponent,
    SubCategoryComponent
  },
  setup(){
     const { coords } = geolocationForUser()
     const currPos = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude
    }))
     return { currPos }
  },
  data() {
    return {
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
    }
  },
  created() {
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
</style>
