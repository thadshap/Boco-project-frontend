<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="form-container">
      <div>
        <h1 class="text-center header-style">
          Lag ny annonse
        </h1>
      </div>
      <form @submit.prevent="submit">
        <div class="d-flex flex-column">
          <label class="form-label" for="titleOfTheAd">
            Tittel
          </label>
          <input class="form-control" id="titleOfTheAd" type="text" v-model="state.title">
          <span class="text-danger" id="titleError" v-if="v$.title.$error">
            {{ v$.title.$errors[0].$message }}
          </span>
        </div>
        <div class="d-flex flex-column">
          <label class="form-label">
            Hovedkategori
          </label>
          <select class="form-select" id="category" v-on:change="chosenMainCat($event)">
            <option value="">--Velg kategori--</option>
            <option v-for="category in categories" :key="category" value="category.title">{{ category.title }} </option>
          </select>
          <span class="text-danger" id="mainCategoryError" v-if="v$.category.$error">
            {{v$.category.$errors[0].$message }}
          </span>
        </div>
        <div class="d-flex flex-column" v-if="this.isSubCategory">
          <label class="form-label">
            Underkategori
          </label>
          <select class="form-select" id="subCategory" v-on:change="clickedSubCategories($event)">
            <option value="">--Velg kategori--</option>
            <option v-for="subCategory in subCategories" :key="subCategory" value="subCategory.title">{{ subCategory.title }}</option>
          </select>
        </div>
        <div class="d-flex flex-column" v-if="this.isSubSubCategory">
          <label class="form-label">
            ... kategori
          </label>
          <select class="form-select" id="subSubCategory" v-on:change="clickedSubSubCategories($event)">
            <option value="">--Velg kategori--</option>
            <option v-for="subSubCategory in subSubCategories" :key="subSubCategory" value="subSubCategory">{{ subSubCategory.title }}</option>
          </select>
        </div>
        <div class="d-flex flex-column">
          <label class="form-label">
            Beskrivelse
          </label>
          <textarea class="form-control" v-model="state.description" id="description"></textarea>
          <span class="text-danger" id="descriptionError" v-if="v$.description.$error">
            {{ v$.description.$errors[0].$message }}
          </span>
        </div>
        <div class="d-flex flex-column">
          <label class="form-label">
            Bilde(r)
          </label>

          <button class="btn btn-primary w-100 btn-style" type="button" @click="chooseImages">
            Last opp bilder
          </button>

          <input
            class="form-control form-control-lg"
            ref="fileInput"
            type="file"
            accept="image/*"
            id="formFileLg"
            @input="onFileChange"
            multiple
          >

          <div id="preview" class="d-flex flex-wrap justify-content-center align-items-center mt-3" v-if="imgUrl.length !== 0">
            <div v-for="img in imgUrl" :key="img" class="image-preview-container p-1">
              <img :src="img" class="image-preview-image"/>
            </div>
          </div>

          <span class="text-danger" v-if="imgError !== ''">
            {{ imgError }}
          </span>

        </div>
        <div class="d-flex flex-column mt-5">
          <label class="form-label" for="price">
            Pris
          </label>
          <input class="form-control" type="text" v-model="state.price" id="price">
          <span class="text-danger" id="priceError" v-if="v$.price.$error">
            {{ v$.price.$errors[0].$message }}
          </span>
        </div>
        <div class="d-flex flex-column">
          <label class="form-label">
            Varighet
          </label>
          <select class="form-select" id="varighet" v-model="state.durationType">
            <option value="">--Velg varighet--</option>
            <option v-for="duration in durations" :key="duration">{{ duration.displayName }}</option>
          </select>
          <span class="text-danger" v-if="v$.durationType.$error">
            {{ v$.durationType.$errors[0].$message }}
          </span>
        </div>
        <div class="d-flex flex-column">
          <label class="form-label" for="streetAddress">
            Adresse
          </label>
          <input class="form-control" type="text" v-model="state.streetAddress" id="streetAddress">
          <span class="text-danger" v-if="v$.streetAddress.$error">
            {{ v$.streetAddress.$errors[0].$message }}
          </span>
        </div>
        <div class="d-flex flex-column">
          <label class="form-label" for="postalCode">
            Postnummer
          </label>
          <input class="form-control" type="text" v-model="state.postalCode" @focusout="findPostalplace(state.postalCode)" id="postalCode">
          <span class="text-danger" id="postalCodeError" v-if="v$.postalCode.$error">
            {{ v$.postalCode.$errors[0].$message }}
          </span>
        </div>
        <div class="d-flex flex-column">
          <label class="form-label">
            Sted
          </label>
          <input class="form-control" type="text" :value="city" readonly>
        </div>
        <div class="d-flex flex-column">
          <label class="form-label" for="phoneNumber">
            Telefonummer
          </label>
          <input class="form-control" type="tel" v-model="state.phoneNumber" id="phoneNumber">
          <span class="text-danger" id="phoneNumberError" v-if="v$.phoneNumber.$error">
            {{ v$.phoneNumber.$errors[0].$message }}
          </span>
        </div>
        <button class="btn btn-primary w-100 btn-style" type="submit" id="postAdBtn">
          Opprett annonse
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { helpers, required, integer, minLength, maxLength } from "@vuelidate/validators";
import { computed, reactive } from "vue";
import axios from "axios"
import MainPage from "./MainPage";
import categoryService from "@/services/categoryService";
import adService from "@/services/adService";

