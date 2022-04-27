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
          <label class="form-label">
            Tittel
          </label>
          <input class="form-control" type="text" v-model="state.title">
          <span class="text-danger" v-if="v$.title.$error">
            {{ v$.title.$errors[0].$message }}
          </span>
        </div>


        <div class="d-flex flex-column">
          <label class="form-label">
            Hoved kategori
          </label>
          <select v-model="state.category" class="form-select">
            <option v-for="category in categories" :key="category">{{ category }}</option>
          </select>
          <span class="text-danger" v-if="v$.category.$error">
            {{v$.category.$errors[0].$message }}
          </span>
        </div>

        <div class="d-flex flex-column">
          <label class="form-label">
            Under kategori
          </label>
          <select v-model="state.subCategory" class="form-select">
            <option v-for="subCategory in subCategories" :key="subCategory">{{ subCategory }}</option>
          </select>
        </div>

        <div class="d-flex flex-column" v-if="isSubSubCategori">
          <label class="form-label">
            ... kategori
          </label>
          <select v-model="state.subSubCategory" class="form-select">
            <option v-for="subSubCategory in subSubCategories" :key="subSubCategory">{{ subSubCategory }}</option>
          </select>
        </div>


        <div class="d-flex flex-column">
          <label class="form-label">
            Beskrivelse
          </label>
          <textarea class="form-control" v-model="state.description"></textarea>
          <span class="text-danger" v-if="v$.description.$error">
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
          <label class="form-label">
            Pris
          </label>
          <input class="form-control" type="text" v-model="state.price">
          <span class="text-danger" v-if="v$.price.$error">
            {{ v$.price.$errors[0].$message }}
          </span>
        </div>
        <div class="d-flex flex-column">
          <label class="form-label">
            Adresse
          </label>
          <input class="form-control" type="text" v-model="state.streetAddress">
          <span class="text-danger" v-if="v$.streetAddress.$error">
            {{ v$.streetAddress.$errors[0].$message }}
          </span>
        </div>
        <div class="d-flex flex-column">
          <label class="form-label">
            Postnummer
          </label>
          <input class="form-control" type="text" v-model="state.postalCode" @focusout="findPostalplace(state.postalCode)">
          <span class="text-danger" v-if="v$.postalCode.$error">
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
          <label class="form-label">
            Telefonummer
          </label>
          <input class="form-control" type="tel" v-model="state.phoneNumber">
          <span class="text-danger" v-if="v$.phoneNumber.$error">
            {{ v$.phoneNumber.$errors[0].$message }}
          </span>
        </div>
        <button class="btn btn-primary w-100 btn-style" type="submit">
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
//import lendingService from "../services/lendingService";

export default {
  inject: ["GStore"],
  name: "LendingPage",
  setup() {
    const state = reactive({
      title: "",
      category: "",
      description: "",
      price: "",
      streetAddress: "",
      postalCode: "",
      phoneNumber: ""
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

      //TODO: Hente kategori data fra backend og legge inn i array listene
      categories: [
        "Bil",
        "Båt",
        "Hus"
      ],
      subCategories:[
        "Bil",
        "Båt",
        "Hus"
      ],
      subSubCategories:[
        "Bil",
        "Båt",
        "Hus"
      ],
      isSubSubCategori: false,
      city:""
    }
  },
  methods: {
    chooseImages() {
      this.$refs.fileInput.click()
    },
    onFileChange(e) {
      console.log(e.target.files.length)
      for(let i = 0; i < e.target.files.length; i++) {
        console.log(e.target.files[i])
        let file = e.target.files[i];
        this.imgUrl.push(URL.createObjectURL(file));
        console.log(this.imgUrl)
      }
    },
    submit() {
      this.v$.$validate()
      this.validateImages()

      if(!this.v$.$error && this.imgError === "") {
        this.GStore.flashMessage = "Annonsen ble opprettet!"
      }
      /**
      else{
        await lendingService.postNewAdd(this.state.title,this.state.description,1,this.state.price,this.state.streetAddress,this.state.postalCode,localStorage.getItem("account").id,)
      }*/
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