export default {
  inject: ["GStore"],
  name: "LendingPage",
  setup() {
    const state = reactive({
      title: "",
      description: "",
      price: "",
      durationType: "",
      streetAddress: "",
      postalCode: "",
      phoneNumber: "",
      category: ""
    });

    const rules = computed(() => {
      return {
        title: {
          required: helpers.withMessage("Tittel må være spesifisert!", required)
        },
        category: {
          required: helpers.withMessage("Kategori må være spesifisert!", required)
        },
        description: {
          required: helpers.withMessage("Beskrivelse må være spesifisert!", required)
        },
        price: {
          required: helpers.withMessage("Pris må være satt! Dersom gratis skriv inn 0", required),
          integer: helpers.withMessage("Pris må være et tall! Dersom gratis skriv inn 0", integer)
        },
        durationType: {
          required: helpers.withMessage("Varighet må være sett!", required)
        },
        streetAddress: {
          required: helpers.withMessage("Adresse må være satt!", required)
        },
        postalCode: {
          required: helpers.withMessage("Postnummer må være spesifisert!", required),
          integer: helpers.withMessage("Postnummer må være et heltall!", integer),
          minLength: helpers.withMessage("Postnummer kan ikke ha mindre enn 4 tall!", minLength(4)),
          maxLength: helpers.withMessage("Postnummer kan ikke ha mer enn 4 tall!", maxLength(4))
        },
        phoneNumber: {
          required: helpers.withMessage("Telefonummer må være spesifisert!", required),
          integer: helpers.withMessage("Telefonummer må være et tall", integer),
          minLength: helpers.withMessage("Telefonummer må bestå av 8 tall!", minLength(8)),
          maxLength: helpers.withMessage("Telefonummer kan ikke bestå av mer enn 8 tall!", maxLength(8))
        }
      };
    });

    const v$ = useValidate(rules, state);

    return { state, v$ };
  },
  data() {
    return {
      imgUrl: [],
      imgError: "",
      imgFiles: [],
      categories: [],
      subCategories:[],
      subSubCategories:[],
      isSubCategory: false,
      isSubSubCategory: false,
      categoriesId :"",
      subCategoriesId :"",
      subSubCategoriesId :"",
      idToCategory: "",
      city:"",
      durations: [
        {
          displayName: "Time",
          serverName: "HOUR"
        },
        {
          displayName: "Dag",
          serverName: "DAY"
        },
        {
          displayName: "Uke",
          serverName: "WEEK"
        },
        {
          displayName: "Måned",
          serverName: "MONTH"
        }
      ]
    }
  },
  async created() {
    await this.getAllCategories()
    this.categories = this.$store.getters.getMainCategories
  },
  methods: {
    chooseImages() {
      this.$refs.fileInput.click()
    },
    onFileChange(e) {
      for(let i = 0; i < e.target.files.length; i++) {
        let file = e.target.files[i];
        this.imgFiles.push(file);
        this.imgUrl.push(URL.createObjectURL(file));
      }
    },
    async submit() {
      this.v$.$validate()
      this.validateImages()

      if(!this.v$.$error && this.imgError === "") {
        let adId;
        let durationType;

        for(let i= 0; i < this.durations.length; i++) {
          if(this.durations[i].displayName === this.state.durationType) {
            durationType = this.durations[i].serverName
          }
        }

        await adService
          .postNewAd(
            this.state.title,
            this.state.description,
            durationType,
            this.state.price,
            this.state.streetAddress,
            this.state.postalCode,
            this.idToCategory
          )
          .then(response => {
            adId = response.data
            console.log(response)
            this.$router.push({
              name: "MainPage",
              component: MainPage,
            });
          })
          .catch(error => {
            console.log(error)
            this.GStore.flashMessage = "Anonsen ble ikke opprettet!"
            this.GStore.variant = "Error"
            setTimeout(() => {
              this.GStore.flashMessage = ""
            }, 4000)
          })


        let formdata = new FormData()

        for(let i = 0; i < this.imgFiles.length; i++) {
          formdata.append("files", this.imgFiles[i])
        }

        await adService
          .uploadPicturesForAd(adId, formdata)
          .then(response => {
            this.GStore.flashMessage = "Annonsen ble opprettet!"
            this.GStore.variant = "Success"
            setTimeout(() => {
              this.GStore.flashMessage = ""
            }, 4000)
            console.log(response)
          })
          .catch(error => {
            console.log(error)
            this.GStore.flashMessage = "Klarte ikke laste opp bildene..."
            this.GStore.variant = "Error"
            setTimeout(() => {
              this.GStore.flashMessage = ""
            }, 4000)
          })
      }
    },
    async getAllCategories() {
      if(this.$store.getters.getMainCategories.length !== 0) {
        console.log("Already in store!!")
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
    resetClickedCategory(){
      this.isSubCategory = false
      this.isSubSubCategory = false
      this.subCategoriesId = ""
      this.subSubCategoriesId = ""
      this.idToCategory = ""
    },
    searchClickedCategory(name){
      for (let i = 0; i<this.categories.length; i++){
        if (this.categories[i].name === name){
          this.categoriesId = this.categories[i].id
        }
      }
    },
    async chosenMainCat(e) {
      let name = e.target.options[e.target.options.selectedIndex].text
      this.state.category = name

      this.resetClickedCategory()
      for (let i = 0; i < this.$store.getters.getMainCategories.length; i++){
        if (this.$store.getters.getMainCategories[i].title === name){
          this.categoriesId = this.$store.getters.getMainCategories[i].id
          this.idToCategory = this.categoriesId
        }
      }

      this.subCategories = [];

      if (name === '--Velg kategori--') this.isSubCategory = false
      else {
        for (let i = 0; i < this.$store.getters.getSubCategories.length; i++) {
          if (this.$store.getters.getSubCategories[i].parentCat === name) {
            this.subCategories.push(this.$store.getters.getSubCategories[i]);
          }
        }
        this.isSubCategory = true
      }
    },
    resetClickedSubCategories(){
      this.isSubSubCategory = false
      this.subSubCategoriesId = ""
      this.idToCategory = ""
    },
    async clickedSubCategories(e){
      this.resetClickedSubCategories()

      let name = e.target.options[e.target.options.selectedIndex].text

      let isChild = false
      Boolean(isChild)

      let isParent = false
      Boolean(isParent)
      for (let i = 0; i < this.$store.getters.getSubCategories.length; i++){
        if (this.$store.getters.getSubCategories[i].title === name){
          isChild = this.$store.getters.getSubCategories[i].child
          isParent = this.$store.getters.getSubCategories[i].parent
          this.subCategoriesId = this.$store.getters.getSubCategories[i].id
        }
      }
      if (name == '--Velg kategori--') return
      else if (isChild === true && isParent === false) {
        this.idToCategory = this.subCategoriesId
      }
      else if (isChild === true && isParent === true) {
        this.subSubCategories = [];

        for (let i = 0; i < this.$store.getters.getSubSubCategories.length; i++) {
          if (this.$store.getters.getSubSubCategories[i].parentCat === name) {
            this.subSubCategories.push(this.$store.getters.getSubSubCategories[i]);
          }
        }
        this.isSubSubCategory = true
      }
      else {
        this.GStore.flashMessage = "Noe gikk galt!!!"
        this.GStore.variant = "Error"
        setTimeout(() => {
          this.GStore.flashMessage = ""
        }, 4000)
      }
    },
    clickedSubSubCategories(e){
      let name = e.target.options[e.target.options.selectedIndex].text

      for (let i = 0; i < this.$store.getters.getSubSubCategories.length; i++){
        if (this.$store.getters.getSubSubCategories[i].title === name){
          this.subSubCategoriesId = this.$store.getters.getSubSubCategories[i].id
          this.idToCategory = this.subSubCategoriesId
        }
      }
    },
    validateImages() {
      if(this.imgUrl.length === 0) {
        this.imgError = "Annonsen må ha minst ett bilde!"
      }
    },
    findPostalplace(postalCode){
      if(postalCode.length!==4) return
      let url = "https://ws.geonorge.no/adresser/v1/sok?postnummer="+postalCode+"&treffPerSide=1"
      axios
        .get(url)
        .then(response => {
          this.city = response.data.adresser[0].poststed
        })
    },
  }
};
</script>

<style scoped>
.header-style {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  padding-bottom: 10px;
}

.btn-style {
  margin-top: 20px;
}

#formFileLg {
  display: none;
}

.image-preview-image {
  height: 100%;
}

@media screen and (min-width: 1200px) {
  .image-preview-container {
    width: 33%;
    height: 100px;
  }

  .image-preview-image {
    height: 100%;
  }
}

@media screen and (min-width: 576px) and (max-width: 1200px) {
  .image-preview-container {
    width: 50%;
    height: 100px;
  }

  .image-preview-image {
    height: 100%;
  }
}

@media screen and (max-width: 567px) {
  .image-preview-container {
    width: 100%;
    height: 100px;
  }

  .image-preview-image {
    height: 100%;
  }
}

@media (min-width: 992px) {
  .form-container {
    width: 50%;
  }
}

@media (max-width: 991px) {
  .form-container {
    width: 80%;
  }
}
</style